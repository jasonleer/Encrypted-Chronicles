import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  const deployedLedger = await deploy("EncryptedChronicles", {
    from: deployer,
    log: true,
  });

  console.log(`EncryptedChronicles contract: `, deployedLedger.address);
};
export default func;
func.id = "deploy_encrypted_purchase_ledger"; // id required to prevent reexecution
func.tags = ["EncryptedChronicles"];
