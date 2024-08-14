import React from "react";
import { Badge } from "primereact/badge";
import { ProgressBar } from "primereact/progressbar";
import ExpertOpinion from "./ExpertOpinion";
import { Accordion, AccordionTab } from "primereact/accordion";
import { PrimeIcons } from "primereact/api";
import Image from "next/image"; // Import Image component from next/image

interface Product {
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
  expertOpinion?: string;
  year: number;
  dimensions: string;
  obstacleHeight: string;
  workingTime: string;
  chargingTime: string;
  features: Record<string, boolean>;
}

const extractScore = (description: string) => {
  const parts = description.split(":");
  const score = parts[parts.length - 1].trim();
  return score;
};

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const featureEntries = Object.entries(product.features);
  const score = extractScore(product.description);

  return (
    <div className="product-card flex flex-col p-4 border rounded-lg shadow-md bg-white mb-2 h-full">
      <Image
        src={product.image}
        alt={`Image of ${product.name}`}
        width={500} // Example width (adjust as needed)
        height={300} // Example height (adjust as needed)
        className="w-full h-48 object-cover mb-4 rounded-md"
      />
      <div className="p-2 mb-2 bg-gray-100 rounded-md">
        <h3 className="text-lg font-semibold mb-2 rounded-md items-center text-center">{product.name}</h3>
      </div>
      <div className="flex items-center space-x-2 mb-2">
        <Badge value={score} severity="success" />
        <span className="font-semibold">Testsieger TV-Score</span>
      </div>
      <div className="ratings mb-2 space-y-2">
        <div className="flex items-center justify-between rating-item">
          <span className="rating-label">Suction</span>
          <ProgressBar value={product.suction} className="rating-bar" />
        </div>
        <div className="flex items-center justify-between rating-item">
          <span className="rating-label">Mopping</span>
          <ProgressBar value={product.mopping} className="rating-bar" />
        </div>
        <div className="flex items-center justify-between rating-item">
          <span className="rating-label">App</span>
          <ProgressBar value={product.app} className="rating-bar" />
        </div>
        <div className="flex items-center justify-between rating-item">
          <span className="rating-label">Navigation</span>
          <ProgressBar value={product.navigation} className="rating-bar" />
        </div>
        <div className="flex items-center justify-between rating-item">
          <span className="rating-label">Extras</span>
          <ProgressBar value={product.extras} className="rating-bar" />
        </div>
        <div className="flex items-center justify-between rating-item">
          <span className="rating-label">Praxis</span>
          <ProgressBar value={product.praxis} className="rating-bar" />
        </div>
      </div>
      <div className="mt-4 flex-grow">
        <Accordion>
          <AccordionTab header="Technische Details" className="font-semibold" aria-expanded="true">
            <ul className="lg:text-sm md:text-sm">
              <li className="mb-0.5">
                Preis: ca.{" "}
                <span className="font-normal">{product.price} €</span>
              </li>
              <li className="mb-0.5">
                Erscheinungsjahr:{" "}
                <span className="font-normal">{product.year}</span>
              </li>
              <li className="mb-0.5">
                Abmessungen:{" "}
                <span className="font-normal">{product.dimensions}</span>
              </li>
              <li className="mb-0.5">
                Hindernisüberwindung:{" "}
                <span className="font-normal">{product.obstacleHeight}</span>
              </li>
              <li className="mb-0.5">
                Arbeitszeit:{" "}
                <span className="font-normal">{product.workingTime}</span>
              </li>
              <li className="mb-0.5">
                Ladezeit:{" "}
                <span className="font-normal">{product.chargingTime}</span>
              </li>
            </ul>
          </AccordionTab>
        </Accordion>
      </div>
      <div className="mt-4 flex-grow">
        <Accordion>
          <AccordionTab header="Funktionsumfang" className="font-semibold" aria-expanded="true">
            <ul>
              {featureEntries.map(
                ([feature, available]) =>
                  available && (
                    <li key={feature} className="flex items-center">
                      <i
                        className={`${PrimeIcons.CHECK_CIRCLE} text-green-500 font-bold mr-2`}
                      ></i>
                      {feature}
                    </li>
                  )
              )}
            </ul>
          </AccordionTab>
        </Accordion>
      </div>
      {product.expertOpinion && (
        <ExpertOpinion opinion={product.expertOpinion} />
      )}
    </div>
  );
};

export default ProductCard;
