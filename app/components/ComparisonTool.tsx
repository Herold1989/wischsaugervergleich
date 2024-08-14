"use client";
import React, { useEffect, useRef, useState } from "react";
import FilterSidebar from "./FilterSidebar";
import ProductCard from "./ProductCard";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { Badge } from "primereact/badge";
import { Skeleton } from "primereact/skeleton";
import { Paginator, PaginatorPageChangeEvent } from "primereact/paginator";
import { applyFilters } from "../utils/filtering";

// Type definition for the product
export interface Product {
  name: string;
  price: number;
  suction: number;
  mopping: number;
  app: number;
  navigation: number;
  extras: number;
  praxis: number;
  description: string;
  image: string;
  expertOpinion: string;
  year: number;
  dimensions: string;
  obstacleHeight: string;
  workingTime: string;
  chargingTime: string;
  features: { [key: string]: boolean };
}

const ComparisonTool = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState<string | null>(null);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedPrice, setSelectedPrice] = useState<[number, number]>([0, 0]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 0]);
  const [selectedYears, setSelectedYears] = useState<string[]>([]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [modelSearch, setModelSearch] = useState<string>("");

  // Pagination state
  const [first, setFirst] = useState<number>(0);
  const [rows, setRows] = useState<number>(6);
  const comparisonToolRef = useRef<HTMLDivElement>(null); // Create a ref for the comparison-tool div

  const sortOptions = [
    { label: "Preis aufsteigend", value: "price-asc" },
    { label: "Preis absteigend", value: "price-desc" },
    { label: "Bewertung aufsteigend", value: "rating-asc" },
    { label: "Bewertung absteigend", value: "rating-desc" },
  ];

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch("/products.json");
      const data = await response.json();
      setProducts(data);
      setFilteredProducts(data);
      const prices = data.map((product: Product) => product.price);
      const minPrice = Math.min(...prices);
      const maxPrice = Math.max(...prices);
      setPriceRange([minPrice, maxPrice]);
      setSelectedPrice([minPrice, maxPrice]);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    setFilteredProducts(
      applyFilters(
        products,
        selectedYears,
        selectedFeatures,
        selectedPrice,
        modelSearch,
        sortOption
      )
    );
  }, [
    products,
    selectedYears,
    selectedFeatures,
    selectedPrice,
    modelSearch,
    sortOption,
  ]);

  const resetFilters = () => {
    setSelectedPrice(priceRange);
    setSelectedYears([]);
    setSelectedFeatures([]);
    setModelSearch("");
    setSortOption(null);
    setFilteredProducts(products);
  };

  const onPageChange = (event: PaginatorPageChangeEvent) => {
    setFirst(event.first);
    setRows(event.rows);
    // Scroll to the top of the comparison-tool div
    if (comparisonToolRef.current) {
      comparisonToolRef.current.scrollIntoView({ behavior: "instant" });
    }
  };

  const skeletonCount = products.length || 3;
  const displayedProducts = filteredProducts.slice(first, first + rows);

  return (
    <div ref={comparisonToolRef} className="comparison-tool flex flex-col">
      <div className="p-2">
        <header className="rounded-md w-full flex flex-col md:flex-row items-center justify-between bg-white p-4 shadow-md">
          <div className="flex flex-col justify-between md:flex-row items-center md:space-x-4 space-y-2 md:space-y-0 w-full md:w-auto">
            {loading ? (
              <Skeleton width="200px" height="30px" />
            ) : (
              <h1 className="text-lg md:text-2xl font-bold mb-2 md:mb-0">
                Wischsauger
              </h1>
            )}
            {loading ? (
              <Skeleton width="100px" height="30px" />
            ) : (
              <div className="text-sm md:text-xs md:items-center lg:text-base">
                {`Preis: ≤${selectedPrice[1]} €`}
              </div>
            )}
            {loading ? (
              <Skeleton width="100px" height="30px" />
            ) : (
              <span className="text-sm lg:text-base">
                {filteredProducts.length} Ergebnisse
              </span>
            )}
            {!loading && (
              <Button
                label="Alle zurücksetzen"
                className="p-button-text text-sm lg:text-base"
                onClick={resetFilters}
              />
            )}
          </div>
          {!loading && (
            <Dropdown
              value={sortOption}
              options={sortOptions}
              onChange={(e) => setSortOption(e.value)}
              placeholder="Sortieren nach"
              className="text-xs md:text-sm lg:text-base w-full md:w-auto rounded-md"
            />
          )}
        </header>
      </div>
      <div className="flex flex-wrap">
        <aside className="w-full lg:w-1/4 md:w-full p-2">
          <FilterSidebar
            years={Array.from(
              new Set(products.map((product) => product.year.toString()))
            ).sort((a, b) => Number(b) - Number(a))}
            features={products.reduce((acc, product) => {
              Object.keys(product.features).forEach((feature) => {
                if (!acc.includes(feature)) acc.push(feature);
              });
              return acc;
            }, [] as string[])}
            onFilterChange={setFilteredProducts}
            products={products}
            selectedPrice={selectedPrice}
            setSelectedPrice={setSelectedPrice}
            selectedYears={selectedYears}
            setSelectedYears={setSelectedYears}
            selectedFeatures={selectedFeatures}
            setSelectedFeatures={setSelectedFeatures}
            priceRange={priceRange}
            modelSearch={modelSearch}
            setModelSearch={setModelSearch}
            filteredProducts={filteredProducts}
          />
        </aside>
        <main className="flex-1 flex flex-col p-2">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {loading
              ? Array.from({ length: skeletonCount }).map((_, index) => (
                  <div key={index} className="flex flex-col h-full">
                    <Skeleton width="100%" height="250px" className="mb-4" />
                    <Skeleton width="60%" height="20px" className="mb-2" />
                    <Skeleton width="90%" height="20px" className="mb-2" />
                    <Skeleton width="80%" height="20px" className="mb-2" />
                    <Skeleton width="100%" height="100px" className="mb-4" />
                    <Skeleton width="100%" height="100px" className="mb-4" />
                  </div>
                ))
              : displayedProducts.map((product) => (
                  <div className="flex flex-col h-full" key={product.name}>
                    <ProductCard product={product} />
                  </div>
                ))}
          </div>
          {!loading && (
            <Paginator
              first={first}
              rows={rows}
              totalRecords={filteredProducts.length}
              onPageChange={onPageChange}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default ComparisonTool;
