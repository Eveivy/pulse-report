// hooks/useAuth.ts
import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { createClient } from "@/lib/supabase/client";
import { getCurrentProfile } from '@/lib/auth'
import { profileAtom } from '@/store/auth';
import { redirect, useRouter } from 'next/navigation';

export function useAuth() {
  const [, setProfile] = useAtom(profileAtom)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const loadProfile = async () => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser()

   
      if (userError || !user) {
        setProfile(null)
        router.replace('/auth/login')
        return
      }
 
      const profile = await getCurrentProfile()

      if (!profile) {
        setProfile(null)
        router.replace('/auth/login')
        return
      }

      setProfile(profile)

      if (profile.role === 'admin') {
        router.replace('/dashboard/admin')
      } else {
        router.replace('/dashboard/agent')
      }
    }

    loadProfile()
  }, [])
}

// export function useAuth() {
//   const [, setProfile] = useAtom(profileAtom)
//   const supabase = createClient();

//   useEffect(() => {
//     // const loadProfile = async () => {
//     //   const { data: { user } } = await supabase.auth.getUser();
//     //   const { data, error } = await supabase.auth.getClaims();

//     //   console.log("claims => ", data)

//     //   if (!user || error || !data?.claims) {
//     //     setProfile(null);
//     //     redirect("/auth/login");
//     //     return
//     //   }

//     //   const profile = await getCurrentProfile()

//     //   setProfile(profile)

//     //   if (profile.role === "admin") {
//     //     redirect("/dashboard/admin");
//     //   } else if (profile.role === "agent") {
//     //     redirect("/dashboard/agent");
//     //   } else {
//     //     redirect("/auth/login");
//     //   }
//     // }

//     const loadProfile = async () => {
//       const {
//         data: { user },
//         error: userError,
//       } = await supabase.auth.getUser()

//       // 1. No session
//       if (userError || !user) {
//         setProfile(null)
//         return { status: 'unauthenticated' }
//       }

//       // 2. Fetch profile
//       const profile = await getCurrentProfile()

//       if (!profile) {
//         setProfile(null)
//         return { status: 'no-profile' }
//       }

//       // 3. Store profile
//       setProfile(profile)

//       // 4. Return role (no redirect here)
//       return {
//         status: 'authenticated',
//         role: profile.role,
//       }
//     }

//     loadProfile();

//   }, [])

//   const result = await loadProfile()

//   if (result.status !== 'authenticated') {
//     redirect('/auth/login')
//     return
//   }

//   if (result.role === 'admin') {
//     redirect('/dashboard/admin')
//   } else {
//     redirect('/dashboard/agent')
//   }
// }