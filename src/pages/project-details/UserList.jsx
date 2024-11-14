import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { assignedUserToIssue } from "@/redux/issue/Action";
import { store } from "@/redux/Store";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const UserList = ({ issueDetails }) => {
  const { project } = useSelector((store) => store);
  const dispatch = useDispatch();

  const handleAssignIssueToUser = (userId)=>{
    dispatch(assignedUserToIssue({issueId:issueDetails.id, userId }))
  }
  return (
    <div className="space-y-2">
      <div className="border rounded-md">
        <p className="py-2 px-3">
          {issueDetails.assignee?.username
            || "Unassigned"
            }
        </p>
      </div>

      {project.projectDetails?.team.map((item) => (
        <div
          onClick={()=>handleAssignIssueToUser(item.id)}
          key={item.id}
          className="py-2 group hover:bg-slate-800 cursor-pointer flex items-center space-x-4 rounded-md border px-4"
        >
          <Avatar>
            <AvatarFallback>{item.username[0]}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <p className="test-sm leading-none">{item.username}</p>
            <p className="test-sm text-muted-foreground">
              @{item.username.toLowerCase()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserList;
