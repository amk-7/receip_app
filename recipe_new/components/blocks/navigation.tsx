"use client";

import { useAuth } from "@/context/AuthProvider";

export default function Navigation() {
    const authData = useAuth();
    console.log(authData);
    return  (
        <nav className="flex bg-white border flex-col sm:flex-row sm:px-6 sm:justify-between py-3 space-y-2 sm:space-y-0 w-full">
            <div className="">
              <h1 className="text-3xl text-orange-500 font-bold">African Food Recipe</h1>
            </div>
            {/* {
                authData.user !== null ? 
                <div className="flex gap-2">
                    <Button onClick={() => {authData.logout()}}>
                        Se déconnecter
                    </Button>
                </div> 
                :
                <div className="flex justify-between gap-2">
                <Link href="/login">
                  <Button>
                    Se connecter
                  </Button>
                </Link>
                <Link href="/register">
                  <Button>
                    S'inscrire
                  </Button>
                </Link>
              </div> 
            } */}
        </nav>
    )
}