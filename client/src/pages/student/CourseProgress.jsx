import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import React from 'react'

const CourseProgress = () => {

  const isCompleted = true; 

  return (
    <div className='max-w-7xl mx-auto p-4 mt-20'>
      {/* Display Course Name */}
      <div className='flex justify-between mb-4'>
        <h1 className='text-2xl font-bold'>Coure Title</h1>
        <Button>Completed</Button>
      </div>

      <div className='flex flex-col md:flex-row gap-6'>
        {/* Video Section */}
        <div className='flex-1 md:w-3/5 h-fit rounded-lg shadow-lg p-4'>
          <div>
            {/* Placeholder for video player */}
            {/* <video 

            /> */}
          </div>
          {/* Display Current watching letcure title */}
          <div className='mt-2'>
            <h3 className='font-medium text-lg'>Lecture-1: Introduction</h3>
          </div>
        </div>
        {/* Lecture Sidebar */}
        <div className='flex flex-col w-full md:w-2/5 border-t md:border-t-0 md:border-l border-gray-200 pt-4 md:pt-0 md:pl-4'>
          <h2 className='font-semibold text-xl mb-4'>Course Lecture</h2>
          <div className='flex-1 overflow-y-auto'>
              {
                [1, 2, 3, 4].map((lecture, idx)=>(
                  <Card key={idx} className='mb-3 hover:cursor-pointer transition transform'>
                    <CardContent className='flex items-center justify-between p-4'>
                      <div className='flex items-center'>

                      </div>
                    </CardContent>
                  </Card>
                ))
              }
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseProgress