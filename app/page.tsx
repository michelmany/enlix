import Link from 'next/link'

export default function HomePage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="container mx-auto px-4 py-16">
                <header className="text-center mb-16">
                    <h1 className="text-5xl font-bold text-gray-900 mb-6">
                        Welcome to <span className="text-blue-600">Enlix</span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
                        Create beautiful, professional pages in minutes. Choose from our stunning templates and
                        customize your content with ease.
                    </p>
                    <div className="space-x-4">
                        <Link
                            href="/dashboard"
                            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Get Started
                        </Link>
                        <Link
                            href="/demo"
                            className="inline-block border border-blue-600 text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors"
                        >
                            View Demo
                        </Link>
                    </div>
                </header>

                <main className="grid md:grid-cols-3 gap-8 mb-16">
                    <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                        <div
                            className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-2xl">🎨</span>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Beautiful Templates</h3>
                        <p className="text-gray-600">Choose from Lumi, Noir, and Sage - each designed for different
                            styles and purposes.</p>
                    </div>

                    <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                        <div
                            className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-2xl">⚡</span>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Easy Setup</h3>
                        <p className="text-gray-600">Get your page live in minutes. No coding required - just add your
                            content and go.</p>
                    </div>

                    <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                        <div
                            className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-2xl">📱</span>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Mobile Ready</h3>
                        <p className="text-gray-600">All templates are fully responsive and look great on any
                            device.</p>
                    </div>
                </main>

                <footer className="text-center text-gray-600">
                    <p>&copy; 2024 Enlix. Made with ❤️ for creators everywhere.</p>
                </footer>
            </div>
        </div>
    )
}
