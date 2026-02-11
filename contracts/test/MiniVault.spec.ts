import {expect} from "chai";
import {ethers} from "hardhat";

describe("MiniVault", function () {
  it("keeps share accounting fair across sequential deposits", async function () {
    const [owner, alice, bob] = await ethers.getSigners();

    const tokenFactory = await ethers.getContractFactory("MockERC20", owner);
    const token = await tokenFactory.deploy("Mock USD", "mUSD");
    await token.waitForDeployment();

    const vaultFactory = await ethers.getContractFactory("MiniVault", owner);
    const vault = await vaultFactory.deploy(await token.getAddress());
    await vault.waitForDeployment();

    await token.mint(alice.address, 1002n);
    await token.mint(bob.address, 1000n);

    await token.connect(alice).approve(await vault.getAddress(), 1002n);
    await token.connect(bob).approve(await vault.getAddress(), 1000n);

    await vault.connect(alice).deposit(1001n);
    // Simulate yield or external donation to create a non-even exchange rate.
    await token.connect(alice).transfer(await vault.getAddress(), 1n);
    await vault.connect(bob).deposit(1000n);

    const bobShares = await vault.balanceOf(bob.address);
    expect(bobShares).to.equal(999n);
  });

  it("allows withdrawal proportional to held shares", async function () {
    const [owner, alice] = await ethers.getSigners();

    const tokenFactory = await ethers.getContractFactory("MockERC20", owner);
    const token = await tokenFactory.deploy("Mock USD", "mUSD");
    await token.waitForDeployment();

    const vaultFactory = await ethers.getContractFactory("MiniVault", owner);
    const vault = await vaultFactory.deploy(await token.getAddress());
    await vault.waitForDeployment();

    await token.mint(alice.address, 1000n);
    await token.connect(alice).approve(await vault.getAddress(), 1000n);

    await vault.connect(alice).deposit(1000n);
    await vault.connect(alice).withdraw(500n);

    expect(await vault.balanceOf(alice.address)).to.equal(500n);
  });
});
