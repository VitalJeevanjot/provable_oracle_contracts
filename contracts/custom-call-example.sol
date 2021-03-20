pragma solidity >0.6.0 <0.8.0;

import "./OracleAPI_Moonbeam.sol";

contract APIConsumer is onSayNetwork {
    string public price;
    bytes public current_proof;
    uint256 public gasPrice;
    address public owner;
    address public cb_address;
    uint256 public current_balance;
    uint256 public gas_limit_block;

    event Publish(string price, uint256 timestamp);
    event LogNewSayNetworkQuery(string description);

    constructor() public {
        owner = msg.sender;
        say_setProof(proofType_TLSNotary);
    }

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    function updatePrice() public payable {
        // gasPrice = 550;
        gas_limit_block = block.gaslimit;
        gasPrice = say_getPrice("URL");
        current_balance = address(this).balance;

        if (gasPrice > address(this).balance) {
            emit LogNewSayNetworkQuery(
                "Say Network query was NOT sent, please send some BNB to cover for the query fee"
            );
        } else {
            emit LogNewSayNetworkQuery(
                "Say Network query sent, standing by for the answer.."
            );
            say_query(
                "URL",
                "https://api.pro.coinbase.com/products/ETH-USD/ticker,price"
            );
        }
    }

    function __callback(
        bytes32 _requestId,
        string memory curr_price,
        bytes memory _proof
    ) public {
        cb_address = say_cbAddress();
        if (msg.sender != cb_address) revert();
        price = curr_price;
        current_proof = _proof;
        emit Publish(price, block.timestamp);
    }
}
