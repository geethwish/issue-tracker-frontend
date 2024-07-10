"use client"
import IssueForm from '@/components/shared/issueForm';
import axiosInstance from '@/utils/axiosConfig';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const CreatePage = () => {
    const router = useRouter();
    const defaultValues = {
        title: "",
        description: "",
        priority: "normal",
        severity: "normal",
        status: 'open',
    }

    const handleSubmit = async (values: IssueFormTypes) => {
        try {
            const response = await axiosInstance.post('http://localhost:3001/api/issues', { ...values });
            if (response.data !== undefined) {
                toast.success("New Issue added.", {
                    position: "top-right",
                });
                router.push("/")
            }

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className='w-full flex items-center justify-center h-full'><IssueForm onSubmit={handleSubmit} formType='NEW' defaultValues={defaultValues} /></div>
    )
}

export default CreatePage