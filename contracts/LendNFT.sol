pragma solidity >=0.4.21 <0.7.0;

contract LendNFT {

  struct LendingOffer {
    uint lendingID;
    address payable lender;
    address payable borrower;
    address smartContractAddressOfNFT;
    uint tokenIdNFT;
    uint collateralAmount;
    uint lendingPrice;
    uint maxLendingTimeStamp;
    /* bool isCounterOffer; */
  }

  address public manager;
  uint public totalLendingOffers;

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
    totalLendingOffers = 5;
  }

  function createLendingOffer(address payable prevOwnerAddress,
                              address smartContractAddressOfNFT,
                              uint tokenIdNFT,
                              uint collateralAmount,
                              uint lendingPrice,
                              uint maxLendingTimeStamp) public {

      LendingOffer storage lendingOffer =  allLendingOffers[totalLendingOffers];
      lendingOffer.lendingID = totalLendingOffers;
      lendingOffer.lender = prevOwnerAddress;
      lendingOffer.smartContractAddressOfNFT = smartContractAddressOfNFT;
      lendingOffer.tokenIdNFT = tokenIdNFT;
      lendingOffer.collateralAmount = collateralAmount;
      lendingOffer.lendingPrice = lendingPrice;
      lendingOffer.maxLendingTimeStamp = block.timestamp + maxLendingTimeStamp;

      /*
      TODO: make function to transfer NFT to escrow address of smart contract
      transferNFT(smartContractAddressOfNFT, )
      */

  }

  function getOneLendingOffer(uint id) public view returns (address borrower)  {
    return allLendingOffers[id].borrower;
  }

  function getNumberOfLendingOffers() public view returns (uint totalLendingOffers)  {
    return totalLendingOffers;
  }

}
