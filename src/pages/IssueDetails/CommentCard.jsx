
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { deleteComment } from '@/redux/comment/Action'
import { TrashIcon } from '@radix-ui/react-icons'
import React from 'react'
import { useDispatch } from 'react-redux'

const CommentCard = ({item}) => {
  const dispatch = useDispatch()

  const handleDelete = ()=>{
      dispatch(deleteComment(item.id))
  }

  // console.log("item ", item);
  
  return (
    <div className="flex justify-start items-start gap-4">
  <div className="flex items-center gap-4">
    <Avatar>
      <AvatarFallback>{item?.user?.username[0]}</AvatarFallback>
    </Avatar>
  </div>
  <div className="space-y-1">
    <p>{item?.user?.username}</p>
    <p>{item?.content}</p>
  </div>
  <Button onClick={handleDelete} className="rounded-full ml-auto" variant="ghost">
    <TrashIcon />
  </Button>
</div>

  )
}

export default CommentCard