"use client";
import React, { useEffect, useState } from 'react';
import PriceSlider from './PriceSlider';
import FeaturesCheckbox from './FeaturesCheckbox';
import ReleaseYearFilter from './ReleaseYearFilter';
import SearchBar from './SearchBar'; // Import the SearchBar component
import { Product } from './ComparisonTool';
import { Skeleton } from 'primereact/skeleton';

interface FilterSidebarProps {
    years: string[];
    features: string[];
    onFilterChange: (filteredProducts: Product[]) => void;
    products: Product[];
    selectedPrice: [number, number];
    setSelectedPrice: (price: [number, number]) => void;
    selectedYears: string[];
    setSelectedYears: (years: string[]) => void;
    selectedFeatures: string[];
    setSelectedFeatures: (features: string[]) => void;
    priceRange: [number, number];
    modelSearch: string;
    setModelSearch: (search: string) => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
    years,
    features,
    onFilterChange,
    products,
    selectedPrice,
    setSelectedPrice,
    selectedYears,
    setSelectedYears,
    selectedFeatures,
    setSelectedFeatures,
    priceRange,
    modelSearch,
    setModelSearch
}) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate a data loading phase
        const timer = setTimeout(() => {
            setLoading(false); // Set loading to false after data has been loaded
            onFilterChange(products); // Initial load with all products
        }, 100); // Simulate a 100ms loading delay

        return () => clearTimeout(timer); // Cleanup timer if component unmounts
    }, [products, onFilterChange]);

    if (loading) {
        // Display skeletons or placeholders while loading
        return (
            <div className="w-full p-4 bg-white shadow-md rounded-lg">
                <Skeleton width="100%" height="40px" className="mb-4" />
                <Skeleton width="100%" height="40px" className="mb-4" />
                <Skeleton width="100%" height="100px" className="mb-4" />
                <Skeleton width="100%" height="40px" className="mb-4" />
            </div>
        );
    }

    return (
        <div className="w-full p-4 bg-white shadow-md rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Filter Options</h2>
            <SearchBar 
                search={modelSearch} 
                setSearch={setModelSearch} 
                resetFilters={() => {
                    setSelectedPrice(priceRange);
                    setSelectedYears([]);
                    setSelectedFeatures([]);
                    setModelSearch('');
                    onFilterChange(products); // Reset to the full product list
                }} 
            />
            <PriceSlider 
                selectedPrice={selectedPrice} 
                setSelectedPrice={setSelectedPrice} 
                priceRange={priceRange} 
            />
            <ReleaseYearFilter 
                years={years} 
                selectedYears={selectedYears} 
                setSelectedYears={setSelectedYears} 
            />
            <FeaturesCheckbox 
                features={features} 
                selectedFeatures={selectedFeatures} 
                setSelectedFeatures={setSelectedFeatures} 
            />
        </div>
    );
};

export default FilterSidebar;
