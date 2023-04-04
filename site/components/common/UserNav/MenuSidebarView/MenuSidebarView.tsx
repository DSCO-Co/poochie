import React, { useState } from 'react'
import Link from 'next/link'
import s from './MenuSidebarView.module.css'
import { useUI } from '@components/ui/context'
import SidebarLayout from '@components/common/SidebarLayout'
import type { Link as LinkProps } from './index'

export default function MenuSidebarView({
  links = [],
}: {
  links?: LinkProps[]
}) {
  const { closeSidebar } = useUI()
  const [expandedLink, setExpandedLink] = useState<string | null>(null)

  const toggleExpand = (href: string) => {
    setExpandedLink((current) => (current === href ? null : href))
  }

  return (
    <SidebarLayout handleClose={() => closeSidebar()}>
      <div className={s.root}>
        <nav>
          <ul>
            <li className={s.item} onClick={() => closeSidebar()}>
              <Link href="/search">All</Link>
            </li>
            {links.map((l: any) => (
              <React.Fragment key={l.href}>
                <li
                  className={`${s.item} border-4`}
                  onClick={() => {
                    toggleExpand(l.href)
                    if (!l.subLinks.length) closeSidebar()
                  }}
                >
                  <Link href={l.subLinks.length ? '#' : l.href}>{l.label}</Link>
                </li>
                {expandedLink === l.href &&
                  l.subLinks.map((subLink: any) => (
                    <li
                      key={subLink.path}
                      className={`${s.item} border-4 ${s.subItem}`}
                      onClick={() => closeSidebar()}
                    >
                      <Link href={subLink.path}>{subLink.name}</Link>
                    </li>
                  ))}
              </React.Fragment>
            ))}
          </ul>
        </nav>
      </div>
    </SidebarLayout>
  )
}
