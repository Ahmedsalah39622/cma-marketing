import Header from '@/components/layout/header'
import { ReactNode } from 'react'

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      <main className="pt-16">{children}</main>
    </>
  )
}

export default Layout