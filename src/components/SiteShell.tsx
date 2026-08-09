import type { ReactNode } from 'react'

interface SiteShellProps {
  children: ReactNode
}

export function SiteShell({ children }: SiteShellProps) {
  return (
    <div className="site-shell">
      <p className="site-credit site-credit-top">Created by Shaurav Kasi</p>
      {children}
      <p className="site-credit site-credit-bottom">Created by Shaurav Kasi</p>
    </div>
  )
}
