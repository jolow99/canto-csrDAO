import { useAddress, useContract, useContractRead, useContractWrite, Web3Button } from "@thirdweb-dev/react";
import TREASURY_ABI from "../constants/treasury.json";
import GOVERNOR_ABI from "../constants/governor.json";
import addresses from "../constants/addresses.json";
import { useForm } from "react-hook-form";
import { ethers } from "ethers";
import { useState, useEffect } from "react";


export default function GovernanceCard() {
  const { contract: treasury } = useContract(addresses.treasury, TREASURY_ABI);
  const { contract: governor } = useContract(addresses.governor, GOVERNOR_ABI);
  const { data: createProposal } = useContractWrite(governor, "propose");
  const { register, watch } = useForm();

  const [calldata, setCalldata] = useState("")
  const watchAllFields = watch();
  console.log(calldata)

  useEffect(() => {
    let recipient = watchAllFields.address
    let amount = watchAllFields.amount

    if (ethers.utils.isAddress(recipient)) {
      console.log(amount)
    let newcalldata = treasury?.encoder.encode("withdraw", [ethers.utils.getAddress(recipient), amount])
    if (newcalldata) {
      setCalldata(newcalldata)
    }
  }
    
  }, [watchAllFields])





  return (
    <div>
      <div className="border-b border-gray-200 pb-5 mb-5 sm:flex sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Governance
        </h2>
      </div>

      {/* Create a form that takes in two strings */}
      <form className="space-y-8 divide-y divide-gray-200">
        <div className="space-y-8 divide-y divide-gray-200">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Create a Proposal
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Create a proposal to be voted on by the community. Proposals can
              be used to request funds from the treasury.
            </p>

            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-2">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Proposal Description
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    {...register("description")}
                  />
                </div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Receiving Address
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    {...register("address")}
                  />
                </div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Amount of Funds
                </label>
                <div className="mt-1">
                  <input
                    type="number"
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    {...register("amount")}
                  />
                </div>
              </div>
              {/* <Web3Button
          className="bg-blue-500 hover:bg-blue-200 text-white font-bold py-2 px-4 rounded"
          contractAddress={addresses.governor}
          action={() =>
            createProposal({
              args: [[addresses.treasury], [0], [calldata], watchAllFields.description],
            })
          }
        >
          Create Proposal
        </Web3Button> */}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
