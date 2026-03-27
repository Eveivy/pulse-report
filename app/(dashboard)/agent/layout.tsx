import { redirect } from 'next/navigation'

export default async function AgentLayout({
  children,
}: {
  children: React.ReactNode
}) {
   
  return <>{children}</>
}