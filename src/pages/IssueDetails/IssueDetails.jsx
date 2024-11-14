import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useParams } from "react-router-dom";
import CreateCommentForm from "./CreateCommentForm";
import CommentCard from "./CommentCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchIssueById, udpdateIssueStatus } from "@/redux/issue/Action";
import { store } from "@/redux/Store";
import { fetchComments } from "@/redux/comment/Action";

const IssueDetails = () => {
  const { projectId, issueId } = useParams();

  const { issue, comment } = useSelector((store) => store);

  const dispatch = useDispatch();

  const handleUdateIssueStatus = (status) => {
    // console.log(status);
    dispatch(udpdateIssueStatus({ issueId, status }));
  };

  useEffect(() => {
    dispatch(fetchIssueById(issueId));
    dispatch(fetchComments(issueId));
  }, [issueId]);

  return (
    <div className="px-20 py-8 text-gray-400">
      <div className="flex justify-between border p-10 rounded-lg ">
        <ScrollArea className="h-[80vh] w-[60%]">
          <div>
            <h1 className="text-lg font-semibold text-gray-300">
              {issue.issueDetails?.title}
            </h1>
            <div className="py-5">
              <h2 className="font-semibold text-gray-400">Description</h2>
              <p className="text-gray-400 text-sm mt-3">
                {issue.issueDetails?.description}
              </p>
            </div>
            <div className="mt-5">
              <h1 className="pb-3">Activity</h1>
              <Tabs defaultValue="comments" className="w-[400px]">
                <TabsList className="mb-5">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="comments">Comments</TabsTrigger>
                  <TabsTrigger value="history">History</TabsTrigger>
                </TabsList>
                <TabsContent value="all">
                  all make changes to your account here
                </TabsContent>
                <TabsContent value="history">
                  history change your password
                </TabsContent>
                <TabsContent value="comments">
                  <CreateCommentForm issueId={issueId} />
                  <div className="mt-8 space-y-6 items-start">
                    {comment.comments
                      ?.slice()
                      .reverse()
                      .map((item) => (
                        <CommentCard item={item} key={item.id} />
                      ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </ScrollArea>
        <div className="w-full lg:w-[30%] space-y-2">
          <Select onValueChange={handleUdateIssueStatus}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="to do" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">To do</SelectItem>
              <SelectItem value="in_progress">In progress</SelectItem>
              <SelectItem value="done">Done</SelectItem>
            </SelectContent>
          </Select>
          <div className="border rounded-lg">
            <p className="border-b py-3 px-5">Details</p>
            <div className="p-5">
              <div className="space-y-7">
                <div className="flex gap-10 items-center">
                  <p className="w-[7rem]">Assignee</p>
                  {issue.issueDetails?.assignee ? (
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>
                          {issue.issueDetails?.assignee?.username[0]}
                        </AvatarFallback>
                      </Avatar>
                      <p className="h-8 w-8 text-xs">
                        {issue.issueDetails?.assignee?.username}
                      </p>
                    </div>
                  ) : (
                    <p>Unassigned</p>
                  )}
                </div>
                <div className="flex gap-10 items-center">
                  <p className="w-[7rem]">Labels</p>
                  <p>None</p>
                </div>
                <div className="flex gap-10 items-center">
                  <p className="w-[7rem]">Status</p>
                  <Badge>{issue?.issueDetails?.status}</Badge>
                </div>
                <div className="flex gap-10 items-center">
                  <p className="w-[7rem]">Realese</p>
                  <Badge>11-11-2024</Badge>
                </div>
                <div className="flex gap-10 items-center">
                  <p className="w-[7rem]">Reporter</p>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>A</AvatarFallback>
                    </Avatar>
                    <p className="h-8 w-8 text-xs">Rabin Dulani</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueDetails;
