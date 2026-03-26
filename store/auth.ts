import { atom, useAtom } from "jotai";


type Profile = {
    id: string
    name: string
    role: 'admin' | 'agent'
}


export const profileAtom = atom<Profile | null>(null);