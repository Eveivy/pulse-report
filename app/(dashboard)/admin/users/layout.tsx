import Header from '@/components/header'
import SideBar from '@/components/sidebar'

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {

    return (
        <div className="flex">
            <SideBar />

            {/* Main Content */}
            <div className="flex-1 p-8">
                {children}
            </div>
        </div>

    )
}