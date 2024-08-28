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
import { LoaderCircle } from 'lucide-react'
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
    const [jsonResponse, setJsonResponse] = useState([]);
    const router = useRouter();
    const { user } = useUser();

    const onSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        console.log(jobPosition, jobDesc, jobExperience);

        const InputPrompt = `Job position: ${jobPosition}, Job Description: ${jobDesc}, Years of Experience: ${jobExperience}, Depends on Job Position, Job Description & Years of Experience give us ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT} Interview question along with Answer in JSON format, Give us question and answer field on JSON`

        try {
            const result = await chatSession.sendMessage(InputPrompt);
            const MockJsonResp = (result.response.text()).replace('```json', '').replace('```', '')
            console.log(JSON.parse(MockJsonResp));
            setJsonResponse(MockJsonResp);

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

                console.log("Inserted ID:", resp)
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
            <div className='p-10 border rounded-lg bg-secondary
                hover:scale-105 hover:shadow-md cursor-pointer
                transition-all border-dashed'
                onClick={() => setOpenDialog(true)}
            >
                <h2 className='text-lg text-center'>+ Add New</h2>
            </div>
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent className="max-w-2xl" hideCloseButton>
                    <DialogHeader className="space-y-4">
                        <DialogTitle className="text-2xl">Tell us more about your job interviewing</DialogTitle>
                        <DialogDescription>
                            <form onSubmit={onSubmit} className="space-y-6">
                                <div className="space-y-4">
                                    <h2 className="text-lg font-semibold">Add details about your job position/role, job description, and years of experience</h2>

                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium">Job Role/Job Position</label>
                                        <Input 
                                            placeholder="Ex. Full Stack Developer" 
                                            required
                                            onChange={(event) => setJobPosition(event.target.value)}
                                            className="text-black placeholder-gray-400"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium">Job Description/ Tech Stack (In Short)</label>
                                        <Textarea 
                                            placeholder="Ex. React, Angular, NodeJs, MySql etc" 
                                            required
                                            onChange={(event) => setJobDesc(event.target.value)} 
                                            className="text-black placeholder-gray-400"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium">Years of experience</label>
                                        <Input 
                                            placeholder="Ex. 5"  
                                            type="number"  
                                            max="100" 
                                            required
                                            onChange={(event) => setJobExperience(event.target.value)}
                                            className="text-black placeholder-gray-400"
                                        />
                                    </div>
                                </div>
                                <div className='flex gap-5 justify-end'>
                                    <Button type="button" variant="ghost" onClick={() => setOpenDialog(false)}>Cancel</Button>
                                    <Button type="submit" disabled={loading}>
                                        {loading ? 
                                            <>
                                                <LoaderCircle className='animate-spin mr-2' /> Generating from AI
                                            </> : 'Start Interview'    
                                        }
                                    </Button>
                                </div>
                            </form>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default AddNewInterview