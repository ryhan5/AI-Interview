import React from 'react'
import Link from 'next/link'

const technologies = [
  { name: 'Gemini AI', description: 'Used for generating interview questions and responses', icon: '🤖' },
  { name: 'Next.js', description: 'React framework for building the web application', icon: '⚛️' },
  { name: 'Drizzle', description: 'ORM for database management', icon: '💧' },
  { name: 'shadcn/ui', description: 'UI component library for sleek design', icon: '🎨' },
  { name: 'Clerk', description: 'Authentication and user management', icon: '🔐' },
  { name: 'Tailwind CSS', description: 'Utility-first CSS framework for styling', icon: '🌬️' },
]

const features = [
  { name: 'AI Interview Practice', description: 'Simulate real interview scenarios with our AI-powered system, receiving instant feedback to improve your performance.', icon: '🎙️' },
  { name: 'AI-Generated Quizzes', description: 'Test your knowledge with customized quizzes tailored to your field and experience level.', icon: '📝' },
  { name: 'AI Resume Review', description: 'Get detailed feedback on your resume from our AI, ensuring it stands out to potential employers.', icon: '📄' },
]

export default function LearnMore() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-white pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center text-purple-800 mb-12">Elevate Your Job Search</h1>
        
        <div className="mb-16">
          <h2 className="text-3xl font-semibold text-center text-purple-700 mb-8">Our Cutting-Edge Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-lg border border-purple-200 shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-purple-700 mb-2">{feature.name}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center text-purple-700 mb-12">Why Choose Us?</h2>
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-500 to-indigo-500"></div>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              Our AI-powered platform is designed to give you the edge in your job search. By combining cutting-edge technology with proven interview techniques, we provide a comprehensive solution to help you land your dream job.
            </p>
            <ul className="space-y-4">
              {[ 
                "Personalized feedback to improve your interview skills",
                "Industry-specific questions and quizzes to boost your knowledge",
                "AI-driven resume analysis to maximize your chances of getting noticed",
                "24/7 access to practice and improve at your own pace",
                "Constantly updated content to keep you ahead of the curve"
              ].map((item, index) => (
                <li key={index} className="flex items-center space-x-3">
                  <svg className="flex-shrink-0 w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center text-purple-800 mb-12">Technologies We Use</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {technologies.map((tech, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
                <div className="text-4xl mb-6 text-purple-600">{tech.icon}</div>
                <h3 className="text-2xl font-semibold text-purple-800 mb-4">{tech.name}</h3>
                <p className="text-gray-600 leading-relaxed">{tech.description}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="text-center">
          <Link href="/" className="inline-block bg-purple-600 text-white px-6 py-3 rounded-full hover:bg-purple-700 transition-colors duration-300">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
