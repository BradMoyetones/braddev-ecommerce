"use client"
// app/register/page.tsx
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from 'axios';
import { useAuth } from "@/context/AuthContext";

const formSchema = z.object({
    username: z.string().nonempty({
        message: "Este campo no puede ir vacío"
    }),
    password: z.string().nonempty({
        message: "Este campo no puede ir vacío"
    }),
    email: z.string().email({
        message: "Por favor ingrese un correo electrónico válido"
    }),
    name: z.string().nonempty({
        message: "Este campo no puede ir vacío"
    }),
});

export default function RegisterPage() {
    const [error, setError] = useState<string>('');
    const router = useRouter();
    const { isAuthenticated } = useAuth(); // Obtener funciones de autenticación del contexto
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: "",
            email: "",
            name: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setError(''); // Limpiar mensaje de error anterior

        try {
            const response = await axios.post('/api/register', {
                username: values.username,
                email: values.email,
                password: values.password,
                name: values.name,
            });

            if (response.status === 200) {
                console.log('Register successful:', response.data);
                router.push('/login'); // Redirigir a la página de inicio de sesión después del registro exitoso
            } else {
                console.error('Register error:', response.data);
                setError('Error al registrar. Por favor, inténtalo de nuevo.');
            }
        } catch (error) {
            console.error('Unexpected error:', error);
            setError('Ocurrió un error inesperado. Por favor, inténtalo de nuevo.');
        }
    }
    if (isAuthenticated) {
        router.push('/');
        return // Opcional: podrías mostrar un spinner de carga mientras se redirige
    }

    return (
        <div className="max-w-6xl mx-auto p-4 min-h-[calc(100vh-261px)] flex">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-md mx-auto w-full my-auto">
                    <h1 className="font-bold text-2xl">Register</h1>
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
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
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="Email" type="email" {...field} />
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
                        <p>¿Ya tienes una cuenta? <Link href="/login" className="underline">Inicia sesión aquí</Link></p>
                    </div>
                </form>
            </Form>
        </div>
    );
}
