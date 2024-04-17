import { useEffect, useState } from "react"
import { getStaffUsers } from "../../services/userService.jsx"
import { User } from "../../users/User.jsx"
import { Link } from "react-router-dom"
import "./Employees.css"

export const EmployeeList = () => { // created EmployeesList component
    const [employees, setEmployees] = useState([]) //created state variable, employees, to store the employees using the function setEmployees

    useEffect(() => { // useEffect hook to get employees on the initial render (empty array) / the function passed invokes getStaffUsers from the user services modules, and, upon return, passes employeeArray as parameter. setEmployee function from the useState is then invoked and the employeeArray is passed into it as an argument
        getStaffUsers().then((employeeArray) => {
            setEmployees(employeeArray)
        })
    }, [])

    //employees are maped and for every employee object  the User component is rendered. The employee object is passed as a prop (an argument to a react component in the for of an object)
    return (
        <div className="employees">
            {employees.map((employeeObj) => {
                return (
                    <Link to={`/employees/${employeeObj.id}`} key={employeeObj.id}>
                        <User user={employeeObj} />
                    </Link>
                )

            })}

        </div>
    )
}