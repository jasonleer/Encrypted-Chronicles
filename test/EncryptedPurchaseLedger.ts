import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";
import { expect } from "chai";
import { FhevmType } from "@fhevm/hardhat-plugin";
import { ethers, fhevm } from "hardhat";
import { EncryptedPurchaseLedger, EncryptedPurchaseLedger__factory } from "../types";

type Signers = {
  deployer: HardhatEthersSigner;
  alice: HardhatEthersSigner;
  bob: HardhatEthersSigner;
};

async function deployFixture() {
  const factory = (await ethers.getContractFactory("EncryptedPurchaseLedger")) as EncryptedPurchaseLedger__factory;
  const ledgerContract = (await factory.deploy()) as EncryptedPurchaseLedger;
  const ledgerAddress = await ledgerContract.getAddress();

  return { ledgerContract, ledgerAddress };
}

describe("EncryptedPurchaseLedger", function () {
  let signers: Signers;
  let ledgerContract: EncryptedPurchaseLedger;
  let ledgerAddress: string;

  before(async function () {
    const ethSigners: HardhatEthersSigner[] = await ethers.getSigners();
    signers = { deployer: ethSigners[0], alice: ethSigners[1], bob: ethSigners[2] };
  });

  beforeEach(async function () {
    if (!fhevm.isMock) {
      console.warn(`This hardhat test suite cannot run on Sepolia Testnet`);
      this.skip();
    }

    ({ ledgerContract, ledgerAddress } = await deployFixture());
  });

  it("starts with zero purchase records", async function () {
    const count = await ledgerContract.getPurchaseCount(signers.alice.address);
    expect(count).to.eq(0);
  });

  it("records and decrypts a purchase for the caller", async function () {
    const itemId = 42;
    const quantity = 3;
    const price = BigInt(1999);

    const encryptedInput = await fhevm
      .createEncryptedInput(ledgerAddress, signers.alice.address)
      .add32(itemId)
      .add32(quantity)
      .add64(price)
      .encrypt();

    const tx = await ledgerContract
      .connect(signers.alice)
      .recordPurchase(
        encryptedInput.handles[0],
        encryptedInput.handles[1],
        encryptedInput.handles[2],
        encryptedInput.inputProof,
      );
    await tx.wait();

    const count = await ledgerContract.getPurchaseCount(signers.alice.address);
    expect(count).to.eq(1);

    const record = await ledgerContract.getPurchaseRecord(signers.alice.address, 0);

    const decryptedItemId = await fhevm.userDecryptEuint(
      FhevmType.euint32,
      record.itemId,
      ledgerAddress,
      signers.alice,
    );
    const decryptedQuantity = await fhevm.userDecryptEuint(
      FhevmType.euint32,
      record.quantity,
      ledgerAddress,
      signers.alice,
    );
    const decryptedPrice = await fhevm.userDecryptEuint(
      FhevmType.euint64,
      record.unitPrice,
      ledgerAddress,
      signers.alice,
    );

    expect(decryptedItemId).to.eq(itemId);
    expect(decryptedQuantity).to.eq(quantity);
    expect(decryptedPrice).to.eq(price);
    expect(record.timestamp).to.not.eq(0);
  });

  it("prevents other users from decrypting someone else's purchase", async function () {
    const encryptedInput = await fhevm
      .createEncryptedInput(ledgerAddress, signers.alice.address)
      .add32(1)
      .add32(1)
      .add64(BigInt(100))
      .encrypt();

    const tx = await ledgerContract
      .connect(signers.alice)
      .recordPurchase(
        encryptedInput.handles[0],
        encryptedInput.handles[1],
        encryptedInput.handles[2],
        encryptedInput.inputProof,
      );
    await tx.wait();

    const record = await ledgerContract.getPurchaseRecord(signers.alice.address, 0);

    await fhevm
      .userDecryptEuint(FhevmType.euint32, record.itemId, ledgerAddress, signers.bob)
      .then(
        () => expect.fail("Bob should not be able to decrypt Alice's purchase"),
        (error) => {
          expect(error).to.be.instanceOf(Error);
        },
      );
  });
});
