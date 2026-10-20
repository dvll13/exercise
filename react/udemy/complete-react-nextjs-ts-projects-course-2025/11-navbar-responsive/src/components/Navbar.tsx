import { useRef, useState } from 'react'
import logo from '../logo.svg'
import { links, social } from '../data'
import { FaBars } from 'react-icons/fa'

const Navbar: React.FC = () => {
  const [showLinks, setShowLinks] = useState(false)

  const linksContainerRef = useRef<HTMLDivElement>(null)
  const linksRef = useRef<HTMLUListElement>(null)

  const linksContainerStyles = {
    height: showLinks ? linksRef.current?.getBoundingClientRect().height : 0,
  }

  return (
    <nav>
      <div className="nav-center">
        <div className="nav-header">
          <img src={logo} alt="logo" className="logo" />
          <button className="nav-toggle" onClick={() => setShowLinks(!showLinks)}>
            <FaBars />
          </button>
        </div>

        {/* <div className={`links-container${showLinks ? ' show-container' : ''}`}> */}
        <div className="links-container" style={linksContainerStyles} ref={linksContainerRef}>
          <ul className="links" ref={linksRef}>
            {links.map((link) => (
              <li key={link.id}>
                <a href={link.url}>{link.text}</a>
              </li>
            ))}
          </ul>
        </div>

        <ul className="nav-social">
          {social.map((socialIcon) => (
            <li key={socialIcon.id}>
              <a href={socialIcon.url}>{socialIcon.icon}</a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
export default Navbar
