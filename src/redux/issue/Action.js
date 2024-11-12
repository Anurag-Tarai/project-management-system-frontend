

import api from "@/config/api";
import * as actionTypes from "./ActionTypes"

export const fetchIssue = (id)=>{
    return async (dispatch)=>{
        dispatch({type:actionTypes.FETCH_ISSUE_REQUESTS})
        try{
            const response = await api.get(`/api/issues/project/${id}`);
            console.log("fetched issues", response.data);
            
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
           const response = await api.delete(`/api/issues/${id}`);
            
            dispatch({
                type: actionTypes.FETCH_ISSUE_BY_ID_SUCCESS,
                issues: response.data
            })
        }catch(error){
            console.log("error", error);
            dispatch({
                type:actionTypes.FETCH_ISSUE_BY_ID_FAILURE,
                error:error.message
            })
            
        }
    }
}

export const udpdateIssueStatus = ({id, status})=>{
    return async (dispatch)=>{
        dispatch({type:actionTypes.UDPATE_ISSUE_STATUS_REQUESTS})
        try{
            const response = await api.get(`/api/issues/${id}/status/${status}`);
            console.log("update issue status", response.data);
            dispatch({
                type: actionTypes.UDPATE_ISSUE_STATUS_SUCCESS,
                comments:response.data,
            })
            
        }catch(error){
            console.log(error);
            dispatch({
                type:actionTypes.UDPATE_ISSUE_STATUS_FAILURE,
                error:error.message
            })
            
        }
    }
}

export const assignedUserToIssue = ({issueId, userId})=>{
    return async (dispatch)=>{
        dispatch({type:actionTypes.ASSIGNED_ISSUE_TO_USER_REQUESTS})
        try{
            const response = await api.get(`/api/issues/${issueId}/assignee/${userId}`);
            console.log("assigned issue---", response.data);
            dispatch({
                type: actionTypes.ASSIGNED_ISSUE_TO_USER_SUCCESS,
                comments:response.data,
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