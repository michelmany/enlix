import { TemplateProps } from '@/types'

export default function LumiTemplate({ content, children }: TemplateProps) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="container mx-auto px-4 py-16">
                <header className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        {content.title || 'Welcome'}
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        {content.subtitle || 'Your subtitle here'}
                    </p>
                </header>

                <main className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                        <p className="text-lg text-gray-700 leading-relaxed">
                            {content.description || 'Your description here'}
                        </p>
                        {content.links && (
                            <div className="mt-6 space-x-4">
                                {content.links.map((link: any, index: number) => (
                                    <a
                                        key={index}
                                        href={link.url}
                                        className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                        {link.text}
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <img
                            src={content.image || '/placeholder.jpg'}
                            alt="Content"
                            className="w-full h-64 object-cover rounded-lg"
                        />
                    </div>

                    <div className="col-span-2 mt-12">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    )
}
