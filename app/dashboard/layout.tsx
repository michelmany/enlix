import {redirect} from 'next/navigation'

export default function DashboardLayout({
                                            children,
                                        }: {
    children: React.ReactNode
}) {
    // Add your auth check here
    // For now, we'll assume authentication is handled by middleware

    return (
        <div className="min-h-screen bg-gray-50">
            <nav className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <h1 className="text-xl font-semibold">Dashboard</h1>
                        </div>
                        <div className="flex items-center">
                            <button className="text-gray-500 hover:text-gray-700">
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                {children}
            </main>
        </div>
    )
}
