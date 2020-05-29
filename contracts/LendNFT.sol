pragma solidity >=0.4.21 <0.7.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/IERC721.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/IERC721Receiver.sol";

contract LendNFT is IERC721Receiver {

    enum Status { PENDING, ACTIVE, CANCELLED, ENDED }


    struct LendingOffer {
    uint lendingID;
    address payable lender;
    address payable borrower;
    address smartContractAddressOfNFT;
    uint tokenIdNFT;
    uint collateralAmount;
    uint lendingPrice;
    uint lendinPeriod;
    uint endLendingTimeStamp;
    Status status;
    }

  address public manager;
  uint public totalLendingOffers = 0;

  mapping(uint => LendingOffer) public allLendingOffers;

  modifier onlyManager() { // Modifier
    require(
        msg.sender == manager,
        "Only manager can call this."
    );
    _;
  }

  constructor() public {
    manager = msg.sender;
  }
    // Equivalent to 'bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))'
    // Or 0x150b7a02
    function onERC721Received(address operator, address from, uint256 tokenId, bytes memory data) public override returns (bytes4) {
        return 0x150b7a02;
    }

    function createLendingOffer(address smartContractAddressOfNFT,
                              uint tokenIdNFT,
                              uint collateralAmount,
                              uint lendingPrice,
                              uint lendinPeriod) public {
        IERC721 currentNFT = IERC721(smartContractAddressOfNFT);
        require(currentNFT.getApproved(tokenIdNFT) == address(this));

        LendingOffer storage lendingOffer =  allLendingOffers[totalLendingOffers];
        lendingOffer.lendingID = totalLendingOffers;
        lendingOffer.lender = msg.sender;
        lendingOffer.borrower = address(0x0);
        lendingOffer.smartContractAddressOfNFT = smartContractAddressOfNFT;
        lendingOffer.tokenIdNFT = tokenIdNFT;
        lendingOffer.collateralAmount = collateralAmount;
        lendingOffer.lendingPrice = lendingPrice;
        lendingOffer.lendinPeriod = lendinPeriod;
        lendingOffer.status = Status.PENDING;
        totalLendingOffers++;

        currentNFT.safeTransferFrom(msg.sender, address(this), tokenIdNFT);
    }

    function acceptLendingOffer(uint lendingOfferID) payable public {
        require(lendingOfferID < totalLendingOffers, "w0");
        require(allLendingOffers[lendingOfferID].status == Status.PENDING, "w1");
        require(allLendingOffers[lendingOfferID].lender != msg.sender, "w2");

        uint sumReqiuredToBorrow = allLendingOffers[lendingOfferID].collateralAmount +
                                    allLendingOffers[lendingOfferID].lendingPrice;
        require(msg.value >= sumReqiuredToBorrow, "w3");

        allLendingOffers[lendingOfferID].lender.transfer(allLendingOffers[lendingOfferID].lendingPrice);
        IERC721(allLendingOffers[lendingOfferID].smartContractAddressOfNFT).transferFrom(address(this), msg.sender,
                                                            allLendingOffers[lendingOfferID].tokenIdNFT);
        // send price to lender
        allLendingOffers[lendingOfferID].borrower = msg.sender;
        allLendingOffers[lendingOfferID].status = Status.ACTIVE;
        allLendingOffers[lendingOfferID].endLendingTimeStamp = now + allLendingOffers[lendingOfferID].lendinPeriod;
    }

    function endLendingOffer(uint lendingOfferID) public {
        require(lendingOfferID < totalLendingOffers);
        require(allLendingOffers[lendingOfferID].status == Status.ACTIVE);
        require((msg.sender == allLendingOffers[lendingOfferID].lender  &&
                now >= allLendingOffers[lendingOfferID].endLendingTimeStamp) || msg.sender == allLendingOffers[lendingOfferID].borrower);

        // borrower sends token back to lender and receives his collateral
        if (msg.sender == allLendingOffers[lendingOfferID].borrower) {
            IERC721 currentNFT = IERC721(allLendingOffers[lendingOfferID].smartContractAddressOfNFT);
            require(currentNFT.getApproved(allLendingOffers[lendingOfferID].tokenIdNFT) == address(this));
            currentNFT.safeTransferFrom(msg.sender, allLendingOffers[lendingOfferID].lender,
                                        allLendingOffers[lendingOfferID].tokenIdNFT);
        }

        msg.sender.transfer(allLendingOffers[lendingOfferID].collateralAmount);
        allLendingOffers[lendingOfferID].status = Status.ENDED;

    }

    function cancelLendingOffer(uint lendingOfferID) public {
        require(lendingOfferID < totalLendingOffers);
        require(allLendingOffers[lendingOfferID].status == Status.PENDING);
        require(msg.sender == allLendingOffers[lendingOfferID].lender);

        IERC721(allLendingOffers[lendingOfferID].smartContractAddressOfNFT).safeTransferFrom(address(this),
                                                            allLendingOffers[lendingOfferID].lender,
                                                            allLendingOffers[lendingOfferID].tokenIdNFT);

        allLendingOffers[lendingOfferID].status = Status.CANCELLED;
    }

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }

}
