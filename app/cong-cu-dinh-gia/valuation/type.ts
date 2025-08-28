interface PropertySize {
  min: number;
  max: number;
}

interface MarketPrice {
  min: number;
  max: number;
  unit: string;
}

interface PropertyDetails {
  propertyType: string;
  location: string;
  propertySize: PropertySize;
  transactionType: string;
  marketPrice: MarketPrice;
}

interface Evaluation {
  advantages: string[];
  disadvantages: string[];
  evaluationConclusion: string;
}

export interface Results {
  propertyDetails: PropertyDetails;
  evaluation: Evaluation;
}