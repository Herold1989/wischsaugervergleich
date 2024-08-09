"use client";
import React from 'react';
import { Checkbox } from 'primereact/checkbox';
import { Accordion, AccordionTab } from 'primereact/accordion';

interface ReleaseYearFilterProps {
    years: string[];
    selectedYears: string[];
    setSelectedYears: (years: string[]) => void;
}

const ReleaseYearFilter: React.FC<ReleaseYearFilterProps> = ({ years, selectedYears, setSelectedYears }) => {
    const onYearChange = (e: { value: string; checked: boolean }) => {
        let updatedYears = [...selectedYears];

        if (e.checked) {
            updatedYears.push(e.value);
        } else {
            updatedYears = updatedYears.filter((year) => year !== e.value);
        }

        setSelectedYears(updatedYears);
    };

    return (
        <div className="mb-4">
            <Accordion>
                <AccordionTab header="Release-Jahr">
                    {years.map((year) => (
                        <div key={year} className="flex items-center mb-2">
                            <Checkbox
                                inputId={year}
                                value={year}
                                onChange={(e) => onYearChange({ value: e.value as string, checked: e.checked || false })}
                                checked={selectedYears.includes(year)}
                                style={{
                                    backgroundColor: selectedYears.includes(year)
                                      ? "#007ad9"
                                      : "#fff", // Background color when checked/unchecked
                                    borderColor: "#000", // Strong black border color
                                    borderWidth: "2px", // Border width
                                    color: selectedYears.includes(year) ? "#fff" : "#000", // Checkmark color
                                    width: "18px", // Checkbox size
                                    height: "18px", // Checkbox size
                                    display: "inline-block", // Display as inline block
                                    position: "relative", // Ensure proper positioning
                                    borderRadius: "4px", // Rounded corners
                                    boxShadow: "none", // No shadow
                                  }}
                            />
                            <label htmlFor={year} className="ml-2" style={{ fontWeight: '600', fontSize: '16px' }}>{year}</label>
                        </div>
                    ))}
                </AccordionTab>
            </Accordion>
        </div>
    );
};

export default ReleaseYearFilter;
