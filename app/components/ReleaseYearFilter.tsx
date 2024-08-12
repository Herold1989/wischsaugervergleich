"use client";
import React from 'react';
import { Checkbox } from 'primereact/checkbox';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { Product } from './ComparisonTool';

interface ReleaseYearFilterProps {
    years: string[];
    selectedYears: string[];
    setSelectedYears: (years: string[]) => void;
    filteredProducts: Product[]; // This should be passed from the parent component
  }
  
  const ReleaseYearFilter: React.FC<ReleaseYearFilterProps> = ({
    years,
    selectedYears,
    setSelectedYears,
    filteredProducts,
  }) => {
    const onYearChange = (e: { value: string; checked: boolean }) => {
      let updatedYears = [...selectedYears];
  
      if (e.checked) {
        updatedYears.push(e.value);
      } else {
        updatedYears = updatedYears.filter((year) => year !== e.value);
      }
  
      setSelectedYears(updatedYears);
    };
  
    const countProductsByYear = (year: string) => {
      return filteredProducts.filter(product => product.year.toString() === year).length;
    };
  
    return (
      <div className="mb-4">
        <Accordion>
          <AccordionTab header="Release-Jahr">
            {years.map((year) => {
              const productCount = countProductsByYear(year);
              return (
                <div key={year} className="flex items-center mb-2">
                  <Checkbox
                    inputId={year}
                    value={year}
                    onChange={(e) => onYearChange({ value: e.value as string, checked: e.checked || false })}
                    checked={selectedYears.includes(year)}
                    style={{
                      backgroundColor: selectedYears.includes(year) ? "#007ad9" : "#fff",
                      borderColor: "#000",
                      borderWidth: "2px",
                      color: selectedYears.includes(year) ? "#fff" : "#000",
                      width: "18px",
                      height: "18px",
                      display: "inline-block",
                      position: "relative",
                      borderRadius: "4px",
                      boxShadow: "none",
                    }}
                  />
                  <label htmlFor={year} className="ml-2" style={{ fontWeight: '600', fontSize: '16px' }}>
                    {year} ({productCount})
                  </label>
                </div>
              );
            })}
          </AccordionTab>
        </Accordion>
      </div>
    );
  };
  
  export default ReleaseYearFilter;
  
  