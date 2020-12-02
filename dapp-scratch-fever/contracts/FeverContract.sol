pragma solidity ^0.5.16;

contract FeverContract {

  uint8 temperature;

  constructor() public {
    temperature = 98;
  }

  function getTemperature () public view returns(uint8) {
    return temperature;
  }

  function hasFever () public view returns(bool) {
    return temperature > 100;
  }

  function increaseTemp () public returns(uint8) {
    if (temperature > 110) revert("you are dead—too hot!!!");
    temperature += 1;
    return temperature;
  }

  function decreaseTemp () public returns(uint8) {
    if (temperature < 95) revert("you are dead—too cold!!!");
    temperature -= 1;
    return temperature;
  }

}
