"use client"
import IssueForm from '@/components/shared/issueForm';
import { Button } from '@/components/ui/button';
import { RootState } from '@/store/store';
import axiosInstance from '@/utils/axiosConfig';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { MdOutlineViewInAr } from "react-icons/md";
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

type Issue = {
    id: string;
    title: string;
    description: string;
    severity: string;
    priority: string;
    status: string;
};

export default function IssueDetail({ params }: { params: { id: string } }) {
    const [issue, setIssue] = useState<Issue | null>(null);
    const [isEdit, setIsEdit] = useState(false)
    const { user } = useSelector((state: RootState) => state.user);
    const router = useRouter()

    const fetchIssueById = async () => {
        if (params.id) {
            axiosInstance.get(`http://localhost:3001/api/issues/${params.id}`)
                .then(response => setIssue(response.data))
                .catch(error => console.error(error));
        }
    }
    useEffect(() => {
        fetchIssueById()
    }, [params.id]);


    if (!issue) {
        return <div>Issue not found</div>;
    }

    const handleFromView = () => {
        setIsEdit((prev) => !prev)
    }

    const handleSubmit = async (values: IssueFormTypes) => {

        try {
            const response = await axiosInstance.put(`http://localhost:3001/api/issues/${params.id}`, { ...values });
            if (response.data !== undefined) {
                toast.success("New Issue added.", {
                    position: "top-right",
                });
                fetchIssueById()
                setIsEdit(false)
            }

        } catch (error) {
            console.error(error);
        }
    }

    const handleDelete = async () => {
        try {
            const response = await axiosInstance.delete(`http://localhost:3001/api/issues/${params.id}`);
            if (response.data !== undefined) {
                toast.success("Issue has been deleted", {
                    position: "top-right",
                });

                router.push("/")
            }

        } catch (error) {
            console.error(error);
        }
    }
    return (
        <div className="w-full flex items-center justify-center h-full">
            <div className="max-w-xs mx-auto bg-white rounded-lg shadow-md overflow-hidden mt-24 sm:min-w-[600px] extra-sm-mobile">
                <div className="bg-gradient-to-br from-blue-900 to-blue-500  px-4 py-2 flex items-center justify-between">
                    <h2 className="text-lg font-medium text-white">Issue Details</h2>
                    {
                        isEdit ? <Button variant={"link"} className='text-white hover:no-underline' onClick={handleFromView}><MdOutlineViewInAr className='mr-1' /> View
                        </Button> : <Button variant={"link"} className='text-white hover:no-underline' onClick={handleFromView}><FaEdit className='mr-1' /> Edit
                        </Button>
                    }

                    {
                        user.role === "ADMIN" && <Button variant={"link"} className='text-white hover:no-underline' onClick={handleDelete}><FaTrash className='mr-1' /> Delete
                        </Button>

                    }
                </div>
                {
                    isEdit ? <IssueForm defaultValues={issue} onSubmit={handleSubmit} formType={'UPDATE'} /> : (<div className="px-4 py-5 sm:p-6">
                        <div className="flex flex-col items-start justify-between mb-6">
                            <span className="text-sm font-medium text-gray-600">Title</span>
                            <span className="text-lg font-medium text-gray-800">{issue.title}</span>
                        </div>
                        <div className="flex flex-col items-start justify-between mb-6">
                            <span className="text-sm font-medium text-gray-600">Description</span>
                            <span className="text-lg font-medium text-gray-800">{issue.description}</span>
                        </div>
                        <div className="flex flex-row items-center justify-between flex-wrap mb-6">
                            <div className="flex flex-col items-start">
                                <span className="text-sm font-medium text-gray-600">Priority</span>

                                {

                                    issue.priority === 'normal' && <span className="uppercase text-xs bg-green-500 text-white py-1 px-2 rounded-full ">{issue.priority}</span>
                                }

                                {

                                    issue.priority === 'medium' && <span className="uppercase text-xs bg-yellow-500 text-white py-1 px-2 rounded-full ">{issue.priority}</span>
                                }
                                {

                                    issue.priority === 'high' && <span className="uppercase text-xs bg-red-500 text-white py-1 px-2 rounded-full ">{issue.priority}</span>
                                }
                            </div>
                            <div className="flex flex-col items-start">
                                <span className="text-sm font-medium text-gray-600 min-w-10">severity</span>
                                {

                                    issue.severity === 'normal' && <span className="uppercase text-xs bg-green-500 text-white py-1 px-2 rounded-full ">{issue.severity}</span>
                                }

                                {

                                    issue.severity === 'medium' && <span className="uppercase text-xs bg-yellow-500 text-white py-1 px-2 rounded-full ">{issue.severity}</span>
                                }
                                {

                                    issue.severity === 'high' && <span className="uppercase text-xs bg-red-500 text-white py-1 px-2 rounded-full ">{issue.severity}</span>
                                }

                            </div>
                            <div className="flex flex-col items-start">
                                <span className="text-sm font-medium text-gray-600">Status</span>
                                {

                                    issue.status && issue.status.toLowerCase() === 'open' && <span className="uppercase text-xs bg-indigo-500 text-white py-1 px-2 rounded-full ">{issue.status}</span>
                                }

                                {

                                    issue.status && issue.status.toLowerCase() === 'inprogress' && <span className="uppercase text-xs bg-blue-500 text-white py-1 px-2 rounded-full ">{issue.status}</span>
                                }
                                {

                                    issue.status && issue.status.toLowerCase() === 'fixed' && <span className="uppercase text-xs bg-red-500 text-white py-1 px-2 rounded-full ">{issue.status}</span>
                                }
                                {

                                    issue.status && issue.status.toLowerCase() === 'fixed' && <span className="uppercase text-xs bg-orange-500 text-white py-1 px-2 rounded-full ">{issue.status}</span>
                                }
                            </div>
                        </div>

                    </div>)
                }

            </div>
        </div>
    );
}