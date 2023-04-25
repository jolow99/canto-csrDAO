import { ConnectWallet } from "@thirdweb-dev/react";

export default function Navbar() {
  return (
    <div className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex space-x-4">
            <h1 className="text-white font-bold text-2xl">csrDAO</h1>
          </div>

          <div>
            <ConnectWallet
              className="relative inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              btnTitle="Connect Wallet"
              theme="light"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
