import {
  useAddress,
  useContract,
  useContractWrite,
  Web3Button,
} from "@thirdweb-dev/react";
import TURNSTILE_ABI from "../constants/turnstile.json";
import TREASURY_ABI from "../constants/treasury.json";
import addresses from "../constants/addresses.json";

export default function MethodBCard(props:any) {
  const { contract:turnstile } = useContract(addresses.turnstile, TURNSTILE_ABI);
  const { mutateAsync:approve} = useContractWrite(
    turnstile,
    "approve"
  );
  const { contract:treasury } = useContract(addresses.treasury, TREASURY_ABI);
  const { mutateAsync:stake } = useContractWrite(
    treasury,
    "stakeCsrNft"
  );

  console.log(addresses.treasury)
  console.log(props.state)

  return (
    <div className="bg-white py-16">
      <div className="border-b border-gray-200 pb-5 sm:flex sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Method B: Staking <br /> (Recurring Donation)
        </h2>
      </div>
      <div className="flex flex-col items-center justify-center space-y-2 p-6">
        <Web3Button
          className="bg-blue-500 hover:bg-blue-200 text-white font-bold py-2 px-4 rounded"
          contractAddress={addresses.turnstile}
          action={() =>
            approve({
              args: [addresses.treasury, props.state],
            })
          }
        >
          Approve
        </Web3Button>
        <Web3Button
          className="bg-blue-500 hover:bg-blue-200 text-white font-bold py-2 px-4 rounded"
          contractAddress={addresses.turnstile}
          action={() =>
            stake({
              args: [props.state],
            })
          }
        >
          Transfer
        </Web3Button>
      </div>
    </div>
  );
}
