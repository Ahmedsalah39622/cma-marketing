
import Header from '@/components/layout/header'
import { ReactNode } from 'react'
import { LanguageProvider } from '@/context/LanguageContext';


const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <LanguageProvider>
      <Header />
      <main className="pt-16">{children}</main>
    </LanguageProvider>
  )
}

export default Layout