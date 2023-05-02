import {
  useContract,
  useContractRead,
  useContractWrite,
  Web3Button,
} from "@thirdweb-dev/react";
import TURNSTILE_ABI from "../constants/turnstile.json";
import addresses from "../constants/addresses.json";

export default function MethodCCard(props:any) {
  const { contract:turnstile } = useContract(addresses.turnstile, TURNSTILE_ABI);
  const { data: tokenBalance } = useContractRead(turnstile, "balances", [props.state]);
  const { mutateAsync:withdraw } = useContractWrite(turnstile, "withdraw");

    return (
      <div className="bg-white py-16">
        <div className="border-b border-gray-200 pb-5 sm:flex sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Method C: Donate CSR <br/> (One-time Donation)
        </h2>
      </div>
      <div className="flex flex-col items-center justify-center space-y-2 p-6">
      <Web3Button
          className="bg-blue-500 hover:bg-blue-200 text-white font-bold py-2 px-4 rounded"
          contractAddress={addresses.turnstile}
          action={() =>
            withdraw({
              args: [props.state, "0x0c1514024c4A847907FbdB8eA0Dd95a4eeAe9237", tokenBalance.toString()],
            })
          }
        >
          Withdraw
        </Web3Button>
            </div>
      </div>
    )
  }
  