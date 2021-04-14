pragma solidity 0.5.16;

import './token/BEP20/BEP20.sol';
import './token/BEP20/BEP20Detailed.sol';
import './token/BEP20/BEP20Burnable.sol';
import './token/BEP20/BEP20Capped.sol';

contract VACUS is BEP20, BEP20Detailed, BEP20Burnable, BEP20Capped {
  constructor()
  BEP20Detailed('VACUS', 'VACUS', 18)
  BEP20Capped(10**27)
  public {

  }
}
