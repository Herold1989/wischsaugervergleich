"use client"
import React from 'react';
import { Dropdown } from 'primereact/dropdown';

const SortDropdown = () => {
    const [sortOption, setSortOption] = React.useState(null);

    const sortOptions = [
        { label: 'Testsieger TV-Score', value: 'score' },
        { label: 'Preis', value: 'price' },
        { label: 'Bewertung', value: 'rating' }
    ];

    return (
        <div className="sort-dropdown mb-4">
            <Dropdown value={sortOption} options={sortOptions} onChange={(e) => setSortOption(e.value)} placeholder="Sortieren nach" className="w-full" />
        </div>
    );
};

export default SortDropdown;
