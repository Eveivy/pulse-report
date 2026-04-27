import Header from '@/components/header'
import SideBar from '@/components/sidebar'

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {

    return (

        < div className="min-h-screen bg-background text-foreground dark:bg-dark dark:text-white" >
            {/* Header */}
            <Header />

            <main className="flex-1 p-8">
                {children}
            </main>
            {/* <div className="flex">
                <SideBar />

                Main Content
            </div> */}
        </div >
    )
}