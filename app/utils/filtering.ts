// filtering.ts

import { Product } from "../components/ComparisonTool";

export const applyFilters = (
  products: Product[],
  selectedYears: string[],
  selectedFeatures: string[],
  selectedPrice: [number, number],
  modelSearch: string,
  sortOption: string | null
): Product[] => {
  let filtered = products;

  if (selectedYears.length) {
    filtered = filtered.filter(product => selectedYears.includes(product.year.toString()));
  }

  if (selectedFeatures.length) {
    filtered = filtered.filter(product =>
      selectedFeatures.every(feature => product.features[feature])
    );
  }

  filtered = filtered.filter(
    product => product.price >= selectedPrice[0] && product.price <= selectedPrice[1]
  );

  if (modelSearch) {
    filtered = filtered.filter(product =>
      product.name.toLowerCase().includes(modelSearch.toLowerCase())
    );
  }

  if (sortOption) {
    filtered = filtered.sort((a, b) => {
      switch (sortOption) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'rating-asc':
          return Number(extractScore(a.description)) - Number(extractScore(b.description));
        case 'rating-desc':
          return Number(extractScore(b.description)) - Number(extractScore(a.description));
        default:
          return 0;
      }
    });
  }

  return filtered;
};

const extractScore = (description: string) => {
  const parts = description.split(":");
  const score = parts[parts.length - 1].trim();
  return score;
};
