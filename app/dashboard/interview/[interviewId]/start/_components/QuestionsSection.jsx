"use client"
import React, { useCallback, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Lightbulb, Volume2 } from 'lucide-react'

function QuestionsSection({ mockInterviewQuestion, activeQuestionIndex }) {
    const textToSpeech = useCallback((text) => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel() // Cancel any ongoing speech
            const speech = new SpeechSynthesisUtterance(text)
            speech.lang = 'en-US'
            speech.rate = 0.9
            window.speechSynthesis.speak(speech)
        } else {
            toast.error('Sorry, your browser does not support text to speech')
        }
    }, [])

    const questionButtons = useMemo(() => 
        mockInterviewQuestion?.map((question, index) => (
            <Button
                key={index}
                variant={activeQuestionIndex === index ? "default" : "outline"}
                className={`p-2 rounded-full text-xs md:text-sm ${
                    activeQuestionIndex === index ? 'bg-primary text-white' : ''
                }`}
            >
                Question #{index + 1}
            </Button>
        )),
        [mockInterviewQuestion, activeQuestionIndex]
    )

    if (!mockInterviewQuestion) return null

    return (
        <div className='p-5 border rounded-lg my-10 bg-white shadow-md'>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-6'>
                {questionButtons}
            </div>
            <div className='space-y-4'>
                <h2 className='my-5 text-lg md:text-xl font-semibold'>
                    {mockInterviewQuestion[activeQuestionIndex]?.question}
                </h2>
                <Button
                    variant="ghost"
                    size="sm"
                    className='flex items-center text-primary hover:text-primary-dark'
                    onClick={() => textToSpeech(mockInterviewQuestion[activeQuestionIndex]?.question)}
                    aria-label="Listen to question"
                >
                    <Volume2 className='mr-2 h-4 w-4' />
                    Listen
                </Button>
            </div>
            <div className='border rounded-lg p-5 bg-blue-50 mt-8'>
                <h2 className='flex gap-2 items-center text-primary mb-2'> 
                    <Lightbulb className='h-5 w-5'/>
                    <strong>Note:</strong>
                </h2>
                <p className='text-sm text-primary'>
                    {process.env.NEXT_PUBLIC_QUESTION_NOTE}
                </p>
            </div>
        </div>
    )
}

export default QuestionsSection