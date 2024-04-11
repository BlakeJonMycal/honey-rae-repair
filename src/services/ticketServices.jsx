export const getAllTickets = () => {
    return fetch("http://localhost:8088/serviceTickets?_embed=employeeTickets"). then((res) => res.json()) //embed employee tickets within service tickets. embed when what you are looking at a fk on something else, PK to FK
}