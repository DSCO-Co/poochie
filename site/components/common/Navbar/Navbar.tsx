import { FC, useState } from 'react'
import Link from 'next/link'
import s from './Navbar.module.css'
import NavbarRoot from './NavbarRoot'
import { Logo, Container } from '@components/ui'
import { Searchbar, UserNav, FreeShippingBanner } from '@components/common'

interface Link {
  href: string
  label: string
}

interface NavbarProps {
  links?: Link[]
}

const Navbar: FC<NavbarProps> = ({ links }) => {
  const [showSearchBar, setShowSearchBar] = useState(false)

  return (
    <NavbarRoot>
      <div className=" h-[44px] relative z-50">
        <FreeShippingBanner />
      </div>
      <Container clean className="mx-auto max-w-8xl px-6">
        <div className={s.nav}>
          <div className="flex items-center flex-1">
            <Link href="/" className={s.logo} aria-label="Logo">
              <Logo />
            </Link>
          </div>
          {/* Bottom row of links */}
          <nav className={s.navMenu}>
            <Link href="/search" className={s.link}>
              All
            </Link>
            {links?.map((l) => (
              <Link href={l.href} key={l.href} className={s.link}>
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center justify-end flex-1 space-x-8">
            {process.env.COMMERCE_SEARCH_ENABLED && (
              <div className="flex justify-center items-center">
                <button
                  onClick={() =>
                    setShowSearchBar((prevShowSearchBar) => !prevShowSearchBar)
                  }
                >
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    />
                  </svg>
                </button>
              </div>
            )}
            <UserNav />
          </div>
        </div>
        {process.env.COMMERCE_SEARCH_ENABLED && (
          <div className="flex pb-4 lg:px-6 lg:hidden">
            <Searchbar id="mobile-search" />
          </div>
        )}
        {/* Desktop search bar */}
        {process.env.COMMERCE_SEARCH_ENABLED && (
          <div className="flex justify-center mb-4">
            <div className="justify-center w-[320px] hidden lg:flex">
              {showSearchBar && <Searchbar />}
            </div>
          </div>
        )}
      </Container>
    </NavbarRoot>
  )
}

export default Navbar
