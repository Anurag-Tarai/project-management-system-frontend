

import api from "@/config/api";
import * as actionTypes from "./ActionTypes"

export const createComment = (commentData)=>{
    return async (dispatch)=>{
        dispatch({type:actionTypes.CREATE_COMMENT_REQUESTS})
        try{
            const response = await api.post("/api/comments", commentData);
            console.log("comment created", response.data);
            
            dispatch({
                type: actionTypes.CREATE_COMMENT_SUCCESS,
                comments:response.data,
            })
        }catch(error){
            console.log(error);
            dispatch({
                type:actionTypes.CREATE_COMMENT_FAILURE,
                error:error.message
            })
            
        }
    }
}

export const deleteComment = (commentId)=>{
    return async (dispatch)=>{
        dispatch({type:actionTypes.DELETE_COMMENT_REQUESTS})
        try{
           await api.delete(`/api/comments/${commentId}`);
            
            dispatch({
                type: actionTypes.DELETE_COMMENT_SUCCESS,
                commentId
            })
        }catch(error){
            console.log("error", error);
            dispatch({
                type:actionTypes.DELETE_COMMENT_FAILURE,
                error:error.message
            })
            
        }
    }
}

export const fetchComments = (issueId)=>{
    return async (dispatch)=>{
        dispatch({type:actionTypes.FETCH_COMMENT_REQUESTS})
        try{
            const response = await api.get(`/api/comments/${issueId}`);

            dispatch({
                type: actionTypes.FETCH_COMMENT_SUCCESS,
                comments:response.data,
            })
            console.log("fetched comments", response.data);
            
        }catch(error){
            console.log(error);
            dispatch({
                type:actionTypes.FETCH_COMMENT_FAILURE,
                error:error.message
            })
            
        }
    }
}