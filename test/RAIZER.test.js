const BigNumber = web3.BigNumber;
const chai = require('chai');
chai.use(require('chai-bignumber')(BigNumber)).should();

const RAIZER = artifacts.require('RAIZER');

contract('RAIZER', function([owner, wallet]) {
  beforeEach(async function(){
    this.token = await RAIZER.new();
  });

  describe('token attributes', function() {
    it('has the correct name', async function() {
      const name = await this.token.name();
      name.should.equal('RAIZER');
    });

    it('has the correct symbol', async function() {
      const symbol = await this.token.symbol();
      symbol.should.equal('RAIZER');
    });

    it('has the correct decimals', async function() {
      const decimals = await this.token.decimals();
      expect(decimals).to.eql(web3.utils.toBN('18'));
    });

    it('has the correct init totalSupply', async function() {
      const totalSupply = await this.token.totalSupply();
      expect(totalSupply).to.eql(web3.utils.toBN('0'));
    });
  });

  describe('#mint', function() {
    it('should have correct balance after minted', async function() {
      amount = web3.utils.toBN("1000")
      await this.token.mint(wallet, amount, { from: owner })
      const walletBalance = await this.token.balanceOf(wallet);
      expect(await this.token.totalSupply()).to.eql(amount);
      expect(walletBalance).to.eql(amount);
    });

    it('should rejected if amount bigger than max caped amount', async function() {
      amount = web3.utils.toBN("1000000000000000000000000001") // 10**27 + 1
      try {
        await this.token.mint(wallet, amount, { from: owner });
      } catch (err) {
        expect(err.reason).to.equal('BEP20Capped: cap exceeded')
      }
      expect(await this.token.balanceOf(wallet)).to.eql(web3.utils.toBN("0"));
      expect(await this.token.totalSupply()).to.eql(web3.utils.toBN("0"));
    });

    it('should success mint max cap after burnt all', async function() {
      amount = web3.utils.toBN("1000")
      maxCap = web3.utils.toBN('1000000000000000000000000000')
      // mint
      await this.token.mint(wallet, amount, { from: owner });
      expect(await this.token.balanceOf(wallet)).to.eql(amount);
      // burn
      await this.token.burn(amount, { from: wallet })
      expect(await this.token.balanceOf(wallet)).to.eql(web3.utils.toBN("0"));
      // mint max Cap again!
      await this.token.mint(wallet, maxCap, { from: owner });
      expect(await this.token.totalSupply()).to.eql(maxCap);
      expect(await this.token.balanceOf(wallet)).to.eql(maxCap);
    });
  });

  describe('#burn', function() {
    it('should reduce balance after burnt', async function() {
      amount = web3.utils.toBN("1000")
      burnAmount = web3.utils.toBN("400")
      await this.token.mint(wallet, amount, { from: owner })
      await this.token.burn(burnAmount, { from: wallet })
      const walletBalance = await this.token.balanceOf(wallet);
      expect(await this.token.totalSupply()).to.eql(web3.utils.toBN("600"));
      expect(walletBalance).to.eql(web3.utils.toBN("600"));
    });
  });
});
