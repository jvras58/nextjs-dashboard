import * as z from 'zod';

const RoleEnum = {
  ADMIN: 'admin',
  USER: 'user',
} as const;

export const cadastroFormSchema = z
  .object({
    nome: z.string().min(1, 'Nome é obrigatório'),
    email: z.string().email('Email inválido'),
    password: z
      .string()
      .min(8, 'A senha deve ter no mínimo 8 caracteres')
      .max(20, 'A senha deve ter no máximo 20 caracteres')
      .regex(/[a-z]/, 'A senha deve conter pelo menos uma letra minúscula'),
    afilliate: z.string().optional(),
    role: z
      .enum(['admin', 'user'], {
        errorMap: () => ({ message: 'Selecione uma função válida' }),
      })
      .optional(),
  })
  .refine(
    (data) => data.role !== 'user' || (data.afilliate && data.afilliate.trim() !== ''),
    {
      message: 'Afiliação é obrigatória quando a função é "Afiliado"',
      path: ['afilliate'],
    }
  );

export type RoleType = keyof typeof RoleEnum;
