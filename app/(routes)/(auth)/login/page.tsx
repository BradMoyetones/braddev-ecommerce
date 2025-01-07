"use client"

// app/login/page.tsx
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useAuth } from "@/context/AuthContext";
import api from "@/config/clienteAxios";
import Cookies from 'js-cookie'; // Importa js-cookie

const formSchema = z.object({
    username: z.string().nonempty({
        message: "Este campo no puede ir vacío"
    }),
    password: z.string().nonempty({
        message: "Este campo no puede ir vacío"
    }),
});

// Establece el tiempo de expiración en días
const tokenExpirationDays = 0.25; // 6 horas en días (21600 segundos)


export default function LoginPage() {
    const [error, setError] = useState<string>('');
    const router = useRouter();
    const { setUser, user } = useAuth(); // Obtener funciones de autenticación del contexto

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setError(''); // Limpiar mensaje de error anterior

        try {
            const response = await api.post('/api/auth/local', { // Ruta relativa al frontend para la API de login
                identifier: values.username,
                password: values.password,
            });

            if (response.status === 200) {
                console.log('Login successful:', response.data);
                Cookies.set('token', response.data.jwt, { path: '/', secure: true, sameSite: 'lax', expires: tokenExpirationDays });
                setUser(response.data.user); // Guardar el usuario en el contexto de autenticación
                router.push('/'); // Redirigir a la página principal después del inicio de sesión
            } else {
                console.error('Login error:', response.data);
                setError('Credenciales inválidas. Por favor, inténtalo de nuevo.');
            }
        } catch (error) {
            console.error('Unexpected error:', error);
            setError('Ocurrió un error inesperado. Por favor, inténtalo de nuevo.');
        }
    }

    // Redirigir automáticamente al usuario si ya está autenticado
    if (user) {
        router.push('/');
        return null; // Opcional: podrías mostrar un spinner de carga mientras se redirige
    }

    return (
        <div className="max-w-6xl mx-auto p-4 min-h-[calc(100vh-261px)] flex">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-md mx-auto w-full my-auto">
                    <h1 className="font-bold text-2xl">Login</h1>
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input placeholder="Username" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input placeholder="Password" type="password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {error && <p className="text-red-500">{error}</p>}
                    <Button type="submit">Submit</Button>
                    <div className="text-center">
                        <p>¿Olvidaste tu contraseña? <Link href="/forgot-password" className="underline">Recuperar cuenta</Link></p>
                        <p>¿Aún no tienes una cuenta? <Link href="/register" className="underline">Crear Una</Link></p>
                    </div>
                </form>
            </Form>
        </div>
    );
}
