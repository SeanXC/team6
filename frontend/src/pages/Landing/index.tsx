import { FaUserGraduate } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-800 to-gray-700 overflow-y-auto">
      <header className="flex justify-between items-center p-6">
        <h1 className="text-4xl font-bold text-white">Convocraft</h1>
        <Link
          to="/login"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
        >
          Login
        </Link>
      </header>
      <main className="flex flex-col md:flex-row items-center justify-between flex-grow p-8">
        <div className="md:w-1/2 text-center md:text-left">
          <h2 className="text-6xl text-white font-bold mb-4">
            Learn on your own terms.
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Unlock your potential with flexible, self-paced learning.
          </p>
          <Link
            to="/login"
            className="inline-block px-6 py-3 bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-400 transition-colors"
          >
            Get Started
          </Link>
          <a 
            href="https://www.youtube.com/"
            target="_blank"
            className="inline-block px-6 py-3 ml-4 bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-400 transition-colors"
          >
            Youtube
          </a>
        </div>
        <div className="md:w-1/2 mt-8 md:mt-0 flex ">
          <FaUserGraduate className="w-1/2 h-1/2 m-auto"/>
        </div>
      </main>
      <footer className="p-4 text-center text-gray-400">
        © {new Date().getFullYear()} Convocraft. All rights reserved.
      </footer>
    </div>
  );
}