// app/api/register/route.ts
import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: Request) {
  try {
      const body = await req.json();
      console.log('Register Request body:', body); // Log para verificar datos enviados

      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/local/register`, {
          username: body.username,
          email: body.email,
          password: body.password,
          name: body.name,
      });

      console.log('Register Strapi response:', response.data); // Log para verificar respuesta de Strapi
      return NextResponse.json(response.data);
  } catch (error: any) {
      console.error('Register Error response:', error.response?.data); // Log para verificar errores

      const errorMessage = error.response?.data?.message || 'An unexpected error occurred.';
      return NextResponse.json({ error: errorMessage }, { status: error.response?.status || 500 });
  }
}
