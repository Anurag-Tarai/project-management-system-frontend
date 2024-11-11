import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import React from 'react'

const UserList = () => {
  return (
    <div className='space-y-2'>
      <div className='border rounded-md'>
          <p className='py-2 px-3'>{"Raam" || "Unassigned"}</p>
      </div>
      {[1,1,1,1].map((item)=><div key={item} className='py-2 group hover:bg-slate-800 cursor-pointer flex items-center space-x-4 rounded-md border px-4'>
        <Avatar>
          <AvatarFallback>
            R
          </AvatarFallback>
        </Avatar>
        <div className='space-y-1'>
            <p className='test-sm leading-none'>Code with Anurag</p>
            <p className='test-sm text-muted-foreground'>@CodewithAnurag</p>
        </div>
      </div>)}

    </div>
  )
}

export default UserList