import {TemplateProps} from '@/types/template'

export default function NoirTemplate({content}: TemplateProps) {
    return (
        <div className="min-h-screen bg-black text-white">
            <div className="container mx-auto px-4 py-16">
                <header className="text-center mb-12">
                    <h1 className="text-5xl font-light text-white mb-4 tracking-wide">
                        {content.title || 'Welcome'}
                    </h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto font-light">
                        {content.subtitle || 'Your subtitle here'}
                    </p>
                </header>

                <main className="max-w-4xl mx-auto">
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="md:col-span-2">
                            <p className="text-lg text-gray-200 leading-relaxed mb-8">
                                {content.description || 'Your description here'}
                            </p>
                            {content.links && (
                                <div className="space-x-4">
                                    {content.links.map((link: any, index: number) => (
                                        <a
                                            key={index}
                                            href={link.url}
                                            className="inline-block border border-white text-white px-6 py-3 hover:bg-white hover:text-black transition-colors"
                                        >
                                            {link.text}
                                        </a>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div>
                            <img
                                src={content.image || '/placeholder.jpg'}
                                alt="Content"
                                className="w-full h-48 object-cover grayscale"
                            />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}
