import addresses from "../constants/addresses.json";
import { Web3Button, useSDK } from "@thirdweb-dev/react";

export default function MethodDCard() {
  const sdk = useSDK();


    return (
      <div className="bg-white py-16">
        <div className="border-b border-gray-200 pb-5 sm:flex sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Method D: Donate CANTO  <br/> (One-time Donation)
        </h2>
      </div>
      <div className="flex flex-col items-center justify-center space-y-2 p-6">
              <div className="flex flex-col items-center justify-center space-y-1">
              <input id="number-input" type="number" className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"/>
                <p className="text-sm text-gray-500">Amount</p>
              </div>
              
              <Web3Button
              contractAddress={addresses.treasury}
              action={() => sdk?.wallet.transfer(addresses.treasury, "0.1")}
              overrides={{
                gasLimit: 10000000,
                gasPrice: 1000000000,
              }}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Transfer
              </Web3Button>
            </div>
      </div>
    )
  }
  