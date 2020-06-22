// SPDX-License-Identifier: MIT

pragma solidity >=0.6.0 <0.7.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/IERC721.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/IERC721Receiver.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/Pausable.sol";
import {SafeMath} from "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/math/SafeMath.sol";

contract ForwardContractNFT is IERC721Receiver, Pausable {

    using SafeMath for uint;

    enum Status { PENDING, ACTIVE, CANCELLED, ENDED }

    struct ForwardContract {
        uint contractID;
        address payable seller;
        address payable buyer;
        address smartContractAddressOfNFT;
        uint tokenIdNFT;
        uint NFTPrice;
        uint contractPrice;
        uint contractPeriod;
        uint endContractTimeStamp;
        Status status;
    }

    address public manager;
    uint public totalContracts;
    mapping(uint => ForwardContract) public allContracts;

    modifier isValidContractID(uint contractID) {
        require(
            contractID < totalContracts,
            "Contract ID is invalid."
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

    // Equivalent to 'bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))'
    // Or this.onERC721Received.selector
    function onERC721Received(address operator, address from, uint256 tokenId, bytes memory data) public override returns (bytes4) {
        return 0x150b7a02;
    }

    function pauseForwardContracts() public onlyManager {
          _pause();
    }

    function unPauseForwardContracts() public onlyManager {
          _unpause();
    }

    function createForwardContract(address smartContractAddressOfNFT,
                                    uint tokenIdNFT,
                                    uint NFTPrice,
                                    uint contractPrice,
                                    uint contractPeriod) public whenNotPaused {

        require(contractPeriod < 24 weeks, "Exceeded maximum of 6 months for the contract.");

        IERC721 currentNFT = IERC721(smartContractAddressOfNFT);
        require(currentNFT.getApproved(tokenIdNFT) == address(this),
            "Transfer has to be approved first");

        ForwardContract storage forwardContract = allContracts[totalContracts];
        forwardContract.contractID = totalContracts;
        forwardContract.seller = msg.sender;
        forwardContract.buyer = address(0x0);
        forwardContract.smartContractAddressOfNFT = smartContractAddressOfNFT;
        forwardContract.tokenIdNFT = tokenIdNFT;
        forwardContract.NFTPrice = NFTPrice;
        forwardContract.contractPrice = contractPrice;
        forwardContract.contractPeriod = contractPeriod;
        forwardContract.status = Status.PENDING;
        totalContracts.add(1);

        currentNFT.safeTransferFrom(msg.sender, address(this), tokenIdNFT);
    }

    function acceptForwardContract(uint contractID) payable public isValidContractID(contractID) whenNotPaused {
        require(allContracts[contractID].status == Status.PENDING, "Status of contract is not PENDING.");
        require(allContracts[contractID].seller != msg.sender, "Invalid operation.");
        require(msg.value >= allContracts[contractID].contractPrice, "Not enough Ether to accept contract.");

        allContracts[contractID].buyer = msg.sender;
        allContracts[contractID].status = Status.ACTIVE;
        allContracts[contractID].endContractTimeStamp = now.add(allContracts[contractID].contractPeriod);

        allContracts[contractID].seller.transfer(allContracts[contractID].contractPrice);
    }

    function buyNFT(uint contractID) payable public isValidContractID(contractID) {
        require(allContracts[contractID].status == Status.ACTIVE, "Status is not ACTIVE to buy underlying NFT.");
        require(msg.sender == allContracts[contractID].buyer && now <= allContracts[contractID].endContractTimeStamp);
        require(msg.value >= allContracts[contractID].NFTPrice, "Not enough Ether to buy NFT.");

        allContracts[contractID].status = Status.ENDED;

        IERC721 currentNFT = IERC721(allContracts[contractID].smartContractAddressOfNFT);
        allContracts[contractID].seller.transfer(allContracts[contractID].NFTPrice);
        currentNFT.transferFrom(address(this), msg.sender, allContracts[contractID].tokenIdNFT);
    }

    function returnNFT(uint contractID) public isValidContractID(contractID) {
        require(allContracts[contractID].status == Status.ACTIVE, "Status is not ACTIVE to return underlying NFT.");
        require(msg.sender == allContracts[contractID].seller && now >= allContracts[contractID].endContractTimeStamp);

        allContracts[contractID].status = Status.ENDED;

        IERC721 currentNFT = IERC721(allContracts[contractID].smartContractAddressOfNFT);
        currentNFT.transferFrom(address(this), msg.sender, allContracts[contractID].tokenIdNFT);
    }

    function cancelContract(uint contractID) public isValidContractID(contractID) {
        require(allContracts[contractID].status == Status.PENDING, "Status is not PENDING to cancel contract.");
        require(msg.sender == allContracts[contractID].seller, "You cannot cancel this contract.");

        allContracts[contractID].status = Status.ENDED;

        IERC721 currentNFT = IERC721(allContracts[contractID].smartContractAddressOfNFT);
        currentNFT.transferFrom(address(this), msg.sender, allContracts[contractID].tokenIdNFT);
    }
}
