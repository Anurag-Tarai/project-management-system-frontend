import { Button } from '@/components/ui/button'
import { acceptInvitation } from '@/redux/project/Action'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

const AcceptInvitation = () => {
    const dispatch =  useDispatch()
    const location = useLocation()
    const navigate = useNavigate()
   
   

    const handleAcceptInvitaion =()=>{
        const urlParams = new URLSearchParams(location.search)
        const token = urlParams.get('token');
        dispatch(acceptInvitation({token, navigate}))
    }

  return (
    <div className='h-[85vh] flex flex-col justify-center items-center'>
        <h1 className='py-5 font-semibold text-xl'>you are invited to join the project</h1>
        <Button onClick={handleAcceptInvitaion}>Accept Invitation</Button>
        
    </div>
  )
}

export default AcceptInvitation