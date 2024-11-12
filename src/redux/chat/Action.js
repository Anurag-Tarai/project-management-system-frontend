

import api from "@/config/api";
import * as actionTypes from "./ActionType"

export const sendMessage = (messageData)=>{
    return async (dispatch)=>{
        dispatch({type:actionTypes.SEND_MESSAGE_REQUESTS})
        try{
            const response = await api.post("/api/message/send", messageData);
            dispatch({
                type: actionTypes.SEND_MESSAGE_SUCCESS,
                messages:response.data,
            })
        }catch(error){
            console.log(error);
            dispatch({
                type:actionTypes.SEND_MESSAGE_FAILURE,
                error:error.message
            })
            
        }
    }
}

export const fetchChatByProject = (projectId)=>{
    return async (dispatch)=>{
        dispatch({type:actionTypes.FETCH_CHAT_BY_PROJECT_REQUESTS})
        try{
            const response = await api.get(`/api/projects/${projectId}/chat`);
            console.log("fetch chat ", response.data);
            
            dispatch({
                type: actionTypes.FETCH_CHAT_BY_PROJECT_SUCCESS,
                messages:response.data,
            })
        }catch(error){
            console.log(error);
            dispatch({
                type:actionTypes.FETCH_CHAT_BY_PROJECT_FAILURE,
                error:error.message
            })
            
        }
    }
}

export const fetchChatMessages = (chatId)=>{
    return async (dispatch)=>{
        dispatch({type:actionTypes.FETCH_CHAT_MESSAGE_REQUESTS})
        try{
            const response = await api.get(`/api/message/chat/${chatId}`);
            console.log("fetch messages", response.data);

            dispatch({
                type: actionTypes.FETCH_CHAT_BY_PROJECT_SUCCESS,
                chatId,
                messages:response.data,
            })
        }catch(error){
            console.log(error);
            dispatch({
                type:actionTypes.FETCH_CHAT_BY_PROJECT_FAILURE,
                error:error.message
            })
            
        }
    }
}