import Navbar from "./components/Navbar";

export default function App() {
  return (
        <div className="">
          <Navbar/>
          <main className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-center min-h-screen py-12 space-y-6 sm:px-6 lg:px-8">
              <h1 className="text-6xl font-bold text-gray-900">csrDAO</h1>
              <p className="text-xl text-gray-900">A DAO for the people.</p>
              <p className="text-xl text-gray-900">Coming soon.</p>
            </div>
          </main>
        </div>
  );
}
