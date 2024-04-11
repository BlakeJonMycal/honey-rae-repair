export const getAllEmployees = () => {
    return fetch(`http://localhost:8088/employees?_expand=user`).then(res => res.json()) // expand employee to user, expand when what you are looking at on the original fetch is a FK to something else, FK to PK
}