import AgentHeader from '@/components/agent-header'
import AgentSideBar from '@/components/agent-sidebar'
import { redirect } from 'next/navigation'

export default async function AgentLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <div className="min-h-screen flex bg-background text-foreground dark:bg-dark dark:text-white" >
      <AgentSideBar />


      <div className="flex-1 flex flex-col overflow-auto">
        {/* Header */}
        <AgentHeader />

        <div className="flex-1 pt-16">
          {children}
        </div>


      </div>

    </div>);
}