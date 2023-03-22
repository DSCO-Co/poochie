import { Children, FC, useState } from 'react'
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

import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function DropDownMenu({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Menu
      as="div"
      className="relative inline-block text-left"
      onMouseEnter={() => setIsMenuOpen(true)}
      onMouseLeave={() => setIsMenuOpen(false)}
    >
      <div>
        <Menu.Button className="flex items-center pb-2 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
          {children}
        </Menu.Button>
      </div>

      <Transition
        show={isMenuOpen}
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block px-4 py-2 text-sm"
                  )}
                >
                  Account settings
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block px-4 py-2 text-sm"
                  )}
                >
                  Support
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block px-4 py-2 text-sm"
                  )}
                >
                  License
                </a>
              )}
            </Menu.Item>
            <form method="POST" action="#">
              <Menu.Item>
                {({ active }) => (
                  <button
                    type="submit"
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block w-full px-4 py-2 text-left text-sm"
                    )}
                  >
                    Sign out
                  </button>
                )}
              </Menu.Item>
            </form>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
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
              <DropDownMenu>
                <Link href={l.href} key={l.href} className={s.link}>
                  {l.label}
                </Link>
              </DropDownMenu>
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
        {/* Mobile search bar */}
        {process.env.COMMERCE_SEARCH_ENABLED && (
          <div className="flex pb-4 lg:px-6 lg:hidden">
            {showSearchBar && <Searchbar id="mobile-search" />}
          </div>
        )}
        {/* Desktop search bar */}
        {process.env.COMMERCE_SEARCH_ENABLED && (
          <div className="flex justify-center pb-4">
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
