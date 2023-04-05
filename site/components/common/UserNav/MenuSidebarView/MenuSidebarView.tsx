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
  console.log(links);
  

  return (
    <SidebarLayout handleClose={() => closeSidebar()}>
      <div className={s.root}>
        <nav>
          <ul>
            <li className={`${s.item} border-b border-black`} onClick={() => closeSidebar()}>
              <Link href="/search" className='ml-2'>All</Link>
            </li>
            {links.map((l: any) => (
              <React.Fragment key={l.href}>
                <li
                  className={`${s.item} flex justify-left border-b border-black`}
                  onClick={() => {
                    toggleExpand(l.href)
                  }}
                >
                  <Link href={l.href} onClick={() => closeSidebar()} className='ml-2' >{l.label}</Link>
                  {l.subLinks.length > 0 && (
                    <span
                      className={`ml-auto mr-2 inline-block transition-transform duration-300 ${
                        expandedLink === l.href ? 'transform rotate-180' : ''
                      }`}
                    >
                      ▼
                    </span>
                  )}
                </li>
                {expandedLink === l.href &&
                  l.subLinks.map((subLink: any) => (
                    <li
                      key={subLink.path}
                      className={`${s.item} ml-4`}
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
