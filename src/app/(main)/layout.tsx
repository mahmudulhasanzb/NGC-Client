import Footer from '@/components/layouts/Footer'
import Navbar from '@/components/layouts/Navbar'
import React from 'react'

const layout = ({children} : {children: React.ReactNode}) => {
  return (
    <main >
      <Navbar/>
      {children}
      <Footer/>
    </main>
  )
}

export default layout

