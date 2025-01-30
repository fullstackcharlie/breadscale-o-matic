import { Recipe } from "@/types/Recipe";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Percent } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";

interface RecipeDetailProps {
  recipe: Recipe;
}

const RecipeDetail = ({ recipe }: RecipeDetailProps) => {
  const [useBakersMath, setUseBakersMath] = useState(false);
  const [ingredients, setIngredients] = useState(recipe.ingredients);
  const [totalDoughWeight, setTotalDoughWeight] = useState(
    ingredients.reduce((sum, ing) => sum + ing.amount, 0)
  );

  const getTotalFlourWeight = () => {
    return ingredients
      .filter(ing => ing.item.toLowerCase().includes('flour'))
      .reduce((sum, ing) => sum + ing.amount, 0);
  };

  const calculateBakersPercentage = (amount: number) => {
    const totalFlourWeight = getTotalFlourWeight();
    return ((amount / totalFlourWeight) * 100).toFixed(1);
  };

  const handlePercentageChange = (index: number, newPercentage: string) => {
    const totalFlourWeight = getTotalFlourWeight();
    const newAmount = (parseFloat(newPercentage) * totalFlourWeight) / 100;

    if (!isNaN(newAmount)) {
      const newIngredients = [...ingredients];
      newIngredients[index] = {
        ...newIngredients[index],
        amount: newAmount
      };
      setIngredients(newIngredients);
      setTotalDoughWeight(newIngredients.reduce((sum, ing) => sum + ing.amount, 0));
    }
  };

  const handleDoughWeightChange = (newWeight: number) => {
    if (!isNaN(newWeight) && newWeight > 0) {
      const currentTotal = ingredients.reduce((sum, ing) => sum + ing.amount, 0);
      const scaleFactor = newWeight / currentTotal;
      
      const newIngredients = ingredients.map(ing => ({
        ...ing,
        amount: ing.amount * scaleFactor
      }));
      
      setIngredients(newIngredients);
      setTotalDoughWeight(newWeight);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="aspect-video relative overflow-hidden rounded-lg mb-8">
        <img
          src={recipe.imageUrl}
          alt={recipe.name}
          className="object-cover w-full h-full"
        />
      </div>

      <h1 className="text-4xl font-serif font-bold text-brown-dark mb-4">{recipe.name}</h1>
      <p className="text-lg text-muted-foreground mb-8">{recipe.description}</p>

      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <span className="text-muted-foreground">Total Dough Weight (g):</span>
          <Input
            type="number"
            value={Math.round(totalDoughWeight)}
            onChange={(e) => handleDoughWeightChange(Number(e.target.value))}
            className="w-24"
            min="0"
          />
        </div>
        <div className="flex items-center gap-2">
          <Switch
            checked={useBakersMath}
            onCheckedChange={setUseBakersMath}
            id="bakers-math"
          />
          <label htmlFor="bakers-math" className="text-sm text-muted-foreground cursor-pointer">
            Show Baker's Percentages
          </label>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
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
                        onChange={(e) => handlePercentageChange(index, e.target.value)}
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

        <Card className="p-6">
          <h2 className="text-2xl font-serif font-semibold mb-4">Instructions</h2>
          <ol className="space-y-4 list-decimal list-inside">
            {recipe.instructions.map((instruction, index) => (
              <li key={index} className="text-muted-foreground">
                {instruction}
              </li>
            ))}
          </ol>
        </Card>
      </div>

      <div className="flex gap-8 mt-8 text-muted-foreground">
        <div>
          <span className="font-semibold">Prep Time:</span> {recipe.prepTime}
        </div>
        <div>
          <span className="font-semibold">Cook Time:</span> {recipe.cookTime}
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;