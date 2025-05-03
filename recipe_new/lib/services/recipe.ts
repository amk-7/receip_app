import { API_RECIPES_URL } from "@/constants/endpoints";
import { Recipe } from "@/utils/types";
import axios from "axios";
import Cookies from "js-cookie"; // Assurez-vous que js-cookie est installé


const createRecipe = async (recipe: FormData) => {
    const token = Cookies.get("authToken");

    try {
        const response = await axios.post<Recipe>(API_RECIPES_URL, recipe, {
            headers: {
                Authorization: `Bearer ${token}`,
                // 'Content-Type' is automatically set by Axios for FormData
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error creating recipe:", error);
        throw error;
    }
}

const getRecipes = async () : Promise<Recipe[]>  => {
    try {
        const response = await axios.get<Recipe[]>(API_RECIPES_URL);
        return response.data;
    } catch (error) {
        console.error("Error fetching recipes:", error);
        throw error;
    }
}

const getRecipesByUser = async (user_id: string) : Promise<Recipe[]>  => {
    return [];
}
const getRecipe = async (id: string) : Promise<Recipe | null>  => {
    try {
        const response = await axios.get<Recipe>(API_RECIPES_URL+id);
        return response.data;
    } catch (error) {
        console.error("Error fetching recipes:", error);
        throw error;
    }
}

const updateRecipe = async (id: string, recipe: FormData) : Promise<Recipe>  => {
    try {
        const headers = {
            'headers': {
                'Content-Type': 'multipart/form-data'
            }
        }
        const response = await axios.put<Recipe>(API_RECIPES_URL+id+"/", recipe, headers);
        return response.data;
    } catch (error) {
        console.error("Error updating recipe:", error);
        throw error;
    }
}

const deleteRecipe = async (id: string) => {

}

const RecipeService = {
    createRecipe,
    getRecipes,
    getRecipe,
    updateRecipe,
    deleteRecipe,
    getRecipesByUser
}

export default RecipeService;