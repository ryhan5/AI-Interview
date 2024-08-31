// import React from 'react'
// import planData from '@/utils/planData'
// import PlanItemCard from './_components/PlanItemCard'

// export default function Upgrade() {
//     return (
//         <div className='container mx-auto p-5 mt-16'> 
//             <h2 className='font-bold text-3xl text-center mb-4'>Upgrade</h2>
//             <h2 className='text-center text-gray-500 mb-8'>Upgrade to monthly plan to access unlimited mock interviews</h2>

//             <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
//                 <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:items-center md:gap-8">
//                     {planData.map((plan, index) => (
//                         <PlanItemCard plan={plan} key={index} />
//                     ))}
//                 </div>
//             </div>
//         </div>
//     )
// }












import React from 'react'
import planData from '@/utils/planData'
import PlanItemCard from './_components/PlanItemCard'

export default function Upgrade() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-100 via-purple-50 to-white pt-24 pb-16">
            <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
                <h2 className='font-bold text-4xl text-center text-purple-600 mb-4'>Upgrade Your Plan</h2>
                <h2 className='text-center text-purple-500 text-xl mb-12'>Access unlimited mock interviews with our premium plans</h2>

                <div className="max-w-5xl mx-auto">
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:items-center">
                        {planData.map((plan, index) => (
                            <PlanItemCard plan={plan} key={index} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}