import {
  useAddress,
  useContract,
  useContractRead,
} from "@thirdweb-dev/react";
import TREASURY_ABI from "../constants/treasury.json";
import addresses from "../constants/addresses.json";
import TreasuryDonateCard from "./TreasuryDonateCard";
import TreasuryStakeCard from "./TreasuryStakeCard";

export default function StakeCard() {
  const { contract } = useContract(addresses.treasury, TREASURY_ABI);
  const address = useAddress();
  const { data: tokenIds } = useContractRead(contract, "getDonorTokenIds", [
    address,
  ]);
  const { data: stakedTokenIds } = useContractRead(
    contract,
    "getStakedTokenIds",
    [address]
  );

  console.log("Token Ids")
  console.log(tokenIds)

  console.log("Staked Token Ids")
  console.log(stakedTokenIds) 

  return (
    <div className="py-16">
      <div className="border-b border-gray-200 pb-5 mb-5 sm:flex sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          CSR NFTs In Treasury
        </h2>
      </div>

      <ul
        role="list"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {tokenIds &&
          tokenIds.map((id: any) => {
            return (
              <div key={parseInt(id)}>
                <TreasuryDonateCard tokenId={id}/>
              </div>
            );
          })}
        {stakedTokenIds &&
          stakedTokenIds.map((id: any) => {
            return (
              <div key={id}>
                <TreasuryStakeCard tokenId={id}/>
              </div>
            );
          })}
        {!tokenIds && !stakedTokenIds && (
          <div className="">
            <div className="flex flex-col items-center justify-center space-y-1">
              <h1 className="text-xl">
                You have no donated or staked CSR NFTs
              </h1>
            </div>
          </div>
        )}
      </ul>
    </div>
  );
}
