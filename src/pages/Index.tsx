import RecipeCard from "@/components/RecipeCard";

const sampleRecipes = [
  {
    id: "1",
    name: "Classic Sourdough Bread",
    description: "A traditional sourdough with a perfect crust and tender crumb",
    imageUrl: "https://images.unsplash.com/photo-1585478259715-876acc5be8eb?auto=format&fit=crop&q=80",
    servings: 1,
    ingredients: [
      { item: "Bread Flour", amount: 500, unit: "g" },
      { item: "Water", amount: 350, unit: "ml" },
      { item: "Salt", amount: 10, unit: "g" },
      { item: "Sourdough Starter", amount: 100, unit: "g" }
    ],
    instructions: [
      "Mix flour and water, let rest for 30 minutes",
      "Add salt and starter, mix well",
      "Perform stretch and folds every 30 minutes for 2 hours",
      "Bulk ferment for 4-6 hours",
      "Shape and place in banneton",
      "Cold proof overnight",
      "Bake in Dutch oven at 450°F for 45 minutes"
    ],
    prepTime: "1 hour",
    cookTime: "45 minutes"
  },
  {
    id: "2",
    name: "Rustic Baguette",
    description: "Crispy French baguettes with a light, airy interior",
    imageUrl: "https://images.unsplash.com/photo-1568471173242-461f0a730452?auto=format&fit=crop&q=80",
    servings: 2,
    ingredients: [
      { item: "Bread Flour", amount: 500, unit: "g" },
      { item: "Water", amount: 350, unit: "ml" },
      { item: "Salt", amount: 10, unit: "g" },
      { item: "Yeast", amount: 7, unit: "g" }
    ],
    instructions: [
      "Mix all ingredients until well combined",
      "Knead for 10 minutes",
      "Let rise for 1 hour",
      "Shape into baguettes",
      "Proof for 30 minutes",
      "Score and bake at 450°F for 25 minutes"
    ],
    prepTime: "30 minutes",
    cookTime: "25 minutes"
  }
];

const Index = () => {
  return (
    <div className="min-h-screen bg-cream">
      <div className="max-w-7xl mx-auto p-4">
        <header className="text-center my-12">
          <h1 className="text-5xl font-serif font-bold text-brown-dark mb-4">
            Artisan Bread Recipes
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover the art of bread making with our collection of carefully crafted recipes
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sampleRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;