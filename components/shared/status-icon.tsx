import { AlertCircle, CheckCircle, Clock, XCircle } from 'lucide-react';
import React from 'react'

function StatusIcon({ status }: { status: string }) {
    switch (status) {
        case 'APPROVED': return <CheckCircle className="w-5 h-5 text-green-600" />;
        case 'REJECTED': return <XCircle className="w-5 h-5 text-red-600" />;
        case 'PENDING_SUPERVISOR':
        case 'PENDING_HOD':
        case 'PENDING_ADMIN': return <Clock className="w-5 h-5 text-orange-500" />;
        default: return <AlertCircle className="w-5 h-5 text-gray-500" />;
    }
}

export default StatusIcon