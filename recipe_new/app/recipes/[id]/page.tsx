"use client";

import RecipeDetail from "@/components/blocks/RecipeDetail";
import RecipeService from "@/lib/services/recipe";
import { Recipe } from "@/utils/types";
import { useParams, useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";

export default function RecipeDetailPage() {
    const { id } = useParams();
    const recipeId: string = id as string;
    const [recipe, setRecipe] = useState<Recipe | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchRecipe = async () => {
            const _recipe: Recipe | null = await RecipeService.getRecipe(recipeId);
            setRecipe(_recipe);
            console.log(_recipe);
            
        };
        fetchRecipe();
    }, [])

    if (!recipe) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-lg">Loading...</p>
            </div>
        );
    }   
    return (
       <main>
            <RecipeDetail recipe={recipe} onBack={()=>{
                router.push("/");
            }} onEdit={()=>{router.push('/recipes/form/'+recipe.id)}}  />
       </main>
    )
}