
export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

export const API_AUTH_URL = `${API_URL}/auth`;
export const API_AUTH_LOGIN_URL = `${API_AUTH_URL}/login/`;
export const API_AUTH_REGISTER_URL = `${API_AUTH_URL}/register`;
export const API_AUTH_LOGOUT_URL = `${API_AUTH_URL}/logout`; 

export const API_RECIPES_URL = `${API_URL}/recipes/`;






