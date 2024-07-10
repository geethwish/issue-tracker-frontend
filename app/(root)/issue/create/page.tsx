"use client"
import axiosInstance from '@/utils/axiosConfig';
import axios from 'axios';
import { useState } from 'react';

const CreatePage = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            await axiosInstance.post('http://localhost:3001/api/issues', { title, description });

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container mx-auto">
            <h1 className="text-3xl font-bold">Create Issue</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    ></textarea>
                </div>
                <button type="submit">Create</button>
            </form>
        </div>
    )
}

export default CreatePage