

import api from "@/config/api";
import * as actionTypes from "./ActionTypes"

export const fetchIssues = (id)=>{
    return async (dispatch)=>{
        dispatch({type:actionTypes.FETCH_ISSUE_REQUESTS})
        try{
            const response = await api.get(`/api/issues/project/${id}`);
            console.log("fetched issues------", response.data);
            
            dispatch({
                type: actionTypes.FETCH_ISSUE_SUCCESS,
                issues:response.data,
            })
        }catch(error){
            console.log(error);
            dispatch({
                type:actionTypes.FETCH_ISSUE_FAILURE,
                error:error.message
            })
            
        }
    }
}

export const fetchIssueById = (id)=>{
    return async (dispatch)=>{
        dispatch({type:actionTypes.FETCH_ISSUE_BY_ID_REQUESTS})
        try{
           const response = await api.get(`/api/issues/${id}`);
            
            dispatch({
                type: actionTypes.FETCH_ISSUE_BY_ID_SUCCESS,
                issueDetails: response.data
            })
            console.log("issue by id---", response.data);
            
        }catch(error){
            console.log("error", error);
            dispatch({
                type:actionTypes.FETCH_ISSUE_BY_ID_FAILURE,
                error:error.message
            })
            
        }
    }
}

export const udpdateIssueStatus = ({ issueId, status }) => {
    return async (dispatch) => {
        dispatch({ type: actionTypes.UDPATE_ISSUE_STATUS_REQUESTS });
        try {
            const response = await api.put(`/api/issues/${issueId}/status/${status}`);
            console.log("Updated issue status:", response.data);
            
            dispatch({
                type: actionTypes.UDPATE_ISSUE_STATUS_SUCCESS,
                issue: response.data, // Ensure the updated issue has the correct structure
            });
            
        } catch (error) {
            console.log("Error updating issue status:", error);
            dispatch({
                type: actionTypes.UDPATE_ISSUE_STATUS_FAILURE,
                error: error.message,
            });
        }
    };
};


export const deleteIssue = (issueId) => {
    return async (dispatch) => {
        dispatch({ type: actionTypes.DELETE_ISSUE_REQUESTS });
        try {
            // Sending a DELETE request to the API endpoint for the specific issue issudId
            await api.delete(`/api/issues/${issueId}`);
            
            // Dispatching success action if issue is deleted successfully
            dispatch({
                type: actionTypes.DELETE_ISSUE_SUCCESS,
                issueId, // Passing the deleted issue issudId in case you want to remove it from the state
            });

            console.log(`Issue with issudId ${issueId} deleted successfully.`);
            
        } catch (error) {
            console.log("Error while deleting issue", error);
            
            // Dispatching failure action if an error occurs during deletion
            dispatch({
                type: actionTypes.DELETE_ISSUE_FAILURE,
                error: error.message
            });
        }
    };
};

export const assignedUserToIssue = ({issueId, userId})=>{
    return async (dispatch)=>{
        dispatch({type:actionTypes.ASSIGNED_ISSUE_TO_USER_REQUESTS})
        try{
            const response = await api.put(`/api/issues/${issueId}/assignee/${userId}`);
            console.log("assigned issue---", response.data);
            dispatch({
                type: actionTypes.ASSIGNED_ISSUE_TO_USER_SUCCESS,
                issue:response.data,
            })
            
        }catch(error){
            console.log(error);
            dispatch({
                type:actionTypes.ASSIGNED_ISSUE_TO_USER_FAILURE,
                error:error.message
            })
            
        }
    }
}

export const createIssue = (issueData)=>{
    return async (dispatch)=>{
        dispatch({type:actionTypes.CREATE_ISSUE_REQUESTS})
        try{
            const response = await api.post(`/api/issues`, issueData);
            console.log("fetched issues", response.data);
            
            dispatch({
                type: actionTypes.CREATE_ISSUE_SUCCESS,
                issue:response.data,
            })
            console.log("issue created", response.data);
            
        }catch(error){
            console.log(error);
            dispatch({
                type:actionTypes.CREATE_ISSUE_FAILURE,
                error:error.message
            })
            
        }
    }
}
