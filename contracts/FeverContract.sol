pragma solidity ^0.4.17;

contract FeverContract {

  uint8 temperature;

  function FeverContract() {
    temperature = 98;
  }
  function getTemperature () public constant returns(uint8) {
    return temperature;
  }
  function hasFever () public constant returns(bool) {
    return temperature > 100;
  }
  function increaseTemp () public returns(uint8) {
    if (temperature > 110) revert();
    temperature += 1;
    return temperature;
  }
  function decreaseTemp () public returns(uint8) {
    if (temperature < 95) revert();
    temperature -= 1;
    return temperature;
  }
}
