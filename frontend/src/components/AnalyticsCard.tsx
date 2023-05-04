import { useAddress, useContract, useContractRead} from "@thirdweb-dev/react";
import TREASURY_ABI from "../constants/treasury.json";
import addresses from "../constants/addresses.json";
import { ethers } from "ethers";

export default function AnalyticsCard() {
  const { contract} = useContract(
    addresses.treasury,
    TREASURY_ABI
  );
  const address = useAddress();
  const { data: totalDonations } = useContractRead(contract, "totalDonations", []);
  const { data: userDonations } = useContractRead(contract, "donations", [address])

  return (
    <div>
      <div className="border-b border-gray-200 pb-5 mb-5 sm:flex sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Analytics
        </h2>
      </div>

      <ul
        role="list"
        className="grid gap-6 grid-cols-1 sm:grid-cols-2"
      >
        <li className="col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200">
          <div className="flex flex-col items-center justify-center space-y-2 p-6">
            <div className="flex flex-col items-center justify-center space-y-1">
              <h1 className="text-2xl font-bold">{totalDonations && ethers.utils.formatUnits(totalDonations,"ether")}</h1>
              <p className="text-sm text-gray-500">Total Donations</p>
            </div>
          </div>
        </li>
        <li className="col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200">
          <div className="flex flex-col items-center justify-center space-y-2 p-6">
            <div className="flex flex-col items-center justify-center space-y-1">
              <h1 className="text-2xl font-bold">{userDonations && ethers.utils.formatUnits(userDonations,"ether")}</h1>
              <p className="text-sm text-gray-500">Your Donations</p>
            </div>
          </div>
        </li>
      </ul>

    </div>
  );
}
