'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface ContactContextType {
  isContactOpen: boolean
  openContact: () => void
  closeContact: () => void
  toggleContact: () => void
}

const ContactContext = createContext<ContactContextType | undefined>(undefined)

export function ContactProvider({ children }: { children: ReactNode }) {
  const [isContactOpen, setIsContactOpen] = useState(false)
  
  const openContact = () => setIsContactOpen(true)
  const closeContact = () => setIsContactOpen(false)
  const toggleContact = () => setIsContactOpen(prev => !prev)
  
  return (
    <ContactContext.Provider 
      value={{ 
        isContactOpen, 
        openContact, 
        closeContact, 
        toggleContact 
      }}
    >
      {children}
    </ContactContext.Provider>
  )
}

export function useContact() {
  const context = useContext(ContactContext)
  
  if (context === undefined) {
    throw new Error('useContact must be used within a ContactProvider')
  }
  
  return context
} 