import axios from "axios";
import { API_AUTH_LOGIN_URL, API_AUTH_REGISTER_URL, API_AUTH_LOGOUT_URL } from "@/constants/endpoints";
import { TockenData, User } from "@/utils/types";

/**
 * Fonction pour connecter un utilisateur
 * @param phone - Numéro de téléphone de l'utilisateur
 * @param password - Mot de passe de l'utilisateur
 * @returns Les données de l'utilisateur connecté
 */
export async function login(phone: string, password: string): Promise<TockenData> {
  try {
    const response = await axios.post(API_AUTH_LOGIN_URL, { phone, password });
    return response.data as TockenData;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Erreur lors de la connexion");
  }
}

/**
 * Fonction pour enregistrer un nouvel utilisateur
 * @param name - Nom de l'utilisateur
 * @param phone - Numéro de téléphone de l'utilisateur
 * @param password - Mot de passe de l'utilisateur
 * @returns Les données de l'utilisateur enregistré
 */
export async function register(name: string, phone: string, password: string): Promise<User> {
  try {
    const response = await axios.post<{ user: User }>(API_AUTH_REGISTER_URL, { name, phone, password });
    return response.data.user;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Erreur lors de l'inscription");
  }
}

/**
 * Fonction pour déconnecter un utilisateur
 * @returns Un message de confirmation
 */
export async function logout(): Promise<string> {
  try {
    const response = await axios.post<{ message: string }>(API_AUTH_LOGOUT_URL);
    return response.data.message;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Erreur lors de la déconnexion");
  }
}


