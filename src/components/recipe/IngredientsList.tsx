import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Percent } from "lucide-react";

interface Ingredient {
  item: string;
  amount: number;
  unit: string;
}

interface IngredientsListProps {
  ingredients: Ingredient[];
  useBakersMath: boolean;
  onPercentageChange: (index: number, percentage: string) => void;
  calculateBakersPercentage: (amount: number) => string;
}

export const IngredientsList = ({
  ingredients,
  useBakersMath,
  onPercentageChange,
  calculateBakersPercentage,
}: IngredientsListProps) => {
  return (
    <Card className="p-6">
      <h2 className="text-2xl font-serif font-semibold mb-4">Ingredients</h2>
      <ul className="space-y-2">
        {ingredients.map((ingredient, index) => (
          <li key={index} className="flex justify-between items-center">
            <span>{ingredient.item}</span>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">
                {ingredient.amount.toFixed(1)} {ingredient.unit}
              </span>
              {useBakersMath && (
                <div className="flex items-center gap-1">
                  <Percent className="h-3 w-3" />
                  <Input
                    type="number"
                    value={calculateBakersPercentage(ingredient.amount)}
                    onChange={(e) => onPercentageChange(index, e.target.value)}
                    className="w-20 h-6 text-sm"
                    step="0.1"
                  />
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
};