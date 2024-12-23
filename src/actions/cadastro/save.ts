"use server";
    
import { prisma } from "@/lib/prisma";
import { cadastroFormSchema } from "@/validations/CadastroSchema";
import { z } from "zod";
import { hash } from "bcryptjs";

export const saveCadastroForm = async (data: z.infer<typeof cadastroFormSchema>) => {
    try {
        const validatedData = await cadastroFormSchema.parseAsync(data);
        
        const hashedPassword = await hash(validatedData.password, 10);

        const result = await prisma.user.create({
            data: {
                ...validatedData,
                password: hashedPassword,
            },
        });
        return result;
    } catch (err) {
        console.error('Erro ao salvar o formulário de cadastro:', err);
        throw err;
    }
};