import { AtomIcon, Edit, LucideCalendarSearch } from 'lucide-react'
import React from 'react'

function Hero() {
  return (
  <div className="relative" id="home">
        <div aria-hidden="true" className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20">
            <div className="blur-[106px] h-56 bg-gradient-to-br from-primary to-purple-400 dark:from-blue-700"></div>
            <div className="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300 dark:to-indigo-600"></div>
        </div>
        <div>
            <div className="relative pt-36 ml-auto">
                <div className="lg:w-2/3 text-center mx-auto">
                    <h1 className="text-gray-900 dark:text-white font-bold text-5xl md:text-6xl xl:text-7xl">Your Personal <span className="text-primary dark:text-white">AI Interview Coach</span></h1>
                    <p className="mt-8 text-gray-700 dark:text-gray-300">Our AI interview platform simulates real interview scenarios, providing personalized feedback to help you improve your performance. Practice and refine your answers with AI-driven insights, boosting your confidence for the real interview.</p>
                    <div className="mt-16 flex flex-wrap justify-center gap-y-4 gap-x-6">
                        <a
                          href="/dashboard"
                          className="relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:bg-primary before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max"
                        >
                          <span className="relative text-base font-semibold text-white"
                            >Get started</span>
                        </a>
                        <a
                          href="#"
                          className="relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:border before:border-transparent before:bg-primary/10 before:bg-gradient-to-b before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 dark:before:border-gray-700 dark:before:bg-gray-800 sm:w-max"
                        >
                          <span
                            className="relative text-base font-semibold text-primary dark:text-white"
                            >Learn more</span>
                        </a>
                    </div>
                   
                </div>
               {/* bshcbc */}
               <div>
<section className="py-8 bg-white z-50 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
<h2 className="font-bold text-3xl">Elevate your career with our products</h2>
<h2 className="text-md text-gray-500">Try for free</h2>

<div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      <a
        className="block rounded-xl border bg-white
        p-8 shadow-md transition
        border-purple-500 hover:shadow-purple-500"
        href="#"
      >
       <AtomIcon className='h-8 w-8'/>

        <h2 className="mt-4 text-xl font-bold text-black">AI Resume Builder</h2>

        <p className="mt-1 text-sm text-gray-600">
        Our resume builder is a user-friendly tool designed to help you craft professional, customized resumes with ease.
        </p>
      </a>

      <a
        className="block rounded-md border bg-white border-purple-500 p-8 shadow-md transition hover:border-purple-500 hover:shadow-purple-500"
        href="#"
      >
      <Edit className='h-8 w-8'/>

        <h2 className="mt-4 text-xl font-bold text-black">AI Generated Quiz  </h2>

        <p className="mt-1 text-sm text-gray-600">
        Our AI-generated quiz platform creates personalized quizzes tailored to your chosen topics and difficulty levels.
        </p>
      </a>

      <a
        className="block rounded-xl border bg-white p-8 shadow-md transition border-purple-500 hover:shadow-purple-500"
        href="#"
      >
      <LucideCalendarSearch className='h-8 w-8' />

        <h2 className="mt-4 text-xl font-bold text-black">AI based career help/guidance</h2>

        <p className="mt-1 text-sm text-gray-600">
        Our AI-based career guidance platform offers personalized advice tailored to your skills, interests, and career goals.
        </p>
      </a>

    
    </div>

    <div className="mt-12 text-center">
      <a
        href="/sign-in"
        className="inline-block rounded bg-primary px-12 py-3 text-sm font-medium text-white transition hover:bg-purple-700 focus:outline-none focus:ring focus:ring-yellow-400"
      >
        Get Started Today
      </a>
    </div>
    </section>

               </div>
            </div>
        </div>
    </div>

  )
}

export default Hero