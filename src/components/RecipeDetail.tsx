import { Recipe } from "@/types/Recipe";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";

interface RecipeDetailProps {
  recipe: Recipe;
}

const RecipeDetail = ({ recipe }: RecipeDetailProps) => {
  const [scaleFactor, setScaleFactor] = useState(1);

  const scaleIngredient = (amount: number) => {
    return (amount * scaleFactor).toFixed(2).replace(/\.?0+$/, '');
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

      <div className="flex items-center gap-4 mb-8">
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

      <div className="grid md:grid-cols-2 gap-8">
        <Card className="p-6">
          <h2 className="text-2xl font-serif font-semibold mb-4">Ingredients</h2>
          <ul className="space-y-2">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index} className="flex justify-between">
                <span>{ingredient.item}</span>
                <span className="text-muted-foreground">
                  {scaleIngredient(ingredient.amount)} {ingredient.unit}
                </span>
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