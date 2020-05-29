// SPDX-License-Identifier: MIT

pragma solidity >=0.6.0 <0.7.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/IERC721.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/IERC721Receiver.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/Pausable.sol";

contract LoansNFT is IERC721Receiver, Pausable {

  enum Status { PENDING, ACTIVE, CANCELLED, ENDED, DEFAULTED }

  struct LoanRequest {
      uint loanID;
      address payable lender;
      address payable borrower;
      address smartContractAddressOfNFT;
      uint tokenIdNFT;
      uint loanAmount;
      uint interestAmount;
      uint singlePeriodTime;
      uint maximumInterestPeriods;
      uint endLoanTimeStamp;
      Status status;
  }

  address public manager;
  uint public totalLoanRequests;
  mapping(uint => LoanRequest) public allLoanRequests;

  modifier isValidLoanID(uint loanID) {
    require(
      loanID < totalLoanRequests,
      "Loan ID is invalid."
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

  // TODO: add modifier for checking period values
  // TODO: add modifier for checking price values

  constructor() public {
    manager = msg.sender;
    totalLoanRequests = 0;
  }

  // Equivalent to 'bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))'
  // Or this.onERC721Received.selector
  function onERC721Received(address operator, address from, uint256 tokenId, bytes memory data) public override returns (bytes4) {
    return 0x150b7a02;
  }

  function pauseLoans() public onlyManager {
      _pause();
  }

  function unPauseLoans() public onlyManager {
      _unpause();
  }

  function createLoanRequest(address smartContractAddressOfNFT,
                            uint tokenIdNFT,
                            uint loanAmount,
                            uint interestAmount,
                            uint singlePeriodTime,
                            uint maximumInterestPeriods) public whenNotPaused {
    IERC721 currentNFT = IERC721(smartContractAddressOfNFT);
    require(currentNFT.getApproved(tokenIdNFT) == address(this),
            "Transfer has to be approved first");
    currentNFT.safeTransferFrom(msg.sender, address(this), tokenIdNFT);

    LoanRequest storage loanRequest =  allLoanRequests[totalLoanRequests];
    loanRequest.loanID = totalLoanRequests;
    loanRequest.lender = address(0x0);
    loanRequest.borrower = msg.sender;
    loanRequest.smartContractAddressOfNFT = smartContractAddressOfNFT;
    loanRequest.tokenIdNFT = tokenIdNFT;
    loanRequest.loanAmount = loanAmount;
    loanRequest.interestAmount = interestAmount;
    loanRequest.singlePeriodTime = singlePeriodTime;
    loanRequest.maximumInterestPeriods = maximumInterestPeriods;
    loanRequest.status = Status.PENDING;
    totalLoanRequests++;
  }

  function acceptLoanRequest(uint loanID) payable public isValidLoanID(loanID) whenNotPaused {
    require(allLoanRequests[loanID].status == Status.PENDING, "Status is not PENDING for loan.");
    require(allLoanRequests[loanID].borrower != msg.sender, "Invalid operation. You cannot underwrite your own loan.");

    // The lender is require to underwrite the total loan amount minus the interest
    // For the first period of the loan
    uint sumForLoan = allLoanRequests[loanID].loanAmount - allLoanRequests[loanID].interestAmount;
    require(msg.value >= sumForLoan, "Not enough Ether sent to function to underwrite loan.");

    // Send sumForLoan to borrower
    // NFT is kept by the loans smart contract
    allLoanRequests[loanID].borrower.transfer(sumForLoan);
    allLoanRequests[loanID].maximumInterestPeriods--;

    allLoanRequests[loanID].lender = msg.sender;
    allLoanRequests[loanID].status = Status.ACTIVE;
    allLoanRequests[loanID].endLoanTimeStamp = now + allLoanRequests[loanID].singlePeriodTime;
  }

  function extendLoanRequest(uint loanID) payable public isValidLoanID(loanID) whenNotPaused {
    require(allLoanRequests[loanID].status == Status.ACTIVE, "Status is not ACTIVE for loan");
    require(allLoanRequests[loanID].borrower == msg.sender, "Only the borrower can call this function.");
    require(allLoanRequests[loanID].maximumInterestPeriods > 0, "The maximum number of extensions to the loan has been reached.");
    require(msg.value >= allLoanRequests[loanID].interestAmount, "Not enough Ether sent to the function to extend loan.");

    allLoanRequests[loanID].lender.transfer(allLoanRequests[loanID].interestAmount);

    allLoanRequests[loanID].maximumInterestPeriods--;
    allLoanRequests[loanID].endLoanTimeStamp += allLoanRequests[loanID].singlePeriodTime;
  }

  function endLoanRequest(uint loanID) payable public isValidLoanID(loanID) {
    require(allLoanRequests[loanID].status == Status.ACTIVE, "Status is not ACTIVE to end loan");
    // TODO: add message to require
    require((msg.sender == allLoanRequests[loanID].lender  &&
            now >= allLoanRequests[loanID].endLoanTimeStamp) || msg.sender == allLoanRequests[loanID].borrower);

    // Borrower sends principal amount of loan back to lender
    // And receives NFT collateral back
    if (msg.sender == allLoanRequests[loanID].borrower) {
      require(msg.value >= allLoanRequests[loanID].loanAmount, "The principal amount of the loan was not sent");
      allLoanRequests[loanID].lender.transfer(allLoanRequests[loanID].loanAmount);
      allLoanRequests[loanID].status = Status.ENDED;
    } else {
      allLoanRequests[loanID].status = Status.DEFAULTED;
    }

    // NFT is sent to the function caller (the lender or borrower).
    IERC721 currentNFT = IERC721(allLoanRequests[loanID].smartContractAddressOfNFT);
    currentNFT.transferFrom(address(this), msg.sender, allLoanRequests[loanID].tokenIdNFT);
  }

  function cancelLoanRequest(uint loanID) public isValidLoanID(loanID) {
    require(allLoanRequests[loanID].status == Status.PENDING, "Status is not PENDING to cancel loan request");
    require(msg.sender == allLoanRequests[loanID].borrower);

    IERC721 currentNFT = IERC721(allLoanRequests[loanID].smartContractAddressOfNFT);
    currentNFT.safeTransferFrom(address(this), msg.sender, allLoanRequests[loanID].tokenIdNFT);

    allLoanRequests[loanID].status = Status.CANCELLED;
  }

}
