import React from 'react';
import { Slider, SliderChangeEvent } from 'primereact/slider';
import styled from 'styled-components';

interface PriceSliderProps {
    selectedPrice: [number, number];
    setSelectedPrice: (price: [number, number]) => void;
    priceRange: [number, number];
}

const StyledSliderWrapper = styled.div`
    .p-slider {
        background-color: #e0e0e0; /* Light grey for the unfilled track */
        height: 8px;
        border-radius: 4px;
    }

    .p-slider-handle {
        background-color: #007ad9 !important; /* Blue color for the handle */
        border: 2px solid #007ad9 !important;
        width: 16px !important;
        height: 16px !important;
        border-radius: 50% !important;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.2) !important;
    }

    .p-slider-range {
        background-color: #007ad9 !important; /* Blue for the filled range */
    }

    .p-slider .p-slider-handle.p-slider-handle-active {
        background-color: #005f99 !important; /* Darker blue when active */
        border-color: #005f99 !important;
    }
`;

const CustomStyledSlider: React.FC<PriceSliderProps> = ({ selectedPrice, setSelectedPrice, priceRange }) => {
    const handlePriceChange = (e: SliderChangeEvent) => {
        const newValue = e.value as [number, number];
        if (newValue[0] <= newValue[1]) {
            setSelectedPrice(newValue);
        }
    };

    return (
        <StyledSliderWrapper>
            <Slider
                value={selectedPrice}
                onChange={handlePriceChange}
                range
                min={priceRange[0]}
                max={priceRange[1]}
                className="p-slider"
            />
        </StyledSliderWrapper>
    );
};

export default CustomStyledSlider;
