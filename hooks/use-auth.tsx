import { useQueryClient } from '@tanstack/react-query'
import React from 'react'

export const useAuth = () => {
  const queryClient = useQueryClient()
  
  return (
    <div>useAuth</div>
  )
}

export default useAuth