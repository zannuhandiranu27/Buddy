
import NavbarLogin from "../components/NavbarLogin"
import SideNavbar from "../components/SideNavbar"

function DashboardLayout({ children }) {
  return (
    <>
      <section className="dashboard-layout">
        <NavbarLogin />
        {children}
      </section>
    </>
  )
}



export default DashboardLayout