import {useAddress, useContract, useContractWrite, Web3Button} from "@thirdweb-dev/react";
import TURNSTILE_ABI from "../constants/turnstile.json";
import addresses from "../constants/addresses.json";


export default function MethodACard(props: any) {
  const address = useAddress();
  const { contract } = useContract(addresses.turnstile,TURNSTILE_ABI);

  const { mutateAsync, isLoading, error } = useContractWrite(
    contract,
    "safeTransferFrom",
  );

    return (
      <div className="bg-white py-16">
        <div className="border-b border-gray-200 pb-5 sm:flex sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Method A: Transfer <br/> (Permanent Donation)
        </h2>
      </div>
      <div className="flex flex-col items-center justify-center space-y-2 p-6">
        <Web3Button 
        className="bg-blue-500 hover:bg-blue-200 text-white font-bold py-2 px-4 rounded"
        contractAddress={addresses.turnstile} 
        action={() => mutateAsync({args: [address, addresses.treasury, props.state, "0x"]})}>
          Transfer
        </Web3Button>
            </div>
      </div>
    )
  }
  