"use client"
import axiosInstance from '@/utils/axiosConfig';
import axios from 'axios';
import { useEffect, useState } from 'react';

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

    useEffect(() => {
        if (params.id) {
            axiosInstance.get(`http://localhost:3001/api/issues/${params.id}`)
                .then(response => setIssue(response.data))
                .catch(error => console.error(error));
        }
    }, [params.id]);


    if (!issue) {
        return <div>Issue not found</div>;
    }

    return (
        <div className="container mx-auto">
            <h1 className="text-3xl font-bold">{issue.title}</h1>
            <p>{issue.description}</p>
            <p>Severity: {issue.severity}</p>
            <p>Priority: {issue.priority}</p>
            <p>Status: {issue.status}</p>
        </div>
    );
}