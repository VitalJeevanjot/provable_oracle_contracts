pragma solidity >0.6.0 <0.8.0;

import "./OracleAPI.sol";
import "./ERC20/IERC20.sol";

contract APIConsumer is onSayNetwork {
    string public price;
    uint256 public gasPrice;
    address public owner;
    address public cb_address;

    address public token_address;

    event Publish(string ethv, uint256 timestamp);
    event LogNewProvableQuery(string description);

    constructor() public {
        owner = msg.sender;
        token_address = 0x4200000000000000000000000000000000000006;
    }

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    function updatePrice() public payable {
        gasPrice = say_Price("URL");
        uint256 balance = IERC20(token_address).balanceOf(address(this));
        if (gasPrice > balance) {
            emit LogNewProvableQuery(
                "Provable query was NOT sent, please send some ETH to cover for the query fee"
            );
        } else {
            emit LogNewProvableQuery(
                "Provable query sent, standing by for the answer.."
            );
            say_query(
                "URL",
                "json(https://api.pro.coinbase.com/products/ETH-USD/ticker).price"
            );
        }
    }

    function __callback(bytes32 _requestId, string memory curr_price) public {
        cb_address = say_cbAddress(msg.sender);
        if (msg.sender != cb_address) revert();
        price = curr_price;
        emit Publish(price, block.timestamp);
    }
}
