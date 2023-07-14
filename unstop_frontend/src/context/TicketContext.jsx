import { createContext, useEffect, useState } from "react";
import api from "../api/api";
import { toast } from 'react-toastify';
export const TicketContext=createContext()

export const TicketContextProvider=({children})=>{

  const [tickets,setTickets]=useState([])
  const [currentData,setCurrentData]=useState([])
  const [toastMessage,setToastMessage]=useState("")
  const [reset,setReset]=useState(false)
  const [update,setUpdate]=useState(0)
  const [loading,setLoading]=useState(false)
  const [remaining,setRemaining]=useState([])

  const getData=async()=>{
     if(tickets.length==0){
         setLoading(true)
     }
      let res=await api.get("/ticket")
      setRemaining(res.data.filter(e=>e.status==false))
      let map=new Map()
      for(let key of res.data){
          if(!map.has(key.row)){
              map.set(key.row,[key])
          }
          else{
              let dummy=map.get(key.row)
              dummy.push(key)
              map.set(key.row,dummy)
          }
      }
      let arr=[]
      for(let [key,value] of map){
       arr.push({row:key,numbers:value})
      }
   
    setTickets(arr)
  
    setLoading(false)
  

  }
  const handleFunction=async(obj)=>{
      console.log(obj)
      try{
        let response=await api.put(`/ticket/${obj._id}`,{...obj,status:false})
        console.log(response)

        if(response.status=="200"){
          
            toast.success(response.data.message||'Ticket create successfully', {
                position: toast.POSITION.TOP_RIGHT, // Change the position of the toast
                autoClose: 3000, // Auto-close the toast after 3000 milliseconds (3 seconds)
                hideProgressBar:false, // Hide the progress bar
              });
 
           setUpdate(obj.seat_no)

        }
        else{
            toast.error(response.data.message||'Failed to Booked ticket', {
                position: toast.POSITION.TOP_RIGHT, // Change the position of the toast
                autoClose: 3000, // Auto-close the toast after 3000 milliseconds (3 seconds)
                hideProgressBar:false, // Hide the progress bar
              });
        }

 
      }
      catch(err){
        toast.error(err.response.data.message||'Failed to create Post', {
            position: toast.POSITION.TOP_RIGHT, // Change the position of the toast
            autoClose: 3000, // Auto-close the toast after 3000 milliseconds (3 seconds)
            hideProgressBar:false, // Hide the progress bar
          });
      }
   
    };


  const handleReset=async()=>{
      try{
          let response=await api.post("/ticket/reset",{})
          toast.success(response.data.message||'Ticket create successfully', {
            position: toast.POSITION.TOP_RIGHT, // Change the position of the toast
            autoClose: 3000, // Auto-close the toast after 3000 milliseconds (3 seconds)
            hideProgressBar:false, // Hide the progress bar
          });
          setReset(!reset)
          setCurrentData([])

      }
      catch(err){
        toast.error(err.response.data.message||'Failed to create Post', {
            position: toast.POSITION.TOP_RIGHT, // Change the position of the toast
            autoClose: 3000, // Auto-close the toast after 3000 milliseconds (3 seconds)
            hideProgressBar:false, // Hide the progress bar
          });
      }
      


  }

  useEffect(()=>{
  
        getData()
      

  },[currentData,reset,update])

  
    const value={
        tickets,
        setCurrentData,
        currentData,
        toastMessage,
        setToastMessage,
        handleFunction,
        handleReset,
        loading,
        remaining
    }

    return (
        <TicketContext.Provider value={value}>
            {children}
        </TicketContext.Provider>
    )

}