export const dynamic = 'force-dynamic'
import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import AdminSidebar from '@/components/admin/AdminSidebar'
import AdminHeader from '@/components/admin/AdminHeader'

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

  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/admin/login')
  }

  return (
    <div className="min-h-screen bg-[#F5F3EF]">
      <AdminSidebar />
      <div className="lg:ml-64">
        <AdminHeader userName={session.user?.name} userEmail={session.user?.email} />
        <main className="p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
