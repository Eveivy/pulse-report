import { Button } from '@/components/ui/button'
import { Zap } from 'lucide-react'
import Link from 'next/link'

export default function LandingPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 bg-background">
      <div className="max-w-2xl w-full text-center space-y-12">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2">
          <Zap className="w-8 h-8 text-blue-600" />
          <span className="text-3xl font-bold text-foreground">Pulse Report</span>
        </div>

        {/* Hero Content */}
        <div className="space-y-6">
          <h1 className="text-5xl sm:text-6xl font-bold text-foreground text-balance leading-tight">
            Real-time Reporting, <span className="text-blue-600">Blazingly Fast</span>
          </h1>
          <p className="text-xl text-foreground/70 text-balance leading-relaxed">
            Local reporting made simple. Instant insights, easy-to-use interface, lightning-fast performance.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200">
            <Link href="/sign-up">
              Sign Up
            </Link>
          </Button>
          <Button
            variant="outline"
            className="px-8 py-3 border border-border text-foreground hover:bg-card font-semibold rounded-lg transition-colors duration-200"
          >
            <Link href="/login">
              Sign In
            </Link>
          </Button>
        </div>
      </div>
    </main>
  )
}









// import { DeployButton } from "@/components/deploy-button";
// import { EnvVarWarning } from "@/components/env-var-warning";
// import { AuthButton } from "@/components/auth-button";
// import { Hero } from "@/components/hero";
// import { ThemeSwitcher } from "@/components/theme-switcher";
// import { ConnectSupabaseSteps } from "@/components/tutorial/connect-supabase-steps";
// import { SignUpUserSteps } from "@/components/tutorial/sign-up-user-steps";
// import { hasEnvVars } from "@/lib/utils";
// import Link from "next/link";
// import { Suspense } from "react";


// export default function Home() {
//   return (
//     <main className="min-h-screen flex flex-col items-center">
//       <div className="flex-1 w-full flex flex-col gap-20 items-center">
//         <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
//           <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
//             <div className="flex gap-5 items-center font-semibold">
//               <Link href={"/"}>Next.js Supabase Starter</Link>
//               <div className="flex items-center gap-2">
//                 <DeployButton />
//               </div>
//             </div>
//             {!hasEnvVars ? (
//               <EnvVarWarning />
//             ) : (
//               <Suspense>
//                 <AuthButton />
//               </Suspense>
//             )}
//           </div>
//         </nav>
//         <div className="flex-1 flex flex-col gap-20 max-w-5xl p-5">
//           <Hero />
//           <main className="flex-1 flex flex-col gap-6 px-4">
//             <h2 className="font-medium text-xl mb-4">Next steps</h2>
//             {hasEnvVars ? <SignUpUserSteps /> : <ConnectSupabaseSteps />}
//           </main>
//         </div>

//         <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-16">
//           <p>
//             Powered by{" "}
//             <a
//               href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
//               target="_blank"
//               className="font-bold hover:underline"
//               rel="noreferrer"
//             >
//               Supabase
//             </a>
//           </p>
//           <ThemeSwitcher />
//         </footer>
//       </div>
//     </main>
//   );
// }
