'use client';

import React from 'react';
import './LinksSection.scss';

interface LinksSectionProps {
    data: {
        title?: string;
        content?: Array<{
            text: string;
            url: string;
        }>;
        image?: string;
    };
    template: string;
}

export default function LinksSection({data, template}: LinksSectionProps) {
    return (
        <section className={`links-section links-section--${template}`}>
            <div className="container mx-auto px-4 py-8">
                <h2 className="text-2xl font-bold mb-6">{data.title || 'Links'}</h2>

                <div className="grid md:grid-cols-2 gap-8">
                    {data.image && (
                        <div className="links-image">
                            <img
                                src={data.image}
                                alt="Profile"
                                className="rounded-lg shadow-md w-full h-auto"
                            />
                        </div>
                    )}

                    <div className="links-content">
                        {data.content && (
                            <div className="mb-6">
                                {data.content.map((link, index) => (
                                    <div key={index} className="mb-2">
                                        <a
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {link.text}
                                        </a>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
