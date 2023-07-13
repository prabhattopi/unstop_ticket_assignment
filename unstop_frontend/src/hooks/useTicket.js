import { useContext } from "react"
import { TicketContext } from "../context/TicketContext"


const useTicket = () => {
   return useContext(TicketContext)
}

export default useTicket