import { Outlet } from "react-router-dom";

import NavBar from "../components/nav/NavBar";
import { Footer } from "../components/footer/Footer";
/**
 * Setup router for website
 * @returns 
 */
export default function Layout() {
    return(
        <>
            <header className="relative">
				<NavBar />
			</header>
            <Outlet />
            <Footer />
        </>
    )
}