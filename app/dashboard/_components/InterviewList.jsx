"use client"
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { useUser } from '@clerk/nextjs'
import { desc, eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import InterviewItemCard from './InterviewItemCard';

function InterviewList() {
    const { user } = useUser();
    const [interviewList, setInterviewList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (user) {
            GetInterviewList();
        }
    }, [user])

    const GetInterviewList = async () => {
        setIsLoading(true);
        try {
            const result = await db.select()
                .from(MockInterview)
                .where(eq(MockInterview.createdBy, user?.primaryEmailAddress?.emailAddress))
                .orderBy(desc(MockInterview.id));

            setInterviewList(result);
        } catch (error) {
            console.error("Error fetching interviews:", error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="bg-white shadow-md rounded-lg p-6 mt-8">
            <h2 className='text-2xl font-bold text-gray-800 mb-6'>Previous Mock Interviews</h2>

            {isLoading ? (
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {[1, 2, 3].map((item) => (
                        <div key={item} className='h-32 bg-gray-200 animate-pulse rounded-lg'></div>
                    ))}
                </div>
            ) : interviewList.length > 0 ? (
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {interviewList.map((interview, index) => (
                        <InterviewItemCard 
                            interview={interview}
                            key={index} 
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-8">
                    <p className="text-gray-600 text-lg">No mock interviews found.</p>
                    <button 
                        className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors duration-300"
                        onClick={() => {/* Add functionality to start a new interview */}}
                    >
                        Start Your First Interview
                    </button>
                </div>
            )}
        </div>
    )
}

export default InterviewList