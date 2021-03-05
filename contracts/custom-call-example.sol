pragma solidity >0.6.0 <0.8.0;

import "./OracleAPI.sol";

contract APIConsumer is onSayNetwork {
    string public price;
    uint256 public gasPrice;
    address public owner;
    address public cb_address;

    event Publish(string ethv, uint256 timestamp);
    event LogNewProvableQuery(string description);

    constructor() public {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    function updatePrice() public payable {
        gasPrice = provable_getPrice("URL");

        if (gasPrice > address(this).balance) {
            emit LogNewProvableQuery(
                "Provable query was NOT sent, please send some ETH to cover for the query fee"
            );
        } else {
            emit LogNewProvableQuery(
                "Provable query sent, standing by for the answer.."
            );
            provable_query(
                "URL",
                "json(https://api.pro.coinbase.com/products/ETH-USD/ticker).price"
            );
        }
    }

    function __callback(bytes32 _requestId, string memory curr_price)
        public
        override
    {
        cb_address = provable_cbAddress();
        if (msg.sender != cb_address) revert();
        price = curr_price;
        emit Publish(price, block.timestamp);
    }
}
