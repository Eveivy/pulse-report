'use client';

import { useState, useEffect } from 'react';


export default function LoadingPage() {
    const [dots, setDots] = useState('');


    useEffect(() => {
        const interval = setInterval(() => {
            setDots(prev => (prev.length < 3 ? prev + '.' : ''));
        }, 500);

        return () => clearInterval(interval);
    }, []);




    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary flex items-center justify-center px-4">
            <div className="max-w-md w-full text-center space-y-8">
                {/* Animated Loader */}
                <div className="flex justify-center">
                    <div className="relative w-20 h-20">
                        {/* Outer ring */}
                        <div className="absolute inset-0 border-4 border-transparent border-t-accent border-r-accent rounded-full animate-spin" />
                        {/* Middle ring */}
                        <div className="absolute inset-2 border-4 border-transparent border-b-accent rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
                        {/* Inner pulsing circle */}
                        <div className="absolute inset-6 bg-accent rounded-full animate-pulse opacity-20" />
                    </div>
                </div>

                {/* Main Message */}
                <div className="space-y-3">
                    <h1 className="text-3xl font-bold text-foreground">
                        Fetching Your Details
                    </h1>
                    <p className="text-lg text-muted-foreground">
                        Please wait while we prepare your information{dots}
                    </p>
                </div>

                {/* Subtext */}
                <div className="space-y-2 text-sm text-muted-foreground">
                    <p>This should only take a few moments</p>
                    <p className="text-xs">Do not refresh or close this page</p>
                </div>

                {/* Progress indicator */}
                <div className="space-y-2">
                    <div className="h-1 bg-secondary rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-accent via-cyan-500 to-accent rounded-full"
                            style={{
                                animation: 'shimmer 2s infinite',
                                backgroundSize: '200% 100%',
                            }}
                        />
                    </div>
                    <p className="text-xs text-muted-foreground">Loading...</p>
                </div>
            </div>

            <style jsx>{`
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
      `}</style>
        </div>
    );
}
