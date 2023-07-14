import {useState} from "react"
import api from "../api/api";
import { toast } from 'react-toastify';
import useTicket from '../hooks/useTicket'

const FormComponent=()=>{
    const [inputValue, setInputValue] = useState('');
    const {currentData,setCurrentData,}=useTicket()
   const {handleReset,remaining}=useTicket()
   console.log(remaining)
    const handleSubmit = async(e) => {
      e.preventDefault();

    
      try{
        let response=await api.post("/ticket",{seat_no:inputValue})
        console.log(response)
      
        if(response.status==200){
            setCurrentData(response.data.data)
            toast.success(response.data.message||'Ticket create successfully', {
                position: toast.POSITION.TOP_RIGHT, // Change the position of the toast
                autoClose: 3000, // Auto-close the toast after 3000 milliseconds (3 seconds)
                hideProgressBar:false, // Hide the progress bar
              });
              setInputValue('');

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
  
    const handleResetButton = () => {

        handleReset()
    };
  
    return (
      <div className="w-full bg-white rounded shadow-md p-6 h-auto">
          <div className="flex  flex-wrap justify-between justify-center">
        <div className="flex flex-col justify-between mb-4 gap-8">
            <div className="flex gap-4 items-center">
            <div className="bg-green-500 w-8 h-8 rounded-full"></div>
            <span className="font-bold">Available Seats</span>
            </div>
            <div className="flex gap-4 items-center">
            <div className="bg-red-500 w-8 h-8 bg-gray-300 rounded-full"></div>
            <span className="font-bold">Booked Seats</span>
            </div>
       
      
        </div>
        <div className="font-bold mr-8 text-lg flex flex-col justify-center items-center gap-2">
            <p>Total Remaining Seats</p>
            <p className="text-2xl">{remaining.length}</p>
        </div>
        </div>
        <p className="font-bold pb-2 pt-8">Current Booked Seats</p>
        <div className="flex gap-8 pb-4 text-white h-5">
            {
                currentData?.map(e=>(
                    <span key={e} className="flex justify-center items-center bg-red-500 rounded-full w-8 h-8">{e}</span>
                ))
            }
         
      
        </div>
        <p className="font-bold pb-4 pt-4">Type No of Seats</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full bg-gray-100 border border-gray-300 rounded px-4 py-2 mb-4"
            placeholder="Enter a value"
          />
          <div className="flex flex-col gap-4">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white rounded w-full px-4 py-2"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={handleResetButton}
              className="bg-gray-500 hover:bg-gray-600 text-white w-full rounded px-4 py-2"
            >
              Reset All
            </button>
          </div>
        </form>
      </div>
    );
}

export default FormComponent