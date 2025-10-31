import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";
import { ethers, fhevm, deployments } from "hardhat";
import { EncryptedPurchaseLedger } from "../types";
import { expect } from "chai";
import { FhevmType } from "@fhevm/hardhat-plugin";

type Signers = {
  alice: HardhatEthersSigner;
};

describe("EncryptedPurchaseLedgerSepolia", function () {
  let signers: Signers;
  let ledgerContract: EncryptedPurchaseLedger;
  let ledgerContractAddress: string;
  let step: number;
  let steps: number;

  function progress(message: string) {
    console.log(`${++step}/${steps} ${message}`);
  }

  before(async function () {
    if (fhevm.isMock) {
      console.warn(`This hardhat test suite can only run on Sepolia Testnet`);
      this.skip();
    }

    try {
      const ledgerDeployment = await deployments.get("EncryptedPurchaseLedger");
      ledgerContractAddress = ledgerDeployment.address;
      ledgerContract = await ethers.getContractAt("EncryptedPurchaseLedger", ledgerDeployment.address);
    } catch (e) {
      (e as Error).message += ". Call 'npx hardhat deploy --network sepolia'";
      throw e;
    }

    const ethSigners: HardhatEthersSigner[] = await ethers.getSigners();
    signers = { alice: ethSigners[0] };
  });

  beforeEach(async () => {
    step = 0;
    steps = 0;
  });

  it("records and decrypts a purchase", async function () {
    steps = 9;

    this.timeout(4 * 40000);

    progress("Encrypting purchase values...");
    const encryptedValues = await fhevm
      .createEncryptedInput(ledgerContractAddress, signers.alice.address)
      .add32(7)
      .add32(2)
      .add64(BigInt(555))
      .encrypt();

    progress(
      `Call recordPurchase() ledger=${ledgerContractAddress} handles=${encryptedValues.handles
        .map((handle: string) => ethers.hexlify(handle))
        .join(",")} signer=${signers.alice.address}...`,
    );
    const tx = await ledgerContract
      .connect(signers.alice)
      .recordPurchase(
        encryptedValues.handles[0],
        encryptedValues.handles[1],
        encryptedValues.handles[2],
        encryptedValues.inputProof,
      );
    await tx.wait();

    progress(`Call getLatestPurchase()...`);
    const record = await ledgerContract.getLatestPurchase(signers.alice.address);

    progress(`Decrypting itemId=${record.itemId}...`);
    const decryptedItemId = await fhevm.userDecryptEuint(
      FhevmType.euint32,
      record.itemId,
      ledgerContractAddress,
      signers.alice,
    );
    progress(`ItemId=${decryptedItemId}`);

    progress(`Decrypting quantity=${record.quantity}...`);
    const decryptedQuantity = await fhevm.userDecryptEuint(
      FhevmType.euint32,
      record.quantity,
      ledgerContractAddress,
      signers.alice,
    );
    progress(`Quantity=${decryptedQuantity}`);

    progress(`Decrypting unitPrice=${record.unitPrice}...`);
    const decryptedPrice = await fhevm.userDecryptEuint(
      FhevmType.euint64,
      record.unitPrice,
      ledgerContractAddress,
      signers.alice,
    );
    progress(`UnitPrice=${decryptedPrice}`);

    expect(decryptedItemId).to.eq(7);
    expect(decryptedQuantity).to.eq(2);
    expect(decryptedPrice).to.eq(BigInt(555));
  });
});
