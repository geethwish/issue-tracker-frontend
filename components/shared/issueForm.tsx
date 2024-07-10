import React, { FC } from 'react'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Button } from '../ui/button'
import { RootState } from '@/store/store'
import { useSelector } from 'react-redux'


const formSchema = z.object({
    title: z.string().min(1, { message: 'Title can not be empty' }),
    description: z.string().min(10, { message: "description must be at least 10 characters." }),
    priority: z.string(),
    severity: z.string().min(1, { message: "Severity can not be null" }),
    status: z.string(),
})

interface IssueFormProps {
    onSubmit: (data: IssueFormTypes) => void
    formType: 'NEW' | 'UPDATE'
    defaultValues: IssueFormTypes
}

const IssueForm: FC<IssueFormProps> = ({ onSubmit, formType, defaultValues }) => {
    const { user } = useSelector((state: RootState) => state.user);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            ...defaultValues
        },
    })

    async function handleSubmit(values: z.infer<typeof formSchema>) {
        onSubmit(values)
    }


    return (
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md min-w-[600px]" >
            <h1 className="text-4xl font-bold text-center text-blue-900 mb-8">{formType === 'NEW' ? 'New Issue' : 'Update Issue'}</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input placeholder="Issue Tile"
                                        type='text' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Issue description here" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="priority"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Priority</FormLabel>
                                <FormControl>
                                    <Select onValueChange={field.onChange}
                                        value={field.value}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Normal" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="normal">Normal</SelectItem>
                                            <SelectItem value="medium">Medium</SelectItem>
                                            <SelectItem value="high">High</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="severity"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Severity</FormLabel>
                                <FormControl>
                                    <Select onValueChange={field.onChange}
                                        value={field.value} >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Normal" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="normal">Normal</SelectItem>
                                            <SelectItem value="medium">Medium</SelectItem>
                                            <SelectItem value="high">High</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {
                        formType === 'UPDATE' && <FormField
                            control={form.control}
                            name="status"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Status</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange}
                                            value={field.value} >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="open" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="open">Open</SelectItem>
                                                <SelectItem value="inprogress">In-Progress</SelectItem>
                                                <SelectItem value="fixed">Fixed</SelectItem>
                                                {
                                                    user?.role === "ADMIN" && <SelectItem value="cancelled">Cancelled</SelectItem>
                                                }

                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    }
                    <div>
                        <Button className="w-full bg-blue-900 hover:bg-purple-900 text-white font-bold py-2 px-4 rounded-lg" type="submit">Submit</Button>
                    </div>
                </form>
            </Form>

        </div >
    )
}

export default IssueForm