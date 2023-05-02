import Navbar from "./components/Navbar";
import MintCard from "./components/MintCard";
import MethodACard from "./components/MethodACard";
import Footer from "./components/Footer";
import MethodBCard from "./components/MethodBCard";
import MethodCCard from "./components/MethodCCard";
import MethodDCard from "./components/MethodDCard";
import { useState } from "react";

export default function App() {
  const [selectedTokenId, setSelectedTokenId] = useState(0);

  return (
    <div className="">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <MintCard state={selectedTokenId} setter={setSelectedTokenId} />
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <MethodACard state={selectedTokenId}/>
          <MethodBCard state={selectedTokenId}/>
          <MethodCCard state={selectedTokenId}/>
          <MethodDCard />
        </ul>
      </main>
      <Footer />
    </div>
  );
}
