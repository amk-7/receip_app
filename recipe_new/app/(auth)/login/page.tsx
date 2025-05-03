"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc"; // Import de l'icône Google
import { login } from "@/lib/services/auth"; // Import de la fonction login
import { useRouter } from "next/navigation"; // Pour rediriger après connexion
import Cookies from "js-cookie"; // Assurez-vous que js-cookie est installé
import { useAuth } from "@/context/AuthProvider";

export default function LoginPage() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const authData = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const token = await login(phone, password);
      console.log("Utilisateur connecté :", token);

      // Sauvegarde des informations de l'utilisateur dans les cookies
      Cookies.set("authToken", token.access, { expires: 7 }); // Expire dans 7 jours
      Cookies.set("refreshToken", token.refresh, { expires: 7 }); // Optionnel : Sauvegarde du refresh token

      // Sauvegarde des informations de l'utilisateur dans le localStorage
      localStorage.setItem("token", JSON.stringify(token));

      // Redirigez l'utilisateur après connexion (par exemple, vers la page d'accueil)
      return authData.login(token);
      
    } catch (err: any) {
      setError(err.message || "Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={cn("flex min-h-screen items-center justify-center bg-gray-50 px-4")}>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Connexion</CardTitle>
          <CardDescription className="text-center">
            Connectez-vous à votre compte
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <div className="grid gap-2">
                <Label htmlFor="phone">Téléphone</Label>
                <PhoneInput
                  country={"fr"}
                  value={phone}
                  onChange={(value) => setPhone(value)}
                  inputProps={{
                    name: "phone",
                    required: true,
                    autoFocus: true,
                  }}
                  inputClass="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Mot de passe</Label>
                  <a href="#" className="ml-auto inline-block text-sm underline-offset-4 hover:underline">
                    Mot de passe oublié ?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Connexion..." : "Connexion"}
              </Button>
              <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                <FcGoogle className="text-lg" /> Connexion avec Google
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Vous n&apos;avez pas de compte ?{" "}
              <a href="#" className="underline underline-offset-4">
                Inscrivez-vous
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
