const nfts = [
  {
    id: 1,
    balance: 27,
  },
  {
    id: 2,
    balance: 33,
  },
];

export default function Example() {
  return (
    <div>
      <div className="border-b border-gray-200 pb-5 mb-5 sm:flex sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Your CSR NFTs
        </h2>
      </div>

      <ul
        role="list"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {nfts.map((nft) => (
          <li
            key={nft.id}
            className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow"
          >
            <div className="flex flex-col items-center justify-center space-y-2 p-6">
              <div className="flex flex-col items-center justify-center space-y-1">
                <h1 className="text-2xl font-bold">{nft.id}</h1>
                <p className="text-sm text-gray-500">Token ID</p>
              </div>
              <div className="flex flex-col items-center justify-center space-y-1">
                <h1 className="text-2xl font-bold">{nft.balance}</h1>
                <p className="text-sm text-gray-500">Balance</p>
              </div>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Select
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
