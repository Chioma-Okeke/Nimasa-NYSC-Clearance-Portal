import EmployeeService from "@/services/employee-service";
import { IEmployeeCreationResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

type AuthContextType = {
    employee: IEmployeeCreationResponse | null;
    login: (userData: IEmployeeCreationResponse) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [employee, setEmployee] = useState<IEmployeeCreationResponse | null>(null)
    const { data: user } = useQuery({
        queryKey: ['current-user'],
        queryFn: async () => {
            await new EmployeeService().getCurrentUser()
        }
    })

    useEffect(() => {
        const storedUser = localStorage.getItem("employee")
        if (storedUser) {
            setEmployee(JSON.parse(storedUser))
        }
        console.log("User data from query:", user)
    }, [user])


    useEffect(() => {
        if (employee) {
            localStorage.setItem("employee", JSON.stringify(employee))
        } else {
            localStorage.removeItem("employee")
            localStorage.removeItem("token")
            localStorage.removeItem("user")
        }
    }, [employee])

    const login = (userData: IEmployeeCreationResponse) => {
        setEmployee(userData)
    }

    const logout = () => {
        setEmployee(null)
    }

    return (
        <AuthContext.Provider value={{ employee, login, logout }}>
            {children}
        </AuthContext.Provider>
    )

}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) throw new Error("useAuth must be used within an AuthProvider")
    return context
}
