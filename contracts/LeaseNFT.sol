// SPDX-License-Identifier: MIT

pragma solidity >=0.6.0 <0.7.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/IERC721.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/IERC721Receiver.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/Pausable.sol";
import {SafeMath} from "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/math/SafeMath.sol";

contract LeaseNFT is IERC721Receiver, Pausable {

    event LeasesUpdated();

    using SafeMath for uint;

    enum Status { PENDING, ACTIVE, CANCELLED, ENDED }

    struct LeaseOffer {
        uint leaseID;
        address payable lessor; // Owner of asset
        address payable lessee; // User of asset
        address smartContractAddressOfNFT;
        uint tokenIdNFT;
        uint collateralAmount;
        uint leasePrice;
        uint leasePeriod;
        uint endLeaseTimeStamp;
        Status status;
    }

    address public manager;
    uint public totalLeaseOffers;
    mapping(uint => LeaseOffer) public allLeaseOffers;

    modifier isValidLeaseID(uint leaseID) {
        require(
            leaseID < totalLeaseOffers,
            "Lease ID is invalid."
        );
        _;
    }

    modifier onlyManager() { // Modifier
        require(
            msg.sender == manager,
            "Only leasing manager can call this."
        );
        _;
    }

    constructor() public {
        manager = msg.sender;
        totalLeaseOffers = 0;
    }


    // Equivalent to 'bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))'
    // Or this.onERC721Received.selector
    function onERC721Received(address operator, address from, uint256 tokenId, bytes memory data) public override returns (bytes4) {
        return 0x150b7a02;
    }

    function pauseLeasing() public onlyManager {
        _pause();
    }

    function unPauseLeasing() public onlyManager {
        _unpause();
    }

    function createLeaseOffer(address smartContractAddressOfNFT,
                                uint tokenIdNFT,
                                uint collateralAmount,
                                uint leasePrice,
                                uint leasePeriod) public whenNotPaused {
        require(leasePeriod < 4 weeks, "Lease for a maximum of 4 weeks.");

        IERC721 currentNFT = IERC721(smartContractAddressOfNFT);
        require(currentNFT.getApproved(tokenIdNFT) == address(this),
                "Transfer has to be approved first");

        LeaseOffer storage leaseOffer =  allLeaseOffers[totalLeaseOffers];
        leaseOffer.leaseID = totalLeaseOffers;
        leaseOffer.lessor = msg.sender;
        leaseOffer.lessee = address(0x0);
        leaseOffer.smartContractAddressOfNFT = smartContractAddressOfNFT;
        leaseOffer.tokenIdNFT = tokenIdNFT;
        leaseOffer.collateralAmount = collateralAmount;
        leaseOffer.leasePrice = leasePrice;
        leaseOffer.leasePeriod = leasePeriod;
        leaseOffer.status = Status.PENDING;
        totalLeaseOffers = SafeMath.add(totalLeaseOffers, 1);

        currentNFT.safeTransferFrom(msg.sender, address(this), tokenIdNFT);
        emit LeasesUpdated();
    }

    function acceptLeaseOffer(uint leaseID) payable public isValidLeaseID(leaseID) whenNotPaused {
        require(allLeaseOffers[leaseID].status == Status.PENDING, "Status is not PENDING for lease.");
        require(allLeaseOffers[leaseID].lessor != msg.sender, "Invalid operation. You cannot lease your own asset.");

        uint sumReqiuredToLease = SafeMath.add(allLeaseOffers[leaseID].collateralAmount, allLeaseOffers[leaseID].leasePrice);

        require(msg.value >= sumReqiuredToLease, "Not enough Ether sent to function to start lease.");

        allLeaseOffers[leaseID].lessee = msg.sender;
        allLeaseOffers[leaseID].status = Status.ACTIVE;
        allLeaseOffers[leaseID].endLeaseTimeStamp = SafeMath.add(now, allLeaseOffers[leaseID].leasePeriod);

        // Send lease price to lessor
        allLeaseOffers[leaseID].lessor.transfer(allLeaseOffers[leaseID].leasePrice);

        // Send NFT to lessee
        IERC721 currentNFT = IERC721(allLeaseOffers[leaseID].smartContractAddressOfNFT);
        currentNFT.transferFrom(address(this), msg.sender, allLeaseOffers[leaseID].tokenIdNFT);
        emit LeasesUpdated();
    }

    function endLeaseOffer(uint leaseID) public isValidLeaseID(leaseID) {
        require(allLeaseOffers[leaseID].status == Status.ACTIVE, "Status is not ACTIVE to end lease");
        require((msg.sender == allLeaseOffers[leaseID].lessor  &&
                now >= allLeaseOffers[leaseID].endLeaseTimeStamp) || msg.sender == allLeaseOffers[leaseID].lessee,
                "Invalid operation.");

        allLeaseOffers[leaseID].status = Status.ENDED;

        // Lessee sends token back to lessor and receives his collateral, after he approves the transfer
        if (msg.sender == allLeaseOffers[leaseID].lessee) {
            IERC721 currentNFT = IERC721(allLeaseOffers[leaseID].smartContractAddressOfNFT);
            require(currentNFT.getApproved(allLeaseOffers[leaseID].tokenIdNFT) == address(this),
                    "Smart contract needs to be approved first.");
            currentNFT.safeTransferFrom(msg.sender, allLeaseOffers[leaseID].lessor,
                                        allLeaseOffers[leaseID].tokenIdNFT);
        }

        // The caller of the function will receive the collateral
        msg.sender.transfer(allLeaseOffers[leaseID].collateralAmount);
        emit LeasesUpdated();
    }

    function cancelLeaseOffer(uint leaseID) public isValidLeaseID(leaseID) {
        require(allLeaseOffers[leaseID].status == Status.PENDING, "Status is not PENDING to cancel lease agreement.");
        require(msg.sender == allLeaseOffers[leaseID].lessor, "You are not the lessor.");

        allLeaseOffers[leaseID].status = Status.CANCELLED;

        IERC721 currentNFT = IERC721(allLeaseOffers[leaseID].smartContractAddressOfNFT);
        currentNFT.safeTransferFrom(address(this), allLeaseOffers[leaseID].lessor,
                                    allLeaseOffers[leaseID].tokenIdNFT);
        emit LeasesUpdated();
    }
}
