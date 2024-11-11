
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { TrashIcon } from '@radix-ui/react-icons'
import React from 'react'

const CommentCard = () => {
  return (
    <div className='flex justify-between'>
        <div className='flex items-center gap-4'>
            <Avatar>
                <AvatarFallback>A</AvatarFallback>
            </Avatar>

        </div>
        <div className='space-y-1'>
        <p>Anurag Tarai</p>
        <p>how much task is pending</p>
        </div>
        <Button className="rounded-full" variant="ghost">
            <TrashIcon/>
        </Button>
    </div>
  )
}

export default CommentCard