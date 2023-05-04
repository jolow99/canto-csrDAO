import { useAddress, useContract, useContractRead } from "@thirdweb-dev/react";
import TURNSTILE_ABI from "../constants/turnstile.json";
import addresses from "../constants/addresses.json";
import { ethers } from "ethers";

function NftCard(data: any) {
  const address = useAddress();

  const { contract } = useContract(addresses.turnstile, TURNSTILE_ABI);
  const { data: tokenId } = useContractRead(contract, "tokenOfOwnerByIndex", [
    address,
    data.index,
  ]);
  const { data: tokenBalance } = useContractRead(contract, "balances", [
    tokenId,
  ]);

  function handleOnClick() {
    data.setter(parseInt(tokenId));
  }

  return (
    <li
      key={parseInt(tokenId)}
      className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow"
    >
      <div className="flex flex-col items-center justify-center space-y-2 p-6">
        <div className="flex flex-col items-center justify-center space-y-1">
          <h1 className="text-2xl font-bold">{tokenId && parseInt(tokenId)}</h1>
          <p className="text-sm text-gray-500">Token ID</p>
        </div>
        <div className="flex flex-col items-center justify-center space-y-1">
          <h1 className="text-2xl font-bold">
            {tokenBalance && ethers.utils.formatUnits(tokenBalance, "ether")}
          </h1>
          <p className="text-sm text-gray-500">Balance</p>
        </div>

        {data.state === parseInt(tokenId) ? (
          <button
            onClick={handleOnClick}
            className="disable bg-gray-500 font-bold py-2 px-4 rounded"
          >
            <p className="text-sm text-white">Selected</p>
          </button>
        ) : (
          <button
            onClick={handleOnClick}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            <p className="text-sm text-white">Select</p>
          </button>
        )}
      </div>
    </li>
  );
}

export default function MintCard(props: {
  state: number;
  setter: React.Dispatch<React.SetStateAction<number>>;
}) {
  const { contract, isLoading, error } = useContract(
    "0xEcf044C5B4b867CFda001101c617eCd347095B44",
    TURNSTILE_ABI
  );
  const address = useAddress();
  const { data: numOfTokens } = useContractRead(contract, "balanceOf", [
    address,
  ]);

  return (
    <div className="py-16">
      <div className="border-b border-gray-200 pb-5 mb-5 sm:flex sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          CSR NFTs In Your Wallet
        </h2>
      </div>

      <ul
        role="list"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {numOfTokens ? (
          Array.from(Array(parseInt(numOfTokens)).keys()).map((i, _) => {
            return (
              <div key={i}>
                <NftCard index={i} state={props.state} setter={props.setter} />
              </div>
            );
          })
        ) : (
          <div className="">
            <div className="flex flex-col items-center justify-center space-y-1">
              <h1 className="text-xl">You have no CSR NFTs. Deploy a contract and register with the turnstile to get one!</h1>
            </div>
          </div>
        )}
      </ul>
    </div>
  );
}
