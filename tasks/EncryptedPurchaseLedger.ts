import { FhevmType } from "@fhevm/hardhat-plugin";
import { task } from "hardhat/config";
import type { TaskArguments } from "hardhat/types";

task("task:address", "Prints the EncryptedPurchaseLedger address").setAction(async function (_taskArguments: TaskArguments, hre) {
  const { deployments } = hre;

  const ledger = await deployments.get("EncryptedPurchaseLedger");

  console.log("EncryptedPurchaseLedger address is " + ledger.address);
});

task("task:purchase-count", "Reads purchase count for a given user")
  .addOptionalParam("user", "Address to inspect. Defaults to first signer")
  .addOptionalParam("address", "Override contract address")
  .setAction(async function (taskArguments: TaskArguments, hre) {
    const { ethers, deployments } = hre;

    const ledgerDeployment = taskArguments.address
      ? { address: taskArguments.address }
      : await deployments.get("EncryptedPurchaseLedger");

    const user = taskArguments.user || (await ethers.getSigners())[0].address;

    const ledgerContract = await ethers.getContractAt("EncryptedPurchaseLedger", ledgerDeployment.address);
    const count = await ledgerContract.getPurchaseCount(user);

    console.log(`EncryptedPurchaseLedger: ${ledgerDeployment.address}`);
    console.log(`Purchase count for ${user}: ${count}`);
  });

task("task:record-purchase", "Records an encrypted purchase")
  .addParam("itemid", "Item identifier (uint32)")
  .addParam("quantity", "Quantity purchased (uint32)")
  .addParam("price", "Unit price as integer (uint64)")
  .addOptionalParam("address", "Override contract address")
  .setAction(async function (taskArguments: TaskArguments, hre) {
    const { ethers, deployments, fhevm } = hre;

    const itemId = parseInt(taskArguments.itemid, 10);
    const quantity = parseInt(taskArguments.quantity, 10);
    const price = BigInt(taskArguments.price);

    if (!Number.isInteger(itemId) || itemId < 0) {
      throw new Error(`Argument --itemid must be a positive integer`);
    }

    if (!Number.isInteger(quantity) || quantity <= 0) {
      throw new Error(`Argument --quantity must be a positive integer`);
    }

    if (price <= BigInt(0)) {
      throw new Error(`Argument --price must be a positive integer`);
    }

    await fhevm.initializeCLIApi();

    const ledgerDeployment = taskArguments.address
      ? { address: taskArguments.address }
      : await deployments.get("EncryptedPurchaseLedger");

    console.log(`EncryptedPurchaseLedger: ${ledgerDeployment.address}`);

    const signers = await ethers.getSigners();
    const signer = signers[0];

    const ledgerContract = await ethers.getContractAt("EncryptedPurchaseLedger", ledgerDeployment.address);

    const encryptedInput = await fhevm
      .createEncryptedInput(ledgerDeployment.address, signer.address)
      .add32(itemId)
      .add32(quantity)
      .add64(price)
      .encrypt();

    const tx = await ledgerContract
      .connect(signer)
      .recordPurchase(
        encryptedInput.handles[0],
        encryptedInput.handles[1],
        encryptedInput.handles[2],
        encryptedInput.inputProof,
      );

    console.log(`Wait for tx:${tx.hash}...`);
    const receipt = await tx.wait();
    console.log(`tx:${tx.hash} status=${receipt?.status}`);
  });

task("task:decrypt-purchase", "Decrypts a stored encrypted purchase")
  .addParam("index", "Purchase index to decrypt")
  .addOptionalParam("user", "Owner address. Defaults to first signer")
  .addOptionalParam("address", "Override contract address")
  .setAction(async function (taskArguments: TaskArguments, hre) {
    const { ethers, deployments, fhevm } = hre;

    const index = parseInt(taskArguments.index, 10);
    if (!Number.isInteger(index) || index < 0) {
      throw new Error(`Argument --index must be a non-negative integer`);
    }

    await fhevm.initializeCLIApi();

    const ledgerDeployment = taskArguments.address
      ? { address: taskArguments.address }
      : await deployments.get("EncryptedPurchaseLedger");

    const signers = await ethers.getSigners();
    const signer = signers[0];
    const user = taskArguments.user || signer.address;

    const ledgerContract = await ethers.getContractAt("EncryptedPurchaseLedger", ledgerDeployment.address);

    const record = await ledgerContract.getPurchaseRecord(user, index);

    const decryptedItemId = await fhevm.userDecryptEuint(
      FhevmType.euint32,
      record.itemId,
      ledgerDeployment.address,
      signer,
    );

    const decryptedQuantity = await fhevm.userDecryptEuint(
      FhevmType.euint32,
      record.quantity,
      ledgerDeployment.address,
      signer,
    );

    const decryptedPrice = await fhevm.userDecryptEuint(
      FhevmType.euint64,
      record.unitPrice,
      ledgerDeployment.address,
      signer,
    );

    console.log(`EncryptedPurchaseLedger: ${ledgerDeployment.address}`);
    console.log(`User: ${user}`);
    console.log(`Index: ${index}`);
    console.log(`Item ID: ${decryptedItemId}`);
    console.log(`Quantity: ${decryptedQuantity}`);
    console.log(`Unit price: ${decryptedPrice}`);
    console.log(`Timestamp: ${record.timestamp}`);
  });
