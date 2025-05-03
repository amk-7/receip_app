
import React from 'react';
import { Recipe } from '@/utils/types';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

interface RecipeCardProps {
  recipe: Recipe;
  onClick?: () => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onClick }) => {
  return (
    <Card 
      className="recipe-card-shadow overflow-hidden cursor-pointer"
      onClick={onClick}
    >
      <div className="aspect-video relative">
        {recipe.image ? (
          <img 
            src={'images/'+recipe.image} 
            alt={recipe.title} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-12 w-12 text-gray-400" 
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
        <div className="absolute top-2 right-2">
          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${recipe.is_public ? 'bg-green-500' : 'bg-gray-500'} text-white`}>
            {recipe.is_public ? 'Public' : 'Private'}
          </span>
        </div>
      </div>
      <CardContent className="pt-4">
        <h3 className="font-bold text-lg mb-2 line-clamp-1">{recipe.title}</h3>
        <div className="flex items-center text-sm text-gray-600 mb-2">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-4 w-4 mr-1" 
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
        <div className="flex items-center">
          {[1, 2, 3, 4, 5].map((star) => (
            <svg
              key={star}
              xmlns="http://www.w3.org/2000/svg"
              className={`h-4 w-4 ${star <= recipe.rating ? 'text-yellow-500' : 'text-gray-300'}`}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
              />
            </svg>
          ))}
        </div>
      </CardContent>
      <CardFooter className="text-sm text-gray-600">
        <p>Ingredients: {recipe.ingredients.length}</p>
      </CardFooter>
    </Card>
  );
};

export default RecipeCard;
