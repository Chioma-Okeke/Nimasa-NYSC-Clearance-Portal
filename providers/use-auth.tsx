import { getCurrentUserQueryOpt } from '@/lib/query-options/employee'
import EmployeeService from '@/services/employee-service'
import { useRouter } from '@bprogress/next'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export const useAuth = () => {
  const queryClient = useQueryClient()
  const {data: employee, isError, isLoading} = useQuery(getCurrentUserQueryOpt)
  const router = useRouter();

  const {mutate, isPending: isLoggingOut, isError: isLogoutError, error: logoutError} = useMutation({
    mutationFn: async () => {
      await new EmployeeService().logout();
    },
    onSuccess: async () => {
      localStorage.removeItem("corper_details")
      toast.success("Logout Successful", {
        description: "You have been logged out successfully."
      })
      await queryClient.removeQueries(getCurrentUserQueryOpt)
      router.push('/login')
    },
    onError: (error) => {
      toast.error("Logout Failed" , {
        description: error.message || "An error occurred during logout. Please try again."
      })
    }
  })
  
  return {
    employee,
    isLoading,
    isError,
    logoutUser: mutate,
    isLoggingOut,
    isLogoutError,
    logoutError,
  }
}

export default useAuth