import { NextResponse } from 'next/server';
import { sheetsService } from '@/service/google/sheets';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const spreadsheetId = searchParams.get('spreadsheetId');
  const sheetIndex = searchParams.get('sheetIndex') || '0';

  if (!spreadsheetId) {
    return NextResponse.json(
      { error: 'O ID da planilha é obrigatório' },
      { status: 400 }
    );
  }

  try {
    const data = await sheetsService.getSheetData(
      spreadsheetId,
      parseInt(sheetIndex)
    );
    return NextResponse.json(data);
  } catch (error) {
    console.error('Erro detalhado:', error);
    return NextResponse.json(
      { error: 'Falha ao buscar dados da planilha' },
      { status: 500 }
    );
  }
}