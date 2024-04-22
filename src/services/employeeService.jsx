export const getEmployeeByUserId = (Userid) => {
    return fetch(`http://localhost:8088/employees?userId=${Userid}&_expand=user&_embed=employeeTickets`).then((res) => res.json()) // expand employee to user, expand when what you are looking at on the original fetch is a FK to something else, FK to PK
}
export const getAllEmployees = () => {
    return fetch(`http://localhost:8088/employees?_expand=user`).then((res) => res.json()) // expand employee to user, expand when what you are looking at on the original fetch is a FK to something else, FK to PK
}

export const updateEmployee = (employee) => {
    return fetch(`http://localhost:8088/employees/${employee.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(employee),
    }).then((res) => res.json())
}