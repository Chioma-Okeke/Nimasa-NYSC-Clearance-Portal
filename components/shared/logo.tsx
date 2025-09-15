import Image from 'next/image'
import React from 'react'

function Logo() {
    return (
        <div className="w-full aspect-[181/201] max-w-[50px] md:max-w-[80px] relative overflow-hidden">
            <Image src={"/company_logo.png"} alt="Logo" fill sizes="100vw" className="object-cover object-center" />
        </div>
    )
}

export default Logo