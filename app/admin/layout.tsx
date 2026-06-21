export const dynamic = 'force-dynamic'
import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import AdminSidebar from '@/components/admin/AdminSidebar'

export const metadata: Metadata = {
  title: {
    default: 'Admin Dashboard | MB Farmhouse',
    template: '%s | Admin | MB Farmhouse',
  },
  robots: 'noindex,nofollow',
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const headersList = await headers()
  const pathname = headersList.get('x-pathname') ?? ''

  // Login page must not trigger the session check — that causes the redirect loop
  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/admin/login')
  }

  return (
    <div className="min-h-screen bg-farmhouse-cream">
      <AdminSidebar />
      <div className="lg:ml-60">
        <header className="bg-white border-b border-farmhouse-beige px-6 py-4 flex items-center justify-between sticky top-0 z-30">
          <div className="lg:hidden w-10" />
          <div />
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-farmhouse-dark text-sm font-medium">{session.user?.name}</p>
              <p className="text-farmhouse-muted text-xs">{session.user?.email}</p>
            </div>
            <div className="w-9 h-9 bg-farmhouse-brown flex items-center justify-center text-farmhouse-cream font-serif font-bold text-sm">
              {session.user?.name?.charAt(0) ?? 'A'}
            </div>
          </div>
        </header>
        <main className="p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
