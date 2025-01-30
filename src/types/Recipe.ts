export interface Recipe {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  servings: number;
  ingredients: {
    item: string;
    amount: number;
    unit: string;
  }[];
  instructions: string[];
  prepTime: string;
  cookTime: string;
}