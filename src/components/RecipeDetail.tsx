import { Recipe } from "@/types/Recipe";
import { useState } from "react";
import { DoughWeightControl } from "./recipe/DoughWeightControl";
import { BakersMathToggle } from "./recipe/BakersMathToggle";
import { IngredientsList } from "./recipe/IngredientsList";
import { Instructions } from "./recipe/Instructions";

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
      .filter((ing) => ing.item.toLowerCase().includes("flour"))
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
        amount: newAmount,
      };
      setIngredients(newIngredients);
      setTotalDoughWeight(
        newIngredients.reduce((sum, ing) => sum + ing.amount, 0)
      );
    }
  };

  const handleDoughWeightChange = (newWeight: number) => {
    if (!isNaN(newWeight) && newWeight > 0) {
      const currentTotal = ingredients.reduce((sum, ing) => sum + ing.amount, 0);
      const scaleFactor = newWeight / currentTotal;

      const newIngredients = ingredients.map((ing) => ({
        ...ing,
        amount: ing.amount * scaleFactor,
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

      <h1 className="text-4xl font-serif font-bold text-brown-dark mb-4">
        {recipe.name}
      </h1>
      <p className="text-lg text-muted-foreground mb-8">{recipe.description}</p>

      <div className="flex items-center justify-between mb-8">
        <DoughWeightControl
          totalDoughWeight={totalDoughWeight}
          onWeightChange={handleDoughWeightChange}
        />
        <BakersMathToggle
          useBakersMath={useBakersMath}
          onToggle={setUseBakersMath}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <IngredientsList
          ingredients={ingredients}
          useBakersMath={useBakersMath}
          onPercentageChange={handlePercentageChange}
          calculateBakersPercentage={calculateBakersPercentage}
        />
        <Instructions instructions={recipe.instructions} />
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