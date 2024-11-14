import React from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '@radix-ui/react-label'
import { Input } from '../ui/input'

const Signup = () => {
  return (
    <div>
      <Navbar />
      <div className='flex items-center justify-center max-w-7xl mx-auto'>
        <form action="" className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
          <h1 className='font-bold text-xl mb-5'>Signup</h1>
          <div className='my-2'>
            <Label>Full Name</Label>
            <Input
              type="text"
              placeholder="Full name"
            />
          </div>

          <div className='my-2'>
            <Label>Phone</Label>
            <Input
              type="text"
              placeholder="Phone Number"
            />
          </div>

          <div className='my-2'>
            <Label>E-mail</Label>
            <Input
              type="text"
              placeholder="E-mail"
            />
          </div>

          <div className='my-2'>
            <Label>Password</Label>
            <Input
              type="text"
              placeholder="Password"
            />
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup
