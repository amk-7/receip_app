"use client"
import React, { use, useEffect, useState } from 'react';
import { Recipe, Ingredient } from '@/utils/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { useAuth } from '@/context/AuthProvider';
import RecipeService from '@/lib/services/recipe';

interface RecipeFormProps {
  existingRecipe?: Recipe ;
  onCancel: () => void;
}

const RecipeForm: React.FC<RecipeFormProps> = ({ 
  existingRecipe, 
  onCancel 
}) => {
  const { user } = useAuth(); // Récupère l'utilisateur connecté depuis le contexte AuthProvider
  const [title, setTitle] = useState(existingRecipe?.title || '');
  const [image, setImage] = useState(existingRecipe?.image || '');
  const [cookingTime, setCookingTime] = useState(existingRecipe?.cooking_time.toString() || '30');
  const [ingredients, setIngredients] = useState<Ingredient[]>(existingRecipe?.ingredients || []);
  const [newIngredientName, setNewIngredientName] = useState('');
  const [newIngredientQuantity, setNewIngredientQuantity] = useState('');
  const [newIngredientImage, setNewIngredientImage] = useState('');
  const [steps, setSteps] = useState(existingRecipe?.steps || ['']);
  const [isPublic, setIsPublic] = useState(existingRecipe?.is_public ?? true);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [newIngredientFile, setNewIngredientFile] = useState<File | null>(null);


  useEffect(() => {
    if (existingRecipe) {
      setTitle(existingRecipe.title);
      setImage(existingRecipe.image);
      setCookingTime(existingRecipe.cooking_time.toString());
      setIngredients(existingRecipe.ingredients);
      setSteps(existingRecipe.steps);
      setIsPublic(existingRecipe.is_public);
    }
  }
  , [existingRecipe]);
  
  const handleAddIngredient = () => {
    if (!newIngredientName.trim()) {
      setErrors({...errors, ingredient: 'Le nom de l\'ingrédient est requis.'});
      return;
    }
    
    if (!newIngredientQuantity.trim()) {
      setErrors({...errors, ingredient: 'La quantité est requise.'});
      return;
    }
    
    const newIngredient: Ingredient = {
      name: newIngredientName,
      quantity: newIngredientQuantity,
      image: newIngredientFile ? URL.createObjectURL(newIngredientFile) : undefined
    };
    
    
    setIngredients([...ingredients, newIngredient]);
    setNewIngredientName('');
    setNewIngredientQuantity('');
    setNewIngredientImage('');
    const updatedErrors = { ...errors };
    delete updatedErrors.ingredient;
    setErrors(updatedErrors);
  };

  const handleRemoveIngredient = (index: number) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients.splice(index, 1);
    setIngredients(updatedIngredients);
  };

  const handleStepChange = (index: number, value: string) => {
    const updatedSteps = [...steps];
    updatedSteps[index] = value;
    setSteps(updatedSteps);
  };

  const handleAddStep = () => {
    setSteps([...steps, '']);
  };

  const handleRemoveStep = (index: number) => {
    const updatedSteps = [...steps];
    updatedSteps.splice(index, 1);
    setSteps(updatedSteps);
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!title.trim()) {
      newErrors.title = 'Le titre de la recette est requis.';
    }
    
    if (isNaN(Number(cookingTime)) || Number(cookingTime) <= 0) {
      newErrors.cookingTime = 'Un temps de cuisson valide est requis.';
    }
    
    if (ingredients.length === 0) {
      newErrors.ingredients = 'Au moins un ingrédient est requis.';
    }
    
    const nonEmptySteps = steps.filter(step => step.trim());
    if (nonEmptySteps.length === 0) {
      newErrors.steps = 'Au moins une étape de préparation est requise.';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    if (!user) {
      alert('Vous devez être connecté pour créer ou modifier une recette.');
      return;
    }
    
    // Filtrer les étapes vides
    const validSteps = steps.filter(step => step.trim());
    
    // const recipe: Recipe = {
    //   id: existingRecipe?.id || Date.now().toString(),
    //   userId: user.id, // Utilise l'ID de l'utilisateur connecté
    //   title,
    //   image,
    //   cooking_time: Number(cookingTime),
    //   ingredients,
    //   steps: validSteps,
    //   is_public: isPublic,
    //   rating: existingRecipe?.rating || 0,
    //   created_at: existingRecipe?.created_at || Date.now()
    // };

    const formData: FormData = new FormData();
    formData.append('title', title);
    formData.append('cooking_time', cookingTime);
    formData.append('ingredients', JSON.stringify(ingredients));
    formData.append('steps', JSON.stringify(validSteps));
    formData.append('is_public', String(isPublic));
    formData.append('user', user.user.id);
    formData.append('rating', String(existingRecipe?.rating || 0));
    formData.append('created_at', String(existingRecipe?.created_at || Date.now())); 
    formData.append('id', existingRecipe?.id || Date.now().toString());
    // if (imageFile) {
    //   formData.append('image', imageFile);
    // } else {
    //   formData.append('image', image); // cas fallback
    // }
    
    
    console.log(user.user);
    
    if (existingRecipe && existingRecipe.id) {
      // Mettre à jour la recette existante
      RecipeService.updateRecipe(existingRecipe.id, formData);
    } else {
      // Créer une nouvelle recette
      RecipeService.createRecipe(formData);
    }
  };

  const convertToBase64 = (file: File, callback: (result: string) => void) => {
    const reader = new FileReader();
    reader.onload = () => {
      callback(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImage(URL.createObjectURL(file)); // Pour prévisualiser l'image localement
    }
  };

  const handleIngredientImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewIngredientFile(file);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          {existingRecipe ? 'Modifier la recette' : 'Créer une nouvelle recette'}
        </h1>
        <Button 
          variant="outline" 
          onClick={onCancel}
        >
          Annuler
        </Button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <Card className="p-6 mb-6">
              <h2 className="text-lg font-semibold mb-4">Informations de base</h2>
              
              <div className="space-y-4">
                <div className='space-y-2'>
                  <Label htmlFor="title">Titre de la recette</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className={errors.title ? 'border-red-500' : ''}
                  />
                  {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                </div>
                
                <div className='space-y-2'>
                  <Label htmlFor="cookingTime">Temps de cuisson (minutes)</Label>
                  <Input
                    id="cookingTime"
                    type="number"
                    min="1"
                    value={cookingTime}
                    onChange={(e) => setCookingTime(e.target.value)}
                    className={errors.cookingTime ? 'border-red-500' : ''}
                  />
                  {errors.cookingTime && <p className="text-red-500 text-sm mt-1">{errors.cookingTime}</p>}
                </div>
                
                <div className='space-y-2'>
                  <Label htmlFor="image">Image de la recette</Label>
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="mt-1"
                  />
                  {image && (
                    <div className="mt-2">
                      <img 
                        src={image} 
                        alt="Aperçu de la recette" 
                        className="w-full h-40 object-cover rounded-md" 
                      />
                    </div>
                  )}
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="public"
                    checked={isPublic}
                    onCheckedChange={setIsPublic}
                  />
                  <Label htmlFor="public">Rendre la recette publique</Label>
                </div>
              </div>
            </Card>
            
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Ingrédients</h2>
              
              {errors.ingredients && (
                <p className="text-red-500 text-sm mb-4">{errors.ingredients}</p>
              )}
              
              <div className="mb-4">
                {ingredients.length > 0 && (
                  <div className="mb-4">
                    <ul className="space-y-2">
                      {ingredients.map((ing, idx) => (
                        <li key={idx} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                          <div className="flex items-center">
                            {ing.image && (
                              <img
                                src={ing.image}
                                alt={ing.name}
                                className="w-8 h-8 rounded-full object-cover mr-2"
                              />
                            )}
                            <span className="font-medium">{ing.name}</span>
                            <span className="ml-2 text-gray-600">({ing.quantity})</span>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveIngredient(idx)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <svg 
                              xmlns="http://www.w3.org/2000/svg" 
                              className="h-4 w-4" 
                              fill="none" 
                              viewBox="0 0 24 24" 
                              stroke="currentColor"
                            >
                              <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" 
                              />
                            </svg>
                          </Button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
                  <div className="md:col-span-2">
                    <Label htmlFor="ingredientName">Nom</Label>
                    <Input
                      id="ingredientName"
                      value={newIngredientName}
                      onChange={(e) => setNewIngredientName(e.target.value)}
                      className={errors.ingredient ? 'border-red-500' : ''}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="ingredientQuantity">Quantité</Label>
                    <Input
                      id="ingredientQuantity"
                      value={newIngredientQuantity}
                      onChange={(e) => setNewIngredientQuantity(e.target.value)}
                      className={errors.ingredient ? 'border-red-500' : ''}
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <Label htmlFor="ingredientImage">Image (optionnel)</Label>
                    <Input
                      id="ingredientImage"
                      type="file"
                      accept="image/*"
                      onChange={handleIngredientImageChange}
                    />
                  </div>
                </div>
                
                {errors.ingredient && (
                  <p className="text-red-500 text-sm mt-1">{errors.ingredient}</p>
                )}
              </div>
              
              <Button
                type="button"
                onClick={handleAddIngredient}
                variant="outline"
                className="w-full"
              >
                Ajouter un ingrédient
              </Button>
            </Card>
          </div>
          
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Étapes de préparation</h2>
            
            {errors.steps && (
              <p className="text-red-500 text-sm mb-4">{errors.steps}</p>
            )}
            
            <div className="space-y-4 mb-6">
              {steps.map((step, idx) => (
                <div key={idx} className="flex items-start">
                  <span className="flex-shrink-0 bg-orange-500 text-white w-6 h-6 rounded-full flex items-center justify-center mr-2 mt-2">
                    {idx + 1}
                  </span>
                  <div className="flex-grow">
                    <Textarea
                      value={step}
                      onChange={(e) => handleStepChange(idx, e.target.value)}
                      placeholder={`Étape ${idx + 1}`}
                      className="resize-none"
                    />
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveStep(idx)}
                    className="text-red-500 hover:text-red-700 ml-2"
                    disabled={steps.length <= 1}
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-4 w-4" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" 
                      />
                    </svg>
                  </Button>
                </div>
              ))}
            </div>
            
            <Button
              type="button"
              onClick={handleAddStep}
              variant="outline"
              className="w-full mb-8"
            >
              Ajouter une étape
            </Button>
            
            <Button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600"
            >
              {existingRecipe ? 'Mettre à jour la recette' : 'Enregistrer la recette'}
            </Button>
          </Card>
        </div>
      </form>
    </div>
  );
};

export default RecipeForm;
