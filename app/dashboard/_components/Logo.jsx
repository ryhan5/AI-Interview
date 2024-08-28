import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Logo() {
  return (
    <Link href={'/dashboard'} className='flex items-center gap-2'>
        <Image src={'/logo.svg'} alt='logo'
        width={70} height={70} />
    </Link>
  )
}

export default Logo