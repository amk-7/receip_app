"use client";

import React, { useEffect, useState } from 'react';
import RecipeCard from './RecipeCard';
import { Recipe } from '@/utils/types';
import Link from 'next/link';
import { recipesData } from '@/utils/seedData';


const RecipeList = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'rating'>('newest');
  const [searchQuery, setSearchQuery] = useState('');
  const [minRating, setMinRating] = useState<number | ''>('');

  // Filtrer les recettes en fonction du titre, des ingrédients et de la note
  const filteredRecipes = recipes.filter((recipe) => {
    const matchesTitle = recipe.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesIngredients = recipe.ingredients.some((ingredient) =>
      ingredient.name && ingredient.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const matchesRating = minRating === '' || recipe.rating >= minRating;

    return (matchesTitle || matchesIngredients) && matchesRating;
  });

  useEffect(()=>{
    setRecipes(recipesData);
  }, [])

  // Trier les recettes filtrées
  const sortedRecipes = [...filteredRecipes].sort((a, b) => {
    if (sortBy === 'newest') return b.created_at - a.created_at;
    if (sortBy === 'oldest') return a.created_at - b.created_at;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-2xl text-orange-500 font-bold mb-2">Découvrer les délicieuses recettes africaines</h2>
          <p className="text-gray-600">Consultez notre collection de recettes partagées</p>
        </div>
      </div>


      <div className='flex sm:flex-row-reverse'>
        <div className="flex flex-col items-center w-full sm:flex-row sm:w-lg gap-4 mb-4">
            {/* Champ de recherche */}
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher par titre ou ingrédient"
              className="border border-gray-300 rounded p-2 text-sm w-full"
            />

            {/* Filtrer par note minimale */}
            <input
              type="number"
              value={minRating}
              onChange={(e) => setMinRating(e.target.value ? Number(e.target.value) : '')}
              placeholder="Note minimale"
              className="border border-gray-300 rounded p-2 text-sm w-full"
              min={1}
              max={5}
            />

            {/* Trier les recettes */}
            <div className="inline-flex items-center w-full">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'newest' | 'oldest' | 'rating')}
                className="border border-gray-300 rounded p-2 text-sm w-full"
              >
                <option value="newest">Plus récentes</option>
                <option value="oldest">Plus anciennes</option>
                <option value="rating">Meilleures notes</option>
              </select>
            </div>
            {/* <Link href="/recipes/form/nan">
              <Button className='w-full sm:w-auto bg-orange-600 hover:text-orange-500'>
                Ajouter
              </Button>
            </Link> */}
            
        </div>
      </div>

      {sortedRecipes.length === 0 ? (
        <div className="text-center py-12">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 mx-auto text-gray-400 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
          <h3 className="text-xl font-semibold mb-2">Aucune recette trouvée</h3>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sortedRecipes.map((recipe, index) => (
            <Link href={`/recipes/${recipe.id}`} key={index}>
              <RecipeCard recipe={recipe} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecipeList;
