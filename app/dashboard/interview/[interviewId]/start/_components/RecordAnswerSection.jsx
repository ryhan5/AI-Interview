"use client"
import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import Webcam from 'react-webcam'
import useSpeechToText from 'react-hook-speech-to-text';
import { Mic, StopCircle, Camera, AlertCircle, Loader2, RefreshCw, CheckCircle, User, Keyboard } from 'lucide-react'
import { toast } from 'sonner'
import { chatSession } from '@/utils/GeminiAIModal'
import { db } from '@/utils/db'
import { UserAnswer } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import moment from 'moment'
import { motion, AnimatePresence } from 'framer-motion'

function RecordAnswerSection({mockInterviewQuestion, activeQuestionIndex, interviewData}) {
    const [userAnswer, setUserAnswer] = useState('');
    const { user } = useUser();
    const [loading, setLoading] = useState(false);
    const [webcamReady, setWebcamReady] = useState(false);
    const [showFeedback, setShowFeedback] = useState(false);
    const [feedback, setFeedback] = useState(null);
    const [isTyping, setIsTyping] = useState(false);

    const {
        error,
        interimResult,
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
        setResults
    } = useSpeechToText({
        continuous: true,
        useLegacyResults: false,
        speechRecognitionProperties: {
            interimResults: true,
            continuous: true
        }
    });

    useEffect(() => {
        if (results.length > 0) {
            const newAnswer = results.map(result => result.transcript).join(' ');
            setUserAnswer(prevAns => prevAns + ' ' + newAnswer);
            setResults([]); // Clear results to avoid duplication
        }
    }, [results, setResults]);

    const StartStopRecording = useCallback(() => {
        if (isRecording) {
            stopSpeechToText();
        } else {
            setUserAnswer('');
            startSpeechToText();
        }
        setIsTyping(false);
    }, [isRecording, startSpeechToText, stopSpeechToText]);

    const toggleInputMethod = () => {
        if (isRecording) {
            stopSpeechToText();
        }
        setIsTyping(!isTyping);
    };

    const UpdateUserAnswer = useCallback(async () => {
        try {
            setLoading(true);
            const feedbackPrompt = `Question: ${mockInterviewQuestion[activeQuestionIndex]?.question}, User Answer: ${userAnswer}, Depends on question and user answer for give interview question please give us rating for answer and feedback as area of improvement if any in just 3 to 5 lines to improve it in JSON format with rating field and feedback field`;

            const result = await chatSession.sendMessage(feedbackPrompt);
            const mockJsonResp = (result.response.text()).replace('```json', '').replace('```', '');
            const JsonFeedbackResp = JSON.parse(mockJsonResp);

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

            if (resp) {
                setFeedback(JsonFeedbackResp);
                setShowFeedback(true);
                toast.success('Answer recorded successfully');
            }
        } catch (error) {
            console.error("Error updating user answer:", error);
            toast.error('Failed to record answer. Please try again.');
        } finally {
            setLoading(false);
        }
    }, [userAnswer, mockInterviewQuestion, activeQuestionIndex, interviewData, user]);

    const resetRecording = () => {
        setUserAnswer('');
        setResults([]);
        setShowFeedback(false);
    };

    const buttonText = useMemo(() => 
        isRecording ? 
            <motion.span 
                className='text-red-600 flex gap-2 items-center'
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
            >
                <StopCircle/>Stop Recording
            </motion.span> :
            <span className='text-primary flex gap-2 items-center'>
                <Mic/>Record Answer
            </span>,
        [isRecording]
    );

    return (
        <motion.div 
            className='flex items-center justify-center flex-col bg-white rounded-xl shadow-lg p-6 max-w-2xl mx-auto'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <motion.div 
                className='relative w-full aspect-video bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-lg overflow-hidden shadow-inner mb-6'
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                {!webcamReady && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                        <User className="w-16 h-16 mb-4" />
                        <Loader2 className="w-8 h-8 animate-spin" />
                        <p className="mt-2 text-sm">Preparing your camera...</p>
                    </div>
                )}
                <Webcam
                    mirrored={true}
                    audio={false}
                    onUserMedia={() => setWebcamReady(true)}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${webcamReady ? 'opacity-100' : 'opacity-0'}`}
                    aria-label="User webcam feed"
                />
                <motion.div 
                    className='absolute top-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded-full text-xs flex items-center'
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    <Camera className='w-4 h-4 mr-1' />
                    Live
                </motion.div>
                {isRecording && (
                    <motion.div 
                        className='absolute bottom-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs flex items-center'
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    >
                        <span className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse" />
                        Recording
                    </motion.div>
                )}
            </motion.div>
            <AnimatePresence>
                {error && (
                    <motion.div 
                        className='mb-4 p-3 bg-red-100 text-red-700 rounded-lg flex items-center'
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                    >
                        <AlertCircle className='w-5 h-5 mr-2' />
                        {error}
                    </motion.div>
                )}
            </AnimatePresence>
            <motion.div 
                className='w-full space-y-4 mt-6'
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <Button 
                    onClick={toggleInputMethod}
                    variant="outline" 
                    className="w-full py-3 text-lg font-semibold"
                >
                    {isTyping ? <Mic className="mr-2" /> : <Keyboard className="mr-2" />}
                    {isTyping ? "Switch to Voice" : "Switch to Typing"}
                </Button>

                {isTyping ? (
                    <Textarea
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                        placeholder="Type your answer here..."
                        className="w-full h-32"
                    />
                ) : (
                    <Button 
                        disabled={loading}
                        variant="outline" 
                        className={`w-full py-3 text-lg font-semibold transition-all duration-300 ${
                            isRecording ? 'bg-red-100 hover:bg-red-200' : 'bg-primary-100 hover:bg-primary-200'
                        }`}
                        onClick={StartStopRecording}
                        aria-label={isRecording ? "Stop recording" : "Start recording"}
                    >
                        {buttonText}
                    </Button>
                )}

                {!isRecording && userAnswer && (
                    <div className='flex space-x-2'>
                        <Button 
                            onClick={UpdateUserAnswer} 
                            disabled={loading}
                            className='flex-1 bg-green-500 hover:bg-green-600 text-white'
                        >
                            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4 mr-2" />}
                            Submit Answer
                        </Button>
                        <Button 
                            onClick={resetRecording} 
                            variant="outline"
                            className='flex-1'
                        >
                            <RefreshCw className="w-4 h-4 mr-2" />
                            Reset
                        </Button>
                    </div>
                )}
            </motion.div>
            <AnimatePresence>
                {(interimResult || userAnswer) && (
                    <motion.div 
                        className='mt-4 p-3 bg-gray-100 rounded-lg w-full'
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                    >
                        <h3 className="font-semibold mb-2">Your Answer:</h3>
                        <p className='text-gray-600'>
                            {userAnswer || interimResult}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
            <AnimatePresence>
                {showFeedback && feedback && (
                    <motion.div 
                        className='mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg w-full'
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                    >
                        <h3 className="font-semibold mb-2 text-blue-800">Feedback:</h3>
                        <p className='text-blue-700 mb-2'>Rating: {feedback.rating}/10</p>
                        <p className='text-blue-600'>{feedback.feedback}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}

export default RecordAnswerSection