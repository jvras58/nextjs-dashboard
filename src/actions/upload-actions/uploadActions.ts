"use server";

import fs from 'fs-extra';
import path from 'path';

export async function uploadfileAction(formData: FormData) {
const file = formData.get('file') as File;

if (!file || file.size === 0) {
return {
    message: 'Nenhum arquivo fornecido.',
    error: true,
};
}

try {
const arrayBuffer = await file.arrayBuffer();
const buffer = Buffer.from(arrayBuffer);

const uploadDir = path.join(process.cwd(), 'public', 'data');
fs.ensureDirSync(uploadDir);

const timestamp = Date.now();
const uniqueId = timestamp.toString();

// Extrai a extensão original do arquivo
const originalExtension = path.extname(file.name);

// Define o nome do arquivo com o identificador único e a extensão original
const fileName = `relatorio_betinha_${uniqueId}${originalExtension}`;

const filePath = path.join(uploadDir, fileName);
fs.writeFileSync(filePath, new Uint8Array(buffer));

return {
    message: 'Arquivo enviado com sucesso!',
    error: false,
};
} catch (error) {
console.error('Erro ao salvar o arquivo:', error);
return {
    message: 'Erro ao salvar o arquivo.',
    error: true,
};
}
}