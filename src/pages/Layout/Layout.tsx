import { Outlet } from "react-router";
import { Header } from "@/components/Header";


export default function Layout() {
  return (
    <>
      <Header />
      <div className="container mx-auto px-2">
        <Outlet />
      </div>
    </>
  )
}