import NavSearchBar from "./NavSearchBar";
import LinksDropdown from "./LinksDropdown";
import LightDarkMode from "./LightDarkMode";
import Logo from "./Logo";

const Navbar = () => {
  return (
    <nav className="border-b">

      <div className="container py-8 flex flex-col sm:flex-row sm:justify-between sm:items-center flex-wrap gap-4">


        <Logo />

        <NavSearchBar />


        <div className="flex gap-4 items-center">

          <LightDarkMode />

          <LinksDropdown />

        </div>


      </div>

    </nav>
  )
}

export default Navbar;