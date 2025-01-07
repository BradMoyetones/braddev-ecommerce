// app/api/login/route.ts
import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        console.log('Login Request body:', body); // Log para verificar datos enviados

        const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/local`, {
            identifier: body.username, // Cambiado de 'identifier' a 'username'
            password: body.password,
        });

        console.log('Login Strapi response:', response.data); // Log para verificar respuesta de Strapi
        return NextResponse.json(response.data);
    } catch (error: any) {
        console.error('Login Error response:', error.response?.data); // Log para verificar errores
        console.log(error);
        

        const errorMessage = error.response?.data?.message || 'An unexpected error occurred.';
        return NextResponse.json({ error: errorMessage }, { status: error.response?.status || 500 });
    }
}
