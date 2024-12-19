import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import CadastroForm from '@/components/Form/cadastroForm';
import { ThemeToggle } from '@/components/ui/theme-toggle'

export default function Cadastro() {
  return (
    <Card className="w-full bg-white dark:bg-gray-800">
    <ThemeToggle />
    <CardHeader className="text-center">
        <h1 className="text-2xl font-bold text-green-800 dark:text-green-400">Cadastro</h1>
    </CardHeader>
      <CardContent>
        <CadastroForm />
      </CardContent>
    </Card>
  );
}
