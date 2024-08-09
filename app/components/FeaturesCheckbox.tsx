"use client";
import React from "react";
import { Checkbox } from "primereact/checkbox";
import { Accordion, AccordionTab } from "primereact/accordion";

interface FeaturesCheckboxProps {
  features: string[];
  selectedFeatures: string[];
  setSelectedFeatures: (features: string[]) => void;
}

const FeaturesCheckbox: React.FC<FeaturesCheckboxProps> = ({
  features,
  selectedFeatures,
  setSelectedFeatures,
}) => {
  const onFeatureChange = (e: { value: string; checked: boolean }) => {
    let updatedFeatures = [...selectedFeatures];

    if (e.checked) {
      updatedFeatures.push(e.value);
    } else {
      updatedFeatures = updatedFeatures.filter(
        (feature) => feature !== e.value
      );
    }

    setSelectedFeatures(updatedFeatures);
  };

  return (
    <div className="mb-4">
      <Accordion>
        <AccordionTab header="Funktionsumfang" className="font-semibold">
          {features.map((feature) => (
            <div key={feature} className="flex items-center mb-2">
              <Checkbox
                inputId={feature}
                value={feature}
                onChange={(e) =>
                  onFeatureChange({
                    value: e.value as string,
                    checked: e.checked || false,
                  })
                }
                checked={selectedFeatures.includes(feature)}
                style={{
                  backgroundColor: selectedFeatures.includes(feature)
                    ? "#007ad9"
                    : "#fff", // Background color when checked/unchecked
                  borderColor: "#000", // Strong black border color
                  borderWidth: "2px", // Border width
                  color: selectedFeatures.includes(feature) ? "#fff" : "#000", // Checkmark color
                  width: "18px", // Checkbox size
                  height: "18px", // Checkbox size
                  display: "inline-block", // Display as inline block
                  position: "relative", // Ensure proper positioning
                  borderRadius: "4px", // Rounded corners
                  boxShadow: "none", // No shadow
                }}
              />
              <label htmlFor={feature} style={{ fontWeight: '600', fontSize: '16px' }} className="ml-2">
                {feature}
              </label>
            </div>
          ))}
        </AccordionTab>
      </Accordion>
    </div>
  );
};

export default FeaturesCheckbox;
