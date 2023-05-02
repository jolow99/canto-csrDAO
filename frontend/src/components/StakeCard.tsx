import { useAddress, useContract, useContractRead, useContractWrite, Web3Button } from "@thirdweb-dev/react";
import TREASURY_ABI from "../constants/treasury.json";
import TURNSTILE_ABI from "../constants/turnstile.json";
import addresses from "../constants/addresses.json";



function NftCard(data: any) {
  const address = useAddress();

  const { contract: turnstile } = useContract(
    addresses.turnstile,
    TURNSTILE_ABI
  );
  const { data: tokenBalance } = useContractRead(turnstile, "balances", [
    data.tokenId,
  ]);

  const { contract: treasury} = useContract(
    addresses.treasury,
    TREASURY_ABI
  );

  const { mutateAsync:unstake } = useContractWrite(
    treasury,
    "withdrawCsrNft"
  );

  const { mutateAsync:redeem } = useContractWrite(
    treasury,
    "redeemAccruedCsr"
  );


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
          <h1 className="text-2xl font-bold">{parseInt(tokenBalance)}</h1>
          <p className="text-sm text-gray-500">Balance</p>
        </div>
        <Web3Button
          className="bg-blue-500 hover:bg-blue-200 text-white font-bold py-2 px-4 rounded"
          contractAddress={addresses.treasury}
          action={() =>
            unstake({
              args: [parseInt(data.tokenId), address],
            })
          }
        >
          Unstake
        </Web3Button>
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


      </div>
    </li>
  );
}

export default function StakeCard() {
  const { contract} = useContract(
    addresses.treasury,
    TREASURY_ABI
  );
  const address = useAddress();
  const { data: tokenIds } = useContractRead(contract, "getDonorTokenIds", [address]);
  console.log("Token IDs")
  console.log(tokenIds)

  return (
    <div>
      <div className="border-b border-gray-200 pb-5 mb-5 sm:flex sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          CSR NFTs Staked in Treasury 
        </h2>
      </div>

      <ul
        role="list"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {tokenIds &&
          tokenIds.map((id:any) => {
            return(
              <div key={id}>
                <NftCard tokenId={id}/>
              </div>
            )
          })}
      </ul>
    </div>
  );
}
