import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog'
import React from 'react'
import CreateProjectForm from '../project/CreateProjectForm'
import { DropdownMenu, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { PersonIcon } from '@radix-ui/react-icons'
import { DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { store } from '@/redux/Store'
import { logout } from '@/redux/auth/Action'

const Navbar = () => {
    const {auth} = useSelector(store=>store)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleLogout = ()=>{
        dispatch(logout())
    }

  return (
    <div className='border-b py-4 px-5 flex items-center justify-between'>
            <div className='flex items-center gap-3'>
                <p  onClick={()=>navigate("/")}className='cursor-pointer'>Project Management</p>
                <Dialog>
                    <DialogTrigger>
                        <Button variant="ghost">new project</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>Create New Project</DialogHeader>
                        <CreateProjectForm/>
                    </DialogContent>
                </Dialog>
                <Button variant="ghost">Upgrade</Button>
            </div>
            <div className='flex gap-3 items-center'>
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Button className="rounded-full" size="icon">
                            <PersonIcon/>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <p>{auth.user?.username}</p>
            </div>
    </div>
  )
}

export default Navbar