"use client"
import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Webcam from 'react-webcam'
import useSpeechToText from 'react-hook-speech-to-text';
import { Mic, StopCircle } from 'lucide-react'
import { toast } from 'sonner'
import { chatSession } from '@/utils/GeminiAIModal'
import { db } from '@/utils/db'
import { UserAnswer } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import moment from 'moment'

function RecordAnswerSection({mockInterviewQuestion, activeQuestionIndex, interviewData}) {
    const [userAnswer, setUserAnswer] = useState('');
    const { user } = useUser();
    const [loading, setLoading] = useState(false);
    const {
        error,
        interimResult,
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
        setResults
    } = useSpeechToText({
        continuous: false,
        useLegacyResults: false
    });

    useEffect(() => {
        if (results.length > 0) {
            const newAnswer = results.map(result => result.transcript).join(' ');
            setUserAnswer(prevAns => prevAns + ' ' + newAnswer);
        }
    }, [results]);

    useEffect(() => {
        if (!isRecording && userAnswer?.length > 10) {
            UpdateUserAnswer();
        }
    }, [isRecording, userAnswer]);

    const StartStopRecording = useCallback(() => {
        if (isRecording) {
            stopSpeechToText();
        } else {
            startSpeechToText();
        }
    }, [isRecording, startSpeechToText, stopSpeechToText]);

    const UpdateUserAnswer = useCallback(async () => {
        try {
            console.log("Updating user answer:", userAnswer);
            setLoading(true);
            const feedbackPrompt = `Question: ${mockInterviewQuestion[activeQuestionIndex]?.question}, User Answer: ${userAnswer}, Depends on question and user answer for give interview question please give us rating for answer and feedback as area of improvement if any in just 3 to 5 lines to improve it in JSON format with rating field and feedback field`;

            const result = await chatSession.sendMessage(feedbackPrompt);
            const mockJsonResp = (result.response.text()).replace('```json', '').replace('```', '');
            const JsonFeedbackResp = JSON.parse(mockJsonResp);
            
            console.log("Feedback response:", JsonFeedbackResp);

            const resp = await db.insert(UserAnswer)
                .values({
                    mockIdRef: interviewData?.mockId,
                    question: mockInterviewQuestion[activeQuestionIndex]?.question,
                    correctAns: mockInterviewQuestion[activeQuestionIndex]?.answer,
                    userAns: userAnswer,
                    feedback: JsonFeedbackResp?.feedback,
                    rating: JsonFeedbackResp?.rating,
                    userEmail: user?.primaryEmailAddress?.emailAddress,
                    createdAt: moment().format('DD-MM-YYYY')
                });

            console.log("Database insert response:", resp);

            if (resp) {
                toast.success('User Answer recorded successfully');
                setUserAnswer('');
                setResults([]);
            }
        } catch (error) {
            console.error("Error updating user answer:", error);
            toast.error('Failed to record answer. Please try again.');
        } finally {
            setLoading(false);
        }
    }, [userAnswer, mockInterviewQuestion, activeQuestionIndex, interviewData, user]);

    const buttonText = useMemo(() => 
        isRecording ? 
            <h2 className='text-red-600 animate-pulse flex gap-2 items-center'>
                <StopCircle/>Stop Recording
            </h2> :
            <h2 className='text-primary flex gap-2 items-center'>
                <Mic/>Record Answer
            </h2>,
        [isRecording]
    );

    return (
        <div className='flex items-center justify-center flex-col'>
            <div className='flex flex-col mt-20 justify-center items-center bg-black rounded-lg p-5'>
                <Image src={'/webcam.png'} width={200} height={200} 
                    className='absolute' alt="Webcam placeholder" />
                <Webcam
                    mirrored={true}
                    style={{
                        height: 500,
                        width: 500,
                        zIndex: 10,
                    }}
                    aria-label="User webcam feed"
                />
            </div>
            <Button 
                disabled={loading}
                variant="outline" 
                className="my-10"
                onClick={StartStopRecording}
                aria-label={isRecording ? "Stop recording" : "Start recording"}
            >
                {buttonText}
            </Button>
        </div>
    )
}

export default RecordAnswerSection