import { ConnectWallet } from "@thirdweb-dev/react";

export default function Home() {
  return (
        <div>
          <ConnectWallet dropdownPosition={{
            align: 'center',
            side: 'bottom'
          }} />
        </div>
  );
}
