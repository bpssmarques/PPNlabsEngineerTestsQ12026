// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract MiniVault {
    IERC20 public immutable asset;

    mapping(address => uint256) public balanceOf;
    uint256 public totalShares;

    event Deposited(address indexed user, uint256 assets, uint256 shares);
    event Withdrawn(address indexed user, uint256 assets, uint256 shares);

    constructor(address asset_) {
        require(asset_ != address(0), "asset=0");
        asset = IERC20(asset_);
    }

    function totalAssets() public view returns (uint256) {
        return asset.balanceOf(address(this));
    }

    function deposit(uint256 assets) external returns (uint256 shares) {
        require(assets > 0, "assets=0");

        uint256 supply = totalShares;
        uint256 assetsBefore = totalAssets();

        require(asset.transferFrom(msg.sender, address(this), assets), "transferFrom");

        if (supply == 0 || assetsBefore == 0) {
            shares = assets;
        } else {
            // INTENTIONAL BUG: rounds up and can over-mint shares.
            shares = _mulDivUp(assets, supply, assetsBefore);
        }

        require(shares > 0, "shares=0");
        totalShares = supply + shares;
        balanceOf[msg.sender] += shares;

        emit Deposited(msg.sender, assets, shares);
    }

    function withdraw(uint256 shares) external returns (uint256 assetsOut) {
        require(shares > 0, "shares=0");
        uint256 userShares = balanceOf[msg.sender];
        require(userShares >= shares, "insufficient-shares");

        uint256 supply = totalShares;
        uint256 assetsBefore = totalAssets();
        require(supply > 0, "supply=0");

        assetsOut = (shares * assetsBefore) / supply;
        require(assetsOut > 0, "assets=0");

        balanceOf[msg.sender] = userShares - shares;
        totalShares = supply - shares;
        require(asset.transfer(msg.sender, assetsOut), "transfer");

        emit Withdrawn(msg.sender, assetsOut, shares);
    }

    function _mulDivUp(uint256 a, uint256 b, uint256 c) private pure returns (uint256) {
        return (a * b + c - 1) / c;
    }
}
