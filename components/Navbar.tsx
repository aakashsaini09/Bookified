import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <header className="w-full fixed z-50 bg-('--primary')">
      <div className='navbar-height wrapper py-4 flex justify-between items-center'>
        <Link href="/" className='flex gap-0.5 items-center'>
        <Image src="./globe.svg" alt="Bookified Logo" width={42} height={26}/>
        <span className='logo-text'>Bookified</span>
        </Link>
        <nav className='w-fit flex gap-7'></nav>
      </div>
    </header>
  )
}

export default Navbar
