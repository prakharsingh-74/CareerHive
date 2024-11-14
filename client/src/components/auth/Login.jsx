import React from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '@radix-ui/react-label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <div>
      <Navbar />
      <div className='flex items-center justify-center max-w-7xl mx-auto'>
        <form action="" className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
          <h1 className='font-bold text-xl mb-5'>Login</h1>

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

          <div className='flex items-center justify-center'>
            <RadioGroup className='flex items-center justify-between'>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"

                  className="cursor-pointer"
                />
                <Label htmlFor="r1">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  className="cursor-pointer"
                />
                <Label htmlFor="r1">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>
          <Button variant="outline" type="submit" className="w-full my-10">Login</Button>
          <span className='flex items-center justify-center text-sm'>Don't have an account? <Link to="/Signup" className='text-blue-600'>Signup Here</Link></span>
        </form>
      </div>
    </div>
  )
}

export default Login;