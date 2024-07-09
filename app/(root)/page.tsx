"use client"
import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Home() {
    const [issues, setIssues] = useState<any>([]);


    useEffect(() => {
        axios.get('http://localhost:3001/api/issues')
            .then(response => setIssues(response.data))
            .catch(error => console.error(error));
    }, []);


    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="container mx-auto">
                <h1 className="text-3xl font-bold">Issue Tracker</h1>
                <Link href="/issue/create">
                    <div className="text-blue-500">Create New Issue</div>
                </Link>
                <ul>
                    {issues.map((issue: any) => (
                        <li key={issue.id}>
                            <Link href={`/issue/${issue.id}`}>
                                <>{issue.title}</>
                            </Link>
                        </li>
                    ))}
                </ul>

            </div>
        </main>
    );
}
