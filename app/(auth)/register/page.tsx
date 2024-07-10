"use client"
import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import axios from 'axios'
import Link from 'next/link'

const formSchema = z.object({
    email: z.string().email({
        message: "Please enter valid email",
    }),
    name: z.string().min(3, { message: "Name must be at least 3 characters." }),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters.",
    }),
    confirmPassword: z.string().min(6, {
        message: "Password must be at least 6 characters.",
    }),

}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});


const Register = () => {
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: '',
            confirmPassword: '',
            name: ''
        },
    })



    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const response = await axios.post('/auth/signup', values);
            localStorage.setItem('token', response.data.token);
            router.push('/singin');
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <div>
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-md">
                <h1 className="text-4xl font-bold text-center text-blue-900 mb-8">Issue Tracker Portal</h1>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Full Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="John Doe" {...field} type='text' />
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
                                        <Input placeholder="John@example.com" {...field} type='email' />
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
                                        <Input placeholder="*******" {...field} type='password' />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm password</FormLabel>
                                    <FormControl>
                                        <Input placeholder="*******" {...field} type='password' />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div>
                            <Button className="w-full bg-blue-900 hover:bg-purple-900 text-white font-bold py-2 px-4 rounded-lg" type="submit">Register</Button>
                        </div>
                        <p>Already have an account? <Link href={"/login"}>Sign In  here</Link></p>
                    </form>
                </Form>

            </div>
        </div>
    )
}

export default Register