import {create} from "zustand";
import toast from "react-hot-toast";
import axios from "axios";

import {useSocket} from "./useSocket";
// import {axiosInstance} from "../lib/axios";
const backendBaseUrl = "http://localhost:7000";
// const vercelurl="https://socialmedia-backend-2njs.onrender.com";
const vercelurl="https://friendsbookweb.up.railway.app";



export const useChatStore = create((set,get)=>({
    
    

    messages:[],
    users:[],
    selectedUser:null,
    isUsersLoading:false,
    isMessagesLoading:false,



    getUsers: async()=>{
        set({isUsersLoading: true});
        try{
          
            const token=localStorage.getItem('token');
            const res=await axios.get(`${vercelurl}/messages/getusers`,{
            
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
            
            set({users:res.data});

        }
        catch(e){
            toast.error(e.message || "error");
            set({ users: [] });

        }
        finally{
            set({isUsersLoading: false});
        }
    },

    getMessages: async(userId) => {
        set({isMessagesLoading: true});
        try{
            const token=localStorage.getItem('token');
            const res=await axios.get(`${vercelurl}/messages/get/${userId}`,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            });
      
            set({ messages: Array.isArray(res.data) ? res.data: [] });

        }
        catch(e){
            toast.error("error while getting messages!");
            set({ messages: [] }); 
        }
        finally{
            set({isMessagesLoading: false});
        }
    },

    sendMessages: async(messageData)=>{
        const {selectedUser,messages}=get();

        

        try{
            console.log("checking msg at star5t");
            console.log(messages);
            const token=localStorage.getItem('token');
            const res=await axios.post(`${vercelurl}/messages/send/${selectedUser._id}`,messageData,{
            
                headers: {
                  Authorization: `Bearer ${token}`,
                },

              });

       
            set({messages:[...messages,res.data]})

        }

        catch(e){
            toast.error("error sending the message");
        }
    },

    subscribeToMessages: (socket) => {
        const {selectedUser} = get();
        if(!selectedUser || !socket) return;

        socket.on("newMessage",(newMessage) => {
            const {messages} = get();
            set((state) => ({
                messages:[...messages,newMessage],
            })); 
        });

    }, 

    unsubscribeFromMessages:(socket) =>{
        socket?.off("newMessage");
    }, 

    //optimise this one later
    setSelectedUser:(selectedUser)=> set({selectedUser}),

    clearUsers: () => {
        set({ users: [], selectedUser: null });
        console.log("clearing Users");
        },
    clearMessages: () => set({ messages: [] })
    
}));