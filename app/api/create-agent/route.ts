import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { email, name } = await req.json();
    const token = req.headers.get('authorization')?.replace('Bearer ', '');
    const { data: userData } = await supabase.auth.getUser(token);


    // 1. Create auth user
    const { data, error } = await supabase.auth.admin.createUser({
        email,
        password: 'default123',
        email_confirm: true,
    })

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 })
    }

    // 2. Insert into profiles
    await supabase.from('profiles').insert({
        id: data.user.id,
        name,
        role: 'agent',
    })

    const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', userData.user?.id)
        .single()

    if (profile?.role !== 'admin') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }

    return NextResponse.json({ success: true })
}