import {
  useAddress,
  useContract,
  useContractRead,
  useContractWrite,
  Web3Button,
} from "@thirdweb-dev/react";
import TREASURY_ABI from "../constants/treasury.json";
import TURNSTILE_ABI from "../constants/turnstile.json";
import addresses from "../constants/addresses.json";
import { ethers } from "ethers";

export default function TreasuryDonateCard(data: any) {
  const { contract: turnstile } = useContract(
    addresses.turnstile,
    TURNSTILE_ABI
  );
  const { data: tokenBalance } = useContractRead(turnstile, "balances", [
    data.tokenId,
  ]);

  const { contract: treasury } = useContract(addresses.treasury, TREASURY_ABI);

  const { data: isStaked } = useContractRead(treasury, "stakedTokenIds", [
    data.tokenId,
  ]);
  console.log("STAKE");
  console.log(isStaked);

  const { mutateAsync: redeem } = useContractWrite(
    treasury,
    "redeemAccruedCsr"
  );

  const { mutateAsync: unstake } = useContractWrite(treasury, "withdrawCsrNft");

  return (
    <li
      key={parseInt(data.tokenId)}
      className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow"
    >
      <div className="flex flex-col items-center justify-center space-y-2 p-6">
        <div className="flex flex-col items-center justify-center space-y-1">
          <h1 className="text-2xl font-bold">{parseInt(data.tokenId)}</h1>
          <p className="text-sm text-gray-500">Token ID</p>
        </div>
        <div className="flex flex-col items-center justify-center space-y-1">
          <h1 className="text-2xl font-bold">
            {tokenBalance && ethers.utils.formatUnits(tokenBalance, "ether")}
          </h1>
          <p className="text-sm text-gray-500">Balance</p>
        </div>
        <Web3Button
          className="bg-blue-500 hover:bg-blue-200 text-white font-bold py-2 px-4 rounded"
          contractAddress={addresses.treasury}
          action={() =>
            redeem({
              args: [parseInt(data.tokenId)],
            })
          }
        >
          Donate
        </Web3Button>
        {isStaked && (
          <Web3Button
            className="bg-blue-500 hover:bg-blue-200 text-white font-bold py-2 px-4 rounded"
            contractAddress={addresses.treasury}
            action={() =>
              unstake({
                args: [parseInt(data.tokenId)],
              })
            }
          >
            Unstake
          </Web3Button>
        )}
      </div>
    </li>
  );
}
