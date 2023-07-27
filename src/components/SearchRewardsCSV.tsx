import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';

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
        );
        setResults(matches);
    };

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Search Previous Testnet Rewards</h1>
            
            <div className="input-group mb-3">
                <input 
                    type="text" 
                    className="form-control" 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)} 
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            handleSearch();
                        }
                    }} 
                    placeholder="Search for a wallet..." 
                />
                <div className="input-group-append">
                    <button className="btn btn-primary" onClick={handleSearch}>Search</button>
                </div>
            </div>
            
            {/* Conditionally rendering the table */}
            {searchTerm && results.length > 0 && (
                <table className="table table-striped">
                    <thead>
                        <tr>
                            {headers.map((header, index) => (
                                <th key={index}>{header}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {results.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {row.map((cell, cellIndex) => (
                                    <td key={cellIndex}>{cell}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default SearchRewardsCSV;
