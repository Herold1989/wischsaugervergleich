"use client";

import React, { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import CustomStyledSlider from "./CustomStyledSlider";
import useDebouncePriceRange from "../utils/debounce-prices";

interface PriceSliderProps {
  selectedPrice: [number, number];
  setSelectedPrice: (price: [number, number]) => void;
  priceRange: [number, number];
}

const PriceSlider: React.FC<PriceSliderProps> = ({
  selectedPrice,
  setSelectedPrice,
  priceRange,
}) => {
  const [inputPrice, setInputPrice] = useState<[number, number]>(priceRange); // Initialize with priceRange
  const debouncedPrice = useDebouncePriceRange(inputPrice, 250);

  useEffect(() => {
    setInputPrice(selectedPrice);
  }, [selectedPrice]);

  const handlePriceChange = (value: [number, number]) => {
    const [minPrice, maxPrice] = value;

    // Enforce the max range constraints
    const adjustedMaxPrice = Math.min(maxPrice, priceRange[1]);
    const adjustedMinPrice = Math.max(minPrice, priceRange[0]);

    setInputPrice([adjustedMinPrice, adjustedMaxPrice]);
  };

  useEffect(() => {
    // Update the selected price with debounced values
    setSelectedPrice(debouncedPrice);
  }, [debouncedPrice, setSelectedPrice]);

  return (
    <div className="space-y-2 mb-4">
      <h3 className="text-lg font-semibold">Preis</h3>
      <div className="flex items-center space-x-2">
        <InputText
          type="number"
          value={inputPrice[0].toString()}
          onChange={(e) =>
            handlePriceChange([Number(e.target.value), inputPrice[1]])
          }
          placeholder={priceRange[0].toString()}
          className="w-20 p-inputtext-sm"
        />
        <span>€</span>
        <span>-</span>
        <InputText
          type="number"
          value={inputPrice[1].toString()}
          onChange={(e) =>
            handlePriceChange([inputPrice[0], Number(e.target.value)])
          }
          placeholder={priceRange[1].toString()}
          className="w-20 p-inputtext-sm"
        />
        <span>€</span>
      </div>
      <CustomStyledSlider
        selectedPrice={inputPrice}
        setSelectedPrice={handlePriceChange}
        priceRange={priceRange}
      />
      <p style={{ fontSize: "16px" }}>{`${inputPrice[0]}€ - ${inputPrice[1]}€`}</p>
    </div>
  );
};

export default PriceSlider;
