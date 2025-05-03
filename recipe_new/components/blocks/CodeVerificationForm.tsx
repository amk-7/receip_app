"use client"

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter } from 'next/navigation';

export default function CodeVerificationForm() {
  const [code, setCode] = useState('');
  const router = useRouter();

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const confirmationResult = window.confirmationResult;
      const result = await confirmationResult.confirm(code);
      const user = result.user;

      // Stocker le token dans un cookie si tu veux (optionnel)
      const token = await user.getIdToken();
      console.log("User Token:", token);

      router.push('/dashboard'); // redirection après login
    } catch (error) {
      console.error('Error verifying code', error);
      alert('Invalid verification code');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Verify your phone</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleVerifyCode} className="space-y-4">
            <Input
              type="text"
              placeholder="Enter code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <Button type="submit" className="w-full">
              Verify Code
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
