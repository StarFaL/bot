// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

interface IERC20 {
    function transferFrom(address from, address to, uint256 amount) external returns(bool);
    function transfer(address to, uint256 amount) external returns(bool);
}

contract SimpleEscrow {
    address public admin;
    uint public tradeCount = 0;

    struct Trade {
        address buyer;
        address seller;
        IERC20 token;
        uint256 amount;
        bool released;
        bool exists;
    }

    mapping(uint => Trade) public trades;

    modifier onlyAdmin() {
        require(msg.sender == admin, "only admin");
        _;
    }

    constructor() {
        admin = msg.sender;
    }

    function createTrade(address _buyer, address _seller, address _token, uint256 _amount) external returns(uint) {
        tradeCount++;
        trades[tradeCount] = Trade({
            buyer: _buyer,
            seller: _seller,
            token: IERC20(_token),
            amount: _amount,
            released: false,
            exists: true
        });
        // transfer tokens from seller to escrow
        require(trades[tradeCount].token.transferFrom(_seller, address(this), _amount), "transfer failed");
        return tradeCount;
    }

    function releaseToSeller(uint tradeId) external onlyAdmin {
        Trade storage t = trades[tradeId];
        require(t.exists && !t.released, "invalid");
        t.released = true;
        require(t.token.transfer(t.seller, t.amount), "transfer failed");
    }

    function refundToBuyer(uint tradeId) external onlyAdmin {
        Trade storage t = trades[tradeId];
        require(t.exists && !t.released, "invalid");
        t.released = true;
        require(t.token.transfer(t.buyer, t.amount), "transfer failed");
    }
}
