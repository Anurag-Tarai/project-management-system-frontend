
import api from "@/config/api";
import { ACCEPT_INVITATION_REQUESTS, ACCEPT_INVITATION_SUCCESS, CREATE_PROJECTS_REQUESTS, CREATE_PROJECTS_SUCCESS, DELETE_PROJECTS_REQUESTS, DELETE_PROJECTS_SUCCESS, FETCH_PROJECTS_BY_ID_REQUESTS, FETCH_PROJECTS_BY_ID_SUCCESS, FETCH_PROJECTS_REQUESTS, FETCH_PROJECTS_SUCCESS, INVITE_TO_PROJECTS_REQUESTS, INVITE_TO_PROJECTS_SUCCESS, SEARCH_PROJECTS_REQUESTS, SEARCH_PROJECTS_SUCCESS } from "./ActionTypes";

export const fetchProjects=({category, tags})=>async (dispatch)=>{
    dispatch({type:FETCH_PROJECTS_REQUESTS})
    try{
        const {data} = await api.get("/api/projects",{params:{category, tags}})
        console.log("all projects", data);
        dispatch({type:FETCH_PROJECTS_SUCCESS, projects:data})

    }catch(error){
        console.log("error", error);
        
        
    }
}

export const searchProjects=(keyword)=>async (dispatch)=>{
    dispatch({type:SEARCH_PROJECTS_REQUESTS})
    try{
        const {data} = await api.get("/api/projects/search/keyword?="+keyword)
        console.log("search projects", data);
        dispatch({type:SEARCH_PROJECTS_SUCCESS, projects:data})

    }catch(error){
        console.log("error", error);
        
        
    }
}

export const createProject=(projectData)=>async (dispatch)=>{
    dispatch({type:CREATE_PROJECTS_REQUESTS})
    try{
        console.log("create project data", projectData);
        
        const {data} = await api.post("/api/projects/create-project", projectData)
        console.log("create project after created", data);
        dispatch({type:CREATE_PROJECTS_SUCCESS, projects:data})

    }catch(error){
        console.log("error", error);
        
        
    }
}

export const fetchProjectById=(id)=>async (dispatch)=>{
    dispatch({type:FETCH_PROJECTS_BY_ID_REQUESTS})
    try{
        const {data} = await api.get("/api/projects"+id)
        console.log("projects", data);
        dispatch({type:FETCH_PROJECTS_BY_ID_SUCCESS, projects:data})

    }catch(error){
        console.log("error", error);
        
        
    }
}

export const deleteProject=({projectId})=>async (dispatch)=>{
    dispatch({type:DELETE_PROJECTS_REQUESTS})
    try{
        const {data} = await api.delete("/api/projects"+projectId)
        console.log("delete projects", data);
        dispatch({type:DELETE_PROJECTS_SUCCESS, projectId})

    }catch(error){
        console.log("error", error);
        
        
    }
}

export const inviteToProject=({email,projectId})=>async (dispatch)=>{
    dispatch({type:INVITE_TO_PROJECTS_REQUESTS})
    try{
        const {data} = await api.delete("/api/projects/invite",{email, projectId})
        console.log("invite to projects", data);
        dispatch({type:INVITE_TO_PROJECTS_SUCCESS, payload:data})

    }catch(error){
        console.log("error", error);
        
        
    }
}


export const acceptInvitation=({invitationToken,navigate})=>async (dispatch)=>{
    dispatch({type:ACCEPT_INVITATION_REQUESTS})
    try{
        const {data} = await api.delete("/api/projects/accept_invitation",{
            params:{
                token:invitationToken
            }
        })
        navigate("/project"+data.projectId)
        console.log("invite to projects", data);
        dispatch({type:ACCEPT_INVITATION_SUCCESS, payload:data})

    }catch(error){
        console.log("error", error);
        
        
    }
}