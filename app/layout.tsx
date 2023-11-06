import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from './component/Navbar'
import LoginModal from './component/LoginModal'
import getCurrentUser from './libs/getCurrentUser'
import RegisterModal from './component/RegisterModal'
import EditModal from './component/EditModal'
import ToasterProvider from './component/ToasterProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const user = await getCurrentUser()
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToasterProvider/>
        <Navbar name={user?.name}/>
        <LoginModal/>
        <RegisterModal/>
        <EditModal currentUser={user}/>
        <div className=''>
          {children}
        </div>
     </body>
    </html>
  )
}
