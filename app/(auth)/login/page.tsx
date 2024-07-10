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
import { useDispatch } from 'react-redux';
import { fetchUserDetails } from '@/store/slices/user.slice'
import { AppDispatch } from '@/store/store'

const formSchema = z.object({
    email: z.string().email({
        message: "Please enter valid email",
    }),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters.",
    }),
})


const Login = () => {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ''
        },
    })



    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const response = await axios.post('http://localhost:3001/api/auth/signin', values);
            localStorage.setItem('token', response.data.token);
            dispatch(fetchUserDetails());
            router.push('/');
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

                        <div>
                            <Button className="w-full bg-blue-900 hover:bg-purple-900 text-white font-bold py-2 px-4 rounded-lg" type="submit">Login</Button>
                        </div>
                        <p>Don't have a account? <Link href={"/register"}>Singup here</Link></p>
                    </form>
                </Form>

            </div>
        </div>
    )
}

export default Login