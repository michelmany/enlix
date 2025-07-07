import {TemplateProps} from '@/types'

export default function SageTemplate({content, children}: TemplateProps) {
    return (
        <div className="min-h-screen bg-green-50">
            <div className="container mx-auto px-4 py-16">
                <header className="text-center mb-16">
                    <h1 className="text-4xl font-serif text-green-900 mb-4">
                        {content.title || 'Welcome'}
                    </h1>
                    <p className="text-lg text-green-700 max-w-xl mx-auto">
                        {content.subtitle || 'Your subtitle here'}
                    </p>
                </header>

                <main className="max-w-3xl mx-auto">
                    <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                        <img
                            src={content.image || '/placeholder.jpg'}
                            alt="Content"
                            className="w-full h-64 object-cover rounded-lg mb-6"
                        />
                        <p className="text-gray-700 leading-relaxed text-lg">
                            {content.description || 'Your description here'}
                        </p>
                    </div>

                    {content.links && (
                        <div className="text-center space-x-4">
                            {content.links.map((link: any, index: number) => (
                                <a
                                    key={index}
                                    href={link.url}
                                    className="inline-block bg-green-600 text-white px-8 py-3 rounded-full hover:bg-green-700 transition-colors"
                                >
                                    {link.text}
                                </a>
                            ))}
                        </div>
                    )}

                    <div className="col-span-2 mt-12">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    )
}
