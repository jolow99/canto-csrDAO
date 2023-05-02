import {useAddress, useContract, useContractWrite, Web3Button} from "@thirdweb-dev/react";
import TURNSTILE_ABI from "../abis/turnstile.json";


export default function MethodACard(props: any) {
  const address = useAddress();
  const TREASURY_ADDRESS =  "0x37b1Addd3bF4A982E75C8BCdccA04ef942964A60"

  const { contract } = useContract(TREASURY_ADDRESS,TURNSTILE_ABI);

  const { mutateAsync, isLoading, error } = useContractWrite(
    contract,
    "safeTransferFrom",
  );

  console.log("State")
  console.log(props.state)
  console.log(typeof props.state)

  
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
        contractAddress={TREASURY_ADDRESS} 
        action={() => mutateAsync({args: [address, TREASURY_ADDRESS, props.state, "0x"]})}>
          Transfer
        </Web3Button>
            </div>
      </div>
    )
  }
  