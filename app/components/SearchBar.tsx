"use client"
import React, { useState, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import useDebounce from '../utils/debounce-search';

interface SearchBarProps {
    search: string;
    setSearch: (search: string) => void;
    resetFilters: () => void; // Function to reset filters
}

const SearchBar: React.FC<SearchBarProps> = ({ search, setSearch, resetFilters }) => {
    const debouncedSearch = useDebounce(search, 500); // Debounce with a 500ms delay

    // Simulate an API request or filtering operation
    const performSearch = (query: string) => {
        console.log(`Searching for ${query}`);
        // API call or filter logic goes here
    };

    // Use the debounced value for performing the search
    useEffect(() => {
        if (debouncedSearch) {
            performSearch(debouncedSearch);
        }
    }, [debouncedSearch]);

    // Clear the search input and reset filters
    const handleClearSearch = () => {
        setSearch('');
        resetFilters();
    };

    return (
        <div className="search-bar flex mb-4">
            <InputText 
                value={search} 
                onChange={(e) => setSearch(e.target.value)} 
                placeholder="Model search" 
                className="w-full p-inputtext-sm" 
            />
            {search && (
                <Button 
                    icon="pi pi-times" 
                    className="ml-2 p-button-rounded p-button-outlined" 
                    onClick={handleClearSearch} 
                    tooltip="Clear Search" 
                    tooltipOptions={{ position: 'top' }}
                />
            )}
            <Button 
                icon="pi pi-search" 
                className="ml-2 p-button-rounded p-button-outlined" 
            />
        </div>
    );
};

export default SearchBar;
