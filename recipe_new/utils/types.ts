export interface TockenData {
  access: string
  refresh: string
}

export interface User {
  id?: string;
  name: string;
  email?: string;
  password: string;
  phoneNumber: string;
}

export interface Recipe {
  id?: string;
  userId: string;
  title: string;
  image: string;
  cooking_time: number; // in minutes
  ingredients: Ingredient[];
  steps: string[];
  is_public: boolean;
  rating: number; // 1-5
  created_at: number;
}

export interface Ingredient {
  id?: string;
  recipeId?: string;
  name: string;
  quantity: string;
  image?: string;
}

