"use client"
import React from 'react'
import Link from 'next/link'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="text-black pt-12 pb-8">
        <div className='bg-gray-900'></div>
     <div className=''>
        created wuth Resume Wizard
     </div>
    </footer>
  )
}

export default Footer