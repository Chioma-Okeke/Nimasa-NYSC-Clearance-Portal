import { useWidth } from '@/hooks/use-width'
import React, { useEffect } from 'react'

function WidthChecker() {
    const width = useWidth()

    useEffect(() => {
        if (width < 1024) {
            
        }
    })
    return (
        <div>WidthChecker</div>
    )
}

export default WidthChecker