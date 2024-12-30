'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { cadastroFormSchema }  from '@/validations/CadastroSchema';
import { saveCadastroForm } from '@/actions/cadastro/save';
import { useRouter } from 'next/navigation';

export interface CadastroFormProps {}

const CadastroForm = ({}: CadastroFormProps) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof cadastroFormSchema>>({
    resolver: zodResolver(cadastroFormSchema),
    defaultValues: {
      nome: '',
      email: '',
      password: '',
      afilliate: '',
      role: 'user',
    },
  });

    const handleForm = async (data: z.infer<typeof cadastroFormSchema>) => {
      try {
          const result = await saveCadastroForm(data);
          console.log('Cadastro realizado com sucesso:', result);
          router.push('/'); 
      } catch (error) {
          console.error('Erro ao enviar o formulário:', error);
      }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleForm)} className="space-y-6">
        <FormField
          control={form.control}
          name="nome"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-green-700">Nome:</FormLabel>
              <FormControl>
                <Input
                  placeholder="Nome do Usuário"
                  {...field}
                  className="border-green-300 focus:border-green-500"
                />
              </FormControl>
              <FormDescription className="text-green-600">Digite o nome do afiliado ou admin</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-green-700">Email:</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Email"
                  {...field}
                  className="border-green-300 focus:border-green-500"
                />
              </FormControl>
              <FormDescription className="text-green-600">Digite o email</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-green-700">Senha:</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Senha"
                  {...field}
                  className="border-green-300 focus:border-green-500"
                />
              </FormControl>
              <FormDescription className="text-green-600">Digite uma senha segura</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
          <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-green-700">Função:</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="border-green-300 focus:border-green-500">
                    <SelectValue placeholder="Selecione uma função" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="user">Afiliado</SelectItem>
                  <SelectItem value="admin">Administrador</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription className="text-green-600">
                Selecione a função no sistema
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
          <FormField
          control={form.control}
          name="afilliate"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-green-700">Afiliado:</FormLabel>
              <FormControl>
                <Input
                  placeholder="Afiliação"
                  {...field}
                  className="border-green-300 focus:border-green-500"
                />
              </FormControl>
              <FormDescription className="text-green-600">Digite a afiliação deste usuario</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white">
          Criar Conta
        </Button>
      </form>
    </Form>
  );
};


export default CadastroForm;