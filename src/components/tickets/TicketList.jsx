import { useEffect, useState } from "react"
import { getAllTickets } from "../../services/ticketServices.jsx"
import "./Tickets.css"
import { Ticket } from "./Ticket.jsx"
import { TicketFilterBar } from "./TicketFilterBar.jsx"

export const TicketList = ({ currentUser }) => { //ticket list component
  const [allTickets, setAllTickets] = useState([])
  const [showEmergencyOnly, setShowEmergencyOnly] = useState(false)
  const [filteredTickets, setFilteredTickets] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  
const getAndSetTickets = () => {
  getAllTickets().then((ticketsArray) => {
    setAllTickets(ticketsArray)
  })
}

  useEffect(() => {
    getAndSetTickets()
  }, []) // ONLY runs on intial render of component 

  useEffect(() => {
    if (showEmergencyOnly) {
      const emergencyTickets = allTickets.filter((ticket) => ticket.emergency === true)
      setFilteredTickets(emergencyTickets)
    } else {
      setFilteredTickets(allTickets)
    }
  }, [showEmergencyOnly, allTickets])

  useEffect(() => {
    const foundTickets = allTickets.filter((ticket) => 
    ticket.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredTickets(foundTickets)
  }, [searchTerm, allTickets])



//jsx for ticket list
  return (<div className="tickets-container"> 
    <h2>Tickets</h2> 
  <TicketFilterBar setShowEmergencyOnly={setShowEmergencyOnly} setSearchTerm={setSearchTerm}/>
    <article className="tickets">
      {filteredTickets.map((ticketObj) => {
         return <Ticket ticket = {ticketObj} currentUser={currentUser} getAndSetTickets={getAndSetTickets} key={ticketObj.id}/> //rendered Ticket Component, for each ticketObject, return ticket component. passing a props object (Ticket is the key of the key vaule pairbeing passed, TicketObt is the value)
        //the key prop above is now placed on the outer most layer of what is being mapped 
      })}
    </article>
  </div>
  )
}