"use client"
import { Button } from '@/components/ui/button'
import { db } from '@/utils/db'
import { MockInterview } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import { Lightbulb, WebcamIcon, Loader2 } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam'

function Interview({params}) {
    const [interviewData, setInterviewData] = useState(null);
    const [webCamEnabled, setWebCamEnabled] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        GetInterviewDetails();
    }, [])

    const GetInterviewDetails = async () => {
        try {
            const result = await db.select().from(MockInterview)
                .where(eq(MockInterview.mockId, params.interviewId))
            setInterviewData(result[0]);
        } catch (error) {
            console.error("Failed to fetch interview details:", error);
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loader2 className="w-10 h-10 animate-spin text-primary" />
            </div>
        )
    }

    return (
        <div className='max-w-6xl mx-auto px-4 py-8'>
            <h1 className='font-bold text-3xl mb-8 text-center'>Let's Get Started</h1>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
                <div className='space-y-6'>
                    <div className='bg-white shadow-md rounded-lg p-6 space-y-4'>
                        <h2 className='text-xl font-semibold mb-4'>Job Details</h2>
                        <p className='text-gray-700'><strong className='font-medium'>Job Role:</strong> {interviewData?.jobPosition}</p>
                        <p className='text-gray-700'><strong className='font-medium'>Tech Stack:</strong> {interviewData?.jobDesc}</p>
                        <p className='text-gray-700'><strong className='font-medium'>Experience:</strong> {interviewData?.jobExperience} years</p>
                    </div>
                    <div className='bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md'>
                        <div className='flex items-center'>
                            <Lightbulb className='h-5 w-5 text-yellow-500 mr-2' />
                            <h2 className='font-semibold text-yellow-800'>Information</h2>
                        </div>
                        <p className='mt-2 text-sm text-yellow-700'>{process.env.NEXT_PUBLIC_INFORMATION}</p>
                    </div>
                </div>
                <div className='bg-gray-100 rounded-lg p-6 flex flex-col items-center justify-center'>
                    {webCamEnabled ? (
                        <Webcam
                            onUserMedia={() => setWebCamEnabled(true)}
                            onUserMediaError={() => setWebCamEnabled(false)}
                            mirrored={true}
                            className='rounded-lg shadow-md w-full max-w-md'
                        />
                    ) : (
                        <>
                            <WebcamIcon className='h-32 w-32 text-gray-400 mb-4' />
                            <Button 
                                variant="outline" 
                                className="w-full max-w-xs"
                                onClick={() => setWebCamEnabled(true)}
                            >
                                Enable Web Cam and Microphone
                            </Button>
                        </>
                    )}
                </div>
            </div>
            <div className='mt-10 flex justify-center'>
                <Link href={`/dashboard/interview/${params.interviewId}/start`}>
                    <Button className="px-8 py-3 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg transition duration-300 text-lg">
                        Start Interview
                    </Button>
                </Link>
            </div>
        </div>
    )
}

export default Interview