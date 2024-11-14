

import api from "@/config/api";
import * as actionTypes from "./ActionType"

export const sendMessage = (messageData) => {
    return async (dispatch, getState) => {
      dispatch({ type: actionTypes.SEND_MESSAGE_REQUESTS });
      try {
        const response = await api.post("/api/message/send", messageData);
        
        // Add sender details using the current authenticated user (auth state)
        const { auth } = getState();
        const messageWithSender = {
          ...response.data,
          sender: { 
            id: auth.user?.id, 
            username: auth.user?.username 
          },
        };
  
        dispatch({
          type: actionTypes.SEND_MESSAGE_SUCCESS,
          message: messageWithSender, // Include the sender details
        });
  
        console.log("message sent", messageWithSender);
      } catch (error) {
        console.log(error);
        dispatch({
          type: actionTypes.SEND_MESSAGE_FAILURE,
          error: error.message,
        });
      }
    };
  };
  

export const fetchChatByProject = (chatId)=>{
    return async (dispatch)=>{
        dispatch({type:actionTypes.FETCH_CHAT_BY_PROJECT_REQUESTS})
        try{
            const response = await api.get(`/api/projects/${chatId}/chat`);
            console.log("fetch chat ", response.data);
            
            dispatch({
                type: actionTypes.FETCH_CHAT_BY_PROJECT_SUCCESS,
                chat:response.data,
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
            console.log("chat id=============",chatId);
            const response = await api.get(`/api/message/chat/${chatId}`);
            console.log("fetch chat messages", response.data);

            dispatch({
                type: actionTypes.FETCH_CHAT_MESSAGE_SUCCESS,
                chatId,
                messages:response.data,
            })
        }catch(error){
            console.log(error);
            dispatch({
                type:actionTypes.FETCH_CHAT_MESSAGE_FAILURE,
                error:error.message
            })
            
        }
    }
}