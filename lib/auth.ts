
import { createClient } from "@/lib/supabase/client";

export async function getCurrentProfile() {
    const supabase = createClient();
    const {
        data: { user },
        error: userError
    } = await supabase.auth.getUser()

    if (userError || !user) return null

    const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

    if (error) {
        console.error('Error fetching profile:', error)
        return null
    }

    return profile;
}