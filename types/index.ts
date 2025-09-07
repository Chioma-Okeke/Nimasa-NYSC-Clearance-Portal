export interface IEmployee {
    id?: string
    name: string
    password: string
    department: string
    role: 'CORPS_MEMBER'|'SUPERVISOR'|'HOD'|'ADMIN'
}