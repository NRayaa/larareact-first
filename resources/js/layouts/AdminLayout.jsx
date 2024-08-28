import Sidebar from '@/Components/Sidebar'
import { Link, usePage } from '@inertiajs/react'
import React from 'react'

const AdminLayout = ({children}) => {
   const {component} =  usePage()
   const { auth} = usePage().props
  return (
    <>
    <header className='bg-black text-white py-10'>
        <div className="mx-auto container">
            <div className="container">
                <div className="flex justify-between items-center">
                    <h2 className='Font-bold text-2xl'>TODO</h2>
                    <nav className='flex justify-between items-center grow ml-36'>
                        <div className="flex gap-6 items-center justify-start">
                                <Link href='/dashboard' className={`${component == "Dashboard" ? "font-semibold text-indigo-500" : ""}`}>Dashboard</Link>
                                <Link href='/todo' className={`${component == "Todo" ? "font-semibold text-indigo-500" : ""}`}>Todo</Link>
                        </div>
                    </nav>
                    <div className="">
                        <div className="">{auth.user.name}</div>
                    </div>
                </div>

            </div>
        </div>
    </header>

    <main className='mt-10'>
            {/* <Sidebar></Sidebar> */}
            <div className="container mx-auto">
            {children}
            </div>
    </main>
    </>
  )
}

export default AdminLayout
