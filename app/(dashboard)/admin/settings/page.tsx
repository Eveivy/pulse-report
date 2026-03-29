'use client';

export default function SettingsPage() {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold">Settings</h2>
            <div className="rounded-lg border border-border bg-card p-6 dark:border-border dark:bg-background">
                <h3 className="text-lg font-semibold">Application Settings</h3>
                <div className="mt-6 space-y-6">
                    {[
                        { label: 'API Keys', description: 'Manage your API keys' },
                        { label: 'Webhooks', description: 'Configure webhook endpoints' },
                        { label: 'Notifications', description: 'Manage notification preferences' },
                    ].map(({ label, description }) => (
                        <div key={label} className="flex items-center justify-between border-b border-border py-4 dark:border-border">
                            <div>
                                <p className="font-medium">{label}</p>
                                <p className="text-sm text-muted-foreground">{description}</p>
                            </div>
                            <button className="rounded-lg px-4 py-2 hover:bg-secondary dark:hover:bg-secondary">
                                Configure
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
