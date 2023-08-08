import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import About from './components/About';
import SearchRewardsCSV from './components/SearchRewardsCSV';


function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <div className="App text-center bg-gray-100 min-h-screen">
        <Header />
        <header className="mt-10">
          <h1 className="text-4xl font-bold text-black">Subspace Reward Checker</h1>
        </header>
        <main className="mt-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/search-rewards-csv" element={<SearchRewardsCSV />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
