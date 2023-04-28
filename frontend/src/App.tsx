import Navbar from "./components/Navbar";
import MintCard from "./components/MintCard";
import MethodACard from "./components/MethodACard";
import Footer from "./components/Footer";
import MethodBCard from "./components/MethodBCard";
import MethodCCard from "./components/MethodCCard";
import MethodDCard from "./components/MethodDCard";

export default function App() {
  return (
    <div className="">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <MintCard />
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <MethodACard />
          <MethodBCard/>
          <MethodCCard/>
          <MethodDCard/>
        </ul>
      </main>
      <Footer />
    </div>
  );
}
