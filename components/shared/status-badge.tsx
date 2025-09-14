import React from 'react'
import { Badge } from '../ui/badge'
import { CheckCircle, Clock, XCircle } from 'lucide-react'

function StatusBadge({status}: {
    status: string
}) {
  switch (status) {
      case "PENDING_SUPERVISOR":
        return (
          <Badge variant="secondary" className="bg-orange-100 text-orange-800 border-orange-200">
            <Clock className="h-3 w-3 mr-1" />
            Pending Supervisor
          </Badge>
        )
      case "PENDING_HOD":
        return (
          <Badge variant="secondary" className="bg-blue-100 text-blue-800 border-blue-200">
            <Clock className="h-3 w-3 mr-1" />
            Pending HOD
          </Badge>
        )
      case "PENDING_ADMIN":
        return (
          <Badge variant="secondary" className="bg-purple-100 text-purple-800 border-purple-200">
            <Clock className="h-3 w-3 mr-1" />
            Pending Admin
          </Badge>
        )
      case "APPROVED":
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
            <CheckCircle className="h-3 w-3 mr-1" />
            Approved
          </Badge>
        )
      case "REJECTED":
        return (
          <Badge variant="destructive">
            <XCircle className="h-3 w-3 mr-1" />
            Rejected
          </Badge>
        )
    }
}

export default StatusBadge