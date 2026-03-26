"use client"
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SignInButton, Show, UserButton, useUser } from "@clerk/nextjs";


const navItems = [
  { label: "Library", href: "/"},
  { label: "Add New", href: "/books/new"}
]
const Navbar = () => {
  const pathName = usePathname()
  const data = useUser()
  const name = data.user?.firstName || data.user?.username || "User"
  // console.log("data: ", data)
  return (
    <header className="w-full fixed z-50 bg-('--primary')">
      <div className='navbar-height wrapper py-4 flex justify-between items-center'>
        <Link href="/" className='flex gap-0.5 items-center'>
        <Image src="./globe.svg" alt="Bookified Logo" width={42} height={26}/>
        <span className='logo-text'>Bookified</span>
        </Link>
        <nav className='w-fit flex gap-7 items-center'>
          {navItems.map(({label, href})=> {
            const isActive = pathName === href || (href !== "/" && pathName.startsWith(href))
            return (
              <Link key={label} href={href} className={cn('nav-link-base', isActive ? 'nav-link-active' : 'text-black hover:opacity-70')}>
                {label}
              </Link>
            )
          })}
        <div className='flex gap-7 items-center'>
          <Show when="signed-out" >
            <SignInButton />
            {/* <SignUpButton /> */}
          </Show>
          <Show when="signed-in">
            <div className='nav-user-link'>
              <UserButton />
            </div>
            {name && (<Link href={'/subscribe'} className='nav-user-name'>{name}</Link>)}
          </Show>
        </div>
        </nav>
      </div>
    </header>
  )
}

export default Navbar
