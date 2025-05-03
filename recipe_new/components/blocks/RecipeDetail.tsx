import React, { useState } from "react";
import { Recipe } from "@/utils/types";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/context/AuthProvider";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface RecipeDetailProps {
  recipe: Recipe;
  onBack: () => void;
  onEdit: () => void;
}

const RecipeDetail: React.FC<RecipeDetailProps> = ({ recipe, onBack, onEdit }) => {
  const [userRating, setUserRating] = useState(0);
  const { user } = useAuth(); // Utilisation du contexte AuthProvider

  const isOwner = user && recipe.userId === user.id; // Vérifie si l'utilisateur est le propriétaire

  const handleRating = (rating: number) => {
    if (!user) return;
    setUserRating(rating);
    // TODO: Ajouter la logique pour sauvegarder la note dans le backend
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this recipe?")) {
      // TODO: Ajouter la logique pour supprimer la recette
      onBack();
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="outline" onClick={onBack} className="mb-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        Retour
      </Button>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/2">
          <div className="rounded-lg overflow-hidden mb-6">
            {recipe.image ? (
              <Image
                width={200}
                height={300}
                src={"/images/"+recipe.image}
                alt={recipe.title}
                className="w-full object-cover"
              />
            ) : (
              <div className="w-full h-[400px] bg-gray-200 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-20 w-20 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
            )}
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-3">{recipe.title}</h1>

            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-1 text-orange-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{recipe.cooking_time} min</span>
              </div>

              <Badge
                className={cn("text-sm", recipe.is_public ? "bg-green-600" : "bg-gray-600")}
              >
                {recipe.is_public ? "Public" : "Private"}
              </Badge>
            </div>

            <div className="flex items-center mb-6">
              <div className="mr-4">Rating:</div>
              <div className="rating flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-6 w-6 cursor-pointer ${
                      star <= (userRating || recipe.rating)
                        ? "text-yellow-500"
                        : "text-gray-300"
                    }`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    onClick={() => user && handleRating(star)}
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                {!user && (
                  <span className="ml-2 text-sm text-gray-500">
                    (Login to rate)
                  </span>
                )}
              </div>
            </div>

            {isOwner && (
              <div className="flex gap-3 mb-6">
                <Button variant="outline" onClick={onEdit}>
                  Edit Recipe
                </Button>
                <Button variant="destructive" onClick={handleDelete}>
                  Delete Recipe
                </Button>
              </div>
            )}
          </div>
        </div>

        <div className="lg:w-1/2">
          <h2 className="text-2xl font-semibold mb-4">Ingredients</h2>
          <Card className="p-6 mb-8">
            <ul className="space-y-3">
              {recipe.ingredients.map((ingredient, idx) => (
                <li key={idx} className="flex items-center">
                  <span className="text-orange-500 mr-3">{idx + 1}</span>
                  <div className="mr-4 flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                    {ingredient.image && (
                      <Image
                        src={"https://images.pexels.com/photos/842571/pexels-photo-842571.jpeg?auto=compress&cs=tinysrgb&w=300"}
                        alt={ingredient.name}
                        className="w-6 h-6 rounded-full object-cover"
                      />
                    ) }
                  </div>
                  <span className="font-medium">{ingredient.name}</span>
                  <span className="ml-2 text-gray-600">
                    ({ingredient.quantity})
                  </span>
                </li>
              ))}
            </ul>
          </Card>

          <h2 className="text-2xl font-semibold mb-4">Preparation Steps</h2>
          <Card className="p-6">
            <ol className="space-y-4">
              {recipe.steps.map((step, idx) => (
                <li key={idx} className="flex">
                  <span className="flex-shrink-0 bg-orange-500 text-white w-8 h-8 rounded-full flex items-center justify-center mr-3">
                    {idx + 1}
                  </span>
                  <div className="mt-1">{step}</div>
                </li>
              ))}
            </ol>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
