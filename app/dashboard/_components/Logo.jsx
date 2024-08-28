import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Logo() {
  return (
    <Link href={'/'} className='flex items-center gap-2'>
        <Image src={'/logo.jpeg'} alt='logo'
        width={150} height={70} />
    </Link>
  )
}

export default Logo