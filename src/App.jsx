import "./App.css"
import { CustomerList } from "./components/customers/CustomersList"
import { EmployeeList } from "./components/employees/EmployeesList"
import { TicketList } from "./components/tickets/TicketList"

export const App = () => { // rendered TicketList component
  return <>
  {/*<TicketList />*/} 
  {/*<CustomerList />*/}
  <EmployeeList />
  </>
}