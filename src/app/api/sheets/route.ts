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

    // Retornar os dados com cabeçalhos de Cache-Control
    const response = NextResponse.json(data);

    response.headers.set(
      'Cache-Control',
      'public, max-age=31536000, s-maxage=31536000, stale-while-revalidate=60'
    );

    return response;
  } catch (error) {
    console.error('Erro detalhado:', error);

    // Resposta de erro com cache control
    const errorResponse = NextResponse.json(
      { error: 'Falha ao buscar dados da planilha' },
      { status: 500 }
    );

    errorResponse.headers.set(
      'Cache-Control',
      'no-store'
    );

    return errorResponse;
  }
}