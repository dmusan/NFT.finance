pragma solidity >=0.4.21 <0.7.0;

contract LendNFT {
  address public manager;

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

  function greet() public view onlyManager() returns (string memory)  {
    return "hello";
  }

}
