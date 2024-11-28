import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog"
import IssueCard from "./IssueCard"
import { Button } from "@/components/ui/button"
import { PlusIcon } from "@radix-ui/react-icons"
import CreateIssueForm from "./CreateIssueForm"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { fetchIssues } from "@/redux/issue/Action"
import { useParams } from "react-router-dom"
import { store } from "@/redux/Store"

const IssueList = ({title, status}) => {
    const dispatch = useDispatch()
    const {id} = useParams()
    const {issue} = useSelector(store=>store)

    // console.log("issues from backend", issue);
    
    
    useEffect(()=>{
        dispatch(fetchIssues(id))
    },[id])


    useEffect(() => {
        // console.log("IssueList rendered with issues:", issue.issues);
    }, [issue.issues]);  // Ensure issues are part of the dependency array
    
  return (
    <div>
        <Dialog>
            <Card className="w-full md:w-[300px] lg:w-[310px]">
                <CardHeader>
                    <CardTitle>{title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                        {issue.issues?.filter((issue=>issue.status==status)).map((item)=><IssueCard projectId={id} item={item} key={item.id} />)}
                    </div>
                </CardContent>
                <CardFooter>
                    {
                        status=="pending" &&
                        <DialogTrigger>
                        <Button 
                        variant="outline" 
                        className="w-full flex items-center gap-2">
                            <PlusIcon/>
                            Add Tasks
                            </Button>
                    </DialogTrigger>
                    }
                </CardFooter>
            </Card>
            <DialogContent>
                <DialogHeader>Add Tasks</DialogHeader>
                <CreateIssueForm status={status} />
            </DialogContent>
        </Dialog>
    </div>
  )
}

export default IssueList