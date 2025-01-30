import { Recipe } from "@/types/Recipe";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Percent } from "lucide-react";
import { Switch } from "@/components/ui/switch";

interface RecipeDetailProps {
  recipe: Recipe;
}

const RecipeDetail = ({ recipe }: RecipeDetailProps) => {
  const [scaleFactor, setScaleFactor] = useState(1);
  const [useBakersMath, setUseBakersMath] = useState(false);

  const calculateBakersPercentage = (amount: number) => {
    // Find the total flour weight (sum of all flour ingredients)
    const totalFlourWeight = recipe.ingredients
      .filter(ing => ing.item.toLowerCase().includes('flour'))
      .reduce((sum, ing) => sum + ing.amount, 0);

    // Calculate percentage relative to total flour weight
    return ((amount / totalFlourWeight) * 100).toFixed(1);
  };

  const scaleIngredient = (amount: number) => {
    const scaledAmount = amount * scaleFactor;
    return scaledAmount.toFixed(2).replace(/\.?0+$/, '');
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
          <span className="text-muted-foreground">Servings:</span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setScaleFactor(Math.max(0.5, scaleFactor - 0.5))}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="font-semibold">{Math.round(recipe.servings * scaleFactor)}</span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setScaleFactor(scaleFactor + 0.5)}
          >
            <Plus className="h-4 w-4" />
          </Button>
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
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index} className="flex justify-between items-center">
                <span>{ingredient.item}</span>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">
                    {scaleIngredient(ingredient.amount)} {ingredient.unit}
                  </span>
                  {useBakersMath && (
                    <span className="text-sm text-muted-foreground flex items-center gap-1">
                      <Percent className="h-3 w-3" />
                      {calculateBakersPercentage(ingredient.amount)}
                    </span>
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