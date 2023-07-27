// src/components/Header.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
    return (
        <div className='container mt-4'>
            <h1 className="mb-4">Subspace Community Tools</h1>
            <nav className="mb-4">
                <ul className="nav">
                    <li className="nav-item">
                        <Link to="/" className="nav-link">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/about" className="nav-link">About</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/search-rewards-csv" className="nav-link">Search Public Sale Eligibility</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Header;
