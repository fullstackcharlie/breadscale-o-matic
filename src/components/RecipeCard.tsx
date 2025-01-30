import { Recipe } from "@/types/Recipe";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Link } from "react-router-dom";

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard = ({ recipe }: RecipeCardProps) => {
  return (
    <Link to={`/recipe/${recipe.id}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div className="aspect-video relative overflow-hidden">
          <img
            src={recipe.imageUrl}
            alt={recipe.name}
            className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-300"
          />
        </div>
        <CardHeader className="p-4">
          <h3 className="font-serif text-xl font-semibold text-brown-dark">{recipe.name}</h3>
          <p className="text-muted-foreground text-sm">{recipe.description}</p>
        </CardHeader>
        <CardContent className="p-4 pt-0 flex justify-between text-sm text-muted-foreground">
          <span>Prep: {recipe.prepTime}</span>
          <span>Cook: {recipe.cookTime}</span>
        </CardContent>
      </Card>
    </Link>
  );
};

export default RecipeCard;