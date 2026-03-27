"use client";

import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { atom, useAtom } from "jotai";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";



export function AddAgentForm({
    className,
    ...props
}: React.ComponentPropsWithoutRef<"div">) {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();



    // const handleLogin = async (e: React.FormEvent) => {
    //     e.preventDefault();
    //     const supabase = createClient();
    //     setIsLoading(true);
    //     setError(null);

    //     try {
    //         const { error } = await supabase.auth.signInWithPassword({
    //             email,
    //             password,
    //         });
    //         if (error) throw error;
    //         router.push("/dashboard");

    //     } catch (error: unknown) {
    //         setError(error instanceof Error ? error.message : "An error occurred");
    //     } finally {
    //         setIsLoading(false);
    //     }
    // };


    const handleCreateAgent = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError(null)

        try {
            const res = await fetch('/api/create-agent', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, name }),
            })

            const data = await res.json()

            console.log(data)

            if (!res.ok) throw new Error(data.error)

            // success
            console.log('Agent created')

        } catch (error: unknown) {
            setError(error instanceof Error ? error.message : 'Something went wrong')
        } finally {
            setIsLoading(false)
        }
    }

    // const handleCreateAgent = async (e: React.FormEvent) => {
    //     await fetch('/api/create-agent', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //             email,
    //             name,
    //         }),
    //     })
    // }

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <form onSubmit={handleCreateAgent}>
                <div className="flex flex-col gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                            id="name"
                            type="text"
                            placeholder="John Doe"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="m@example.com"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    {error && <p className="text-sm text-red-500">{error}</p>}
                    <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? "Please wait..." : "Add Agent"}
                    </Button>
                </div>

            </form>
            {/* <Card>
                <CardHeader>
                    <CardTitle className="text-2xl"></CardTitle>
                    <CardDescription>
                        Enter agent's details below to sign them up
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    
                </CardContent>
            </Card> */}
        </div>
    );
}
