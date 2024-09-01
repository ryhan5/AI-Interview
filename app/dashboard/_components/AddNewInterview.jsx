"use client"
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { chatSession } from '@/utils/GeminiAIModal'
import { LoaderCircle, PlusCircle } from 'lucide-react'
import { db } from '@/utils/db'
import { MockInterview } from '@/utils/schema'
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@clerk/nextjs'
import moment from 'moment'
import { useRouter } from 'next/navigation'

function AddNewInterview() {
    const [openDialog, setOpenDialog] = useState(false)
    const [jobPosition, setJobPosition] = useState('');
    const [jobDesc, setJobDesc] = useState('');
    const [jobExperience, setJobExperience] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { user } = useUser();

    const onSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        const InputPrompt = `Job position: ${jobPosition}, Job Description: ${jobDesc}, Years of Experience: ${jobExperience}, Depends on Job Position, Job Description & Years of Experience give us ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT} Interview question along with Answer in JSON format, Give us question and answer field on JSON`

        try {
            const result = await chatSession.sendMessage(InputPrompt);
            const MockJsonResp = (result.response.text()).replace('```json', '').replace('```', '')

            if (MockJsonResp) {
                const resp = await db.insert(MockInterview)
                    .values({
                        mockId: uuidv4(),
                        jsonMockResp: MockJsonResp,
                        jobPosition: jobPosition,
                        jobDesc: jobDesc,
                        jobExperience: jobExperience,
                        createdBy: user?.primaryEmailAddress?.emailAddress,
                        createdAt: moment().format('DD-MM-YYYY')
                    }).returning({ mockId: MockInterview.mockId });

                if (resp) {
                    setOpenDialog(false);
                    router.push('/dashboard/interview/' + resp[0]?.mockId)
                }
            }
        } catch (error) {
            console.error("ERROR:", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <div 
                className='p-8 border-2 border-dashed border-purple-300 rounded-xl bg-purple-50 hover:bg-purple-100 hover:border-purple-400 cursor-pointer transition-all duration-300 flex items-center justify-center'
                onClick={() => setOpenDialog(true)}
            >
                <PlusCircle className="w-8 h-8 text-purple-500 mr-2" />
                <h2 className='text-xl font-semibold text-purple-700'>Start New Interview</h2>
            </div>
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold text-purple-800">Prepare for Your Interview</DialogTitle>
                        <DialogDescription className="text-gray-600">
                            Let's tailor your mock interview to your specific job application.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={onSubmit} className="space-y-6 mt-4">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">Job Role/Position</label>
                                <Input 
                                    placeholder="e.g., Full Stack Developer" 
                                    required
                                    onChange={(event) => setJobPosition(event.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">Job Description / Tech Stack</label>
                                <Textarea 
                                    placeholder="e.g., React, Node.js, MongoDB, AWS" 
                                    required
                                    onChange={(event) => setJobDesc(event.target.value)} 
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    rows={4}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">Years of Experience</label>
                                <Input 
                                    placeholder="e.g., 3"  
                                    type="number"  
                                    max="100" 
                                    required
                                    onChange={(event) => setJobExperience(event.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                            </div>
                        </div>
                        <div className='flex gap-4 justify-end'>
                            <Button type="button" variant="outline" onClick={() => setOpenDialog(false)}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={loading} className="bg-purple-600 hover:bg-purple-700 text-white">
                                {loading ? 
                                    <>
                                        <LoaderCircle className='animate-spin mr-2' /> Preparing Interview
                                    </> : 'Start Interview'    
                                }
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default AddNewInterview