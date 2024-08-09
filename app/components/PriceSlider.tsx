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
  const [inputPrice, setInputPrice] = useState<[number, number]>(selectedPrice); // Initialize with selectedPrice
  const debouncedPrice = useDebouncePriceRange(inputPrice, 1000);

  useEffect(() => {
    setInputPrice(selectedPrice);
  }, [selectedPrice]);

  const handleInputChange = (index: 0 | 1, value: number) => {
    let newInputPrice = [...inputPrice] as [number, number];

    // Enforce the max range constraints
    newInputPrice[index] = Math.max(0, Math.min(value, priceRange[1]));

    // Handle switch if minPrice > maxPrice
    if (index === 0 && newInputPrice[0] > newInputPrice[1]) {
      newInputPrice = [newInputPrice[1], newInputPrice[0]];
    } else if (index === 1 && newInputPrice[1] < newInputPrice[0]) {
      newInputPrice = [newInputPrice[1], newInputPrice[0]];
    }

    setInputPrice(newInputPrice);
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
            handleInputChange(0, Number(e.target.value))
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
            handleInputChange(1, Number(e.target.value))
          }
          placeholder={priceRange[1].toString()}
          className="w-20 p-inputtext-sm"
        />
        <span>€</span>
      </div>
      <CustomStyledSlider
        selectedPrice={inputPrice}
        setSelectedPrice={setSelectedPrice} // Pass the original setSelectedPrice function
        priceRange={priceRange}
      />
      <p style={{ fontSize: "16px" }}>{`${inputPrice[0]}€ - ${inputPrice[1]}€`}</p>
    </div>
  );
};

export default PriceSlider;
