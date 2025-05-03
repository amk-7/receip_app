"use client";
import RecipeForm from "@/components/blocks/RecipeForm";
import RecipeService from "@/lib/services/recipe";
import { Recipe } from "@/utils/types";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";


export default function RecipeFormPage() {
  const {id} = useParams();
  const recipeId: string = id as string;
  const [recipe, setRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      if (recipeId != "nan") {
        const _recipe: Recipe | null = await RecipeService.getRecipe(recipeId);
        setRecipe(_recipe);
        console.log(_recipe);
      }
        
    };
      fetchRecipe();
  }, [])
  
  if (!recipe) {
    return (
      <RecipeForm onCancel={function (): void {
        throw new Error("Function not implemented.");
      } } />
    );
  } 
  return (
    <RecipeForm existingRecipe={recipe} onCancel={function (): void {
      throw new Error("Function not implemented.");
    } } />
  )
}