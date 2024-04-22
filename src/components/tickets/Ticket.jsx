import { useEffect, useState } from "react"
import { getAllEmployees } from "../../services/employeeService.jsx"
import { assignTicket, updateTicket } from "../../services/ticketServices.jsx"

export const Ticket = ({ ticket, currentUser, getAndSetTickets }) => { //new component for individual ticket / Keys of the props object are passed here
    const [employees, setEmployees] = useState([]) // state to hold all employees
    const [assignedEmployee, setAssignedEmployee] = useState({}) // state to hold assigned employee

    useEffect(() => {
        getAllEmployees().then((employeeArray) => { //invoke getAllEmployees function to fetch all employees from database
            setEmployees(employeeArray) // set our employee state w/ the employee array we got back from the database
        })
    }, [])

    useEffect(() => { //to know when the employee state has a value since the above use effect is not instantanious 
        const foundEmployee = employees.find( //using the find method to set found employee
            (employee) => employee.id === ticket.employeeTickets[0]?.employeeId) //find employee where employee.id is === to employeeTicket of ticket at index 0 b/c if anything is in that array it will be at index 0 / .employee id // the ? (optional chain opperator) will try to evaluate ticket.employee ticket, if returns undefined, undefined will be returned
        setAssignedEmployee(foundEmployee) // set assignedemployee to found employee
    }, [employees, ticket]) //watching for when employees state changes (after they are set), also running again if ticket changes

    const handleClaim = () => {
        const currentEmployee = employees.find(employee => employee.userId === currentUser.id)

        const newEmployeeTicket = {
            employeeId: currentEmployee.id,
            serviceTicketId: ticket.id,
        }
        assignTicket(newEmployeeTicket).then(() => {
            getAndSetTickets()
        })
    }

    const handleClose = () => {
        const closedTicket = {
            id: ticket.id,
            userId: ticket.userId,
            description: ticket.description,
            emergency: ticket.emergency,
            dateCompleted: new Date(),
        }
        updateTicket(closedTicket).then(() => {
            getAndSetTickets()
        })
    }



    //? if there is, continue / : if there is not, post this "" / b/c assignedEmployee has a value of an empty object, if the proprty does not exist we'll get undefined, but we cannot access a property on an undefined
    return (
        <section className="ticket">
            <header className="tickets-info">#{ticket.id}</header>
            <div>{ticket.description}</div>
            <footer>
                <div>
                    <div className="ticket-info">assignee</div>
                    <div>
                        {assignedEmployee ? assignedEmployee.user?.fullName : "None"}
                    </div>

                </div>
                <div>
                    <div className="ticket-info">emergency</div>
                    <div>{ticket.emergency ? "yes" : "no"}</div>
                </div>
                <div className="btn-container">
                    {currentUser.isStaff && !assignedEmployee ? (
                        <button className="btn btn-secondary" onClick={handleClaim}>Claim</button>
                    ) : (
                        ""
                    )}
                    {assignedEmployee?.userId === currentUser.id &&
                        !ticket.dateCompleted ? (
                        <button className="btn btn-warning" onClick={handleClose}>Close</button>
                    ) : (
                        ""
                    )}
                </div>
            </footer>
        </section>
    )
}