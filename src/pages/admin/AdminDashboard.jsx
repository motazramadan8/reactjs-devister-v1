import React, { useEffect } from 'react'
import "./admin.css"
import Footer from "../../components/footer/Footer"
import AdminSidebar from './AdminSidebar'
import AdminMain from './AdminMain'

const AdminDashboard = () => {
  useEffect(() => {
    window.scrollTo(0,0)
  }, [])
  return (
    <>
      <section className="admin-dashboard">
        <AdminSidebar />
        <AdminMain />
      </section>
      <Footer />
    </>
  )
}

export default AdminDashboard