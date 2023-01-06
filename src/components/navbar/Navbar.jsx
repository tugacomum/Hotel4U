import "./navbar.css"

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navContainer">
        <span className="logo">Hotel4U</span>
        <div className="navItems">
          <button className="navButton">Sign Up</button>
          <button className="navButton">Sign In</button>
        </div>
      </div>
    </div>
  )
}

export default Navbar