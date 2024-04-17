export const getEmployeeByUserId = () => {
    return fetch(`http://localhost:8088/employees?userId=4&_expand=user&_embed=employeeTickets`).then((res) => res.json()) // expand employee to user, expand when what you are looking at on the original fetch is a FK to something else, FK to PK
}
export const getAllEmployees= () => {
    return fetch(`http://localhost:8088/employees`).then((res) => res.json()) // expand employee to user, expand when what you are looking at on the original fetch is a FK to something else, FK to PK
}