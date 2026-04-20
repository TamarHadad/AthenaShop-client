export interface Shoe {
  id: number;
  name: string;
  brand: string;
  model: string;
  price: number;
  rank: number;
  size: number;
  image: string;
  availableSizes?: number[];
}