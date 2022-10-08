import Link from "next/link"



export default ({currentUser}) => {

  const links = [
    !currentUser && {label: "Sign Up", href: "/auth/signup"},
    !currentUser && {label: "Sign In", href: "/auth/signin"},
    currentUser && {label: "Sign Out", href: "/auth/signout"}
  ]
    .filter(link => link)
    .map((link) => {
      return <li key={link.label} className="nav-item">
        <Link href={link.href}>
          <a className="nav-link">
            {link.label}
          </a>
        </Link>
      </li>
    })

  return (
    <nav className="navbar navbar-light bg-light">
        <Link href="/">
          <a className="navbar-brand">GitTix</a>
        </Link>
        <div className="d-flex justify-content-end">
          <ul className="nav d-flex align-items-center">
            {links}
          </ul>
        </div>
    </nav>
  )
}
