"use server";

import fs from 'fs-extra';
import path from 'path';

export async function deleteFileAction(fileName: string) {
try {
const filePath = path.join(process.cwd(), 'public', 'data', fileName);
if (fs.existsSync(filePath)) {
    await fs.remove(filePath);
    return {
    message: 'Arquivo deletado com sucesso!',
    error: false,
    };
} else {
    return {
    message: 'Arquivo não encontrado.',
    error: true,
    };
}
} catch (error) {
console.error('Erro ao deletar o arquivo:', error);
return {
    message: 'Erro ao deletar o arquivo.',
    error: true,
};
}
}