import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const MAX_RESULTS = 10; // Maximum number of search results to display

const SearchRewardsCSV: React.FC = () => {
    const [headers, setHeaders] = useState<string[]>([]);
    const [data, setData] = useState<string[][]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [results, setResults] = useState<string[][]>([]);

    useEffect(() => {
        fetch('/pages/data/rewards.csv')
            .then((response) => response.text())
            .then((csvData) => {
                Papa.parse(csvData, {
                    complete: (result) => {
                        if (Array.isArray(result.data) && result.data.every(row => Array.isArray(row))) {
                            setHeaders(result.data[0] as string[]);  // Setting the headers
                            setData(result.data.slice(1) as string[][]);  // Setting the data (excluding the header)
                        } else {
                            console.error("Parsed CSV data is not in the expected format.");
                        }
                    }
                });
            });
    }, []);

    const handleSearch = () => {
        const matches = data.filter(row => 
            row.slice(0, 2).some(cell => cell.toLowerCase().includes(searchTerm.toLowerCase()))  // Only consider the first two cells
        ).slice(0, MAX_RESULTS);
        setResults(matches);
    };

    const renderSection = (title: string, data: string[], index: number) => {
        const found = data.some(item => item.split(": ")[1] !== '');
        return (
            <div key={index} className={`rounded overflow-hidden shadow-lg p-6 bg-${found ? 'white' : 'gray-100'} w-full`}>
                <div className={`font-bold text-lg mb-2 text-center text-${found ? 'green-500' : 'red-500'}`}>{title}</div>
                <div className="flex items-center justify-center">
                    {found ? <FaCheckCircle className="text-green-500" /> : <FaTimesCircle className="text-red-500" />}
                    <div className="ml-4">
                        {data.map((item, i) => (
                            <p key={i} className="text-gray-700 text-base">{item}</p>
                        ))}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="container mx-auto mt-10 px-4">
            <h1 className="text-3xl text-black font-semibold mb-6">Search Previous Testnet Rewards</h1>
            
            <div className="flex justify-center mb-6">
                <input 
                    type="text" 
                    className="flex-grow text-gray-500 p-2 border border-gray-300 rounded-l-lg" 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)} 
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            handleSearch();
                        }
                    }} 
                    placeholder="Search for a wallet..." 
                />
                <button className="p-2 bg-blue-600 text-white rounded-r-lg" onClick={handleSearch}>Search</button>
            </div>
            
            {searchTerm && results.length > 0 && (
                <div className="flex flex-col items-center gap-4">
                    {results.map((row, rowIndex) => (
                        <div key={rowIndex} className="flex flex-col items-center gap-4 w-full md:w-3/4 lg:w-1/2">
                            <div className="rounded overflow-hidden shadow-lg p-6 bg-white w-full">
                                <div className="mb-4">
                                    <div className="font-bold text-xl mb-2 text-center text-black">Address</div>
                                    <p className="text-gray-700 text-base text-center">{headers[0]}: {row[0]}</p>
                                    <p className="text-gray-700 text-base text-center">{headers[1]}: {row[1]}</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 w-full">
                                {renderSection('Aries', [`${headers[2]}: ${row[2]}`], 1)}
                                {renderSection('Gemini I', [`${headers[3]}: ${row[3]}`, `${headers[4]}: ${row[4]}`], 2)}
                                {renderSection('Gemini II Pt.1', [`${headers[5]}: ${row[5]}`, `${headers[6]}: ${row[6]}`], 3)}
                                {renderSection('Gemini II Pt.2', [`${headers[7]}: ${row[7]}`, `${headers[8]}: ${row[8]}`, `${headers[9]}: ${row[9]}`], 4)}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default SearchRewardsCSV;
