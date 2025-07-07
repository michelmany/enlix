'use client';

import React from 'react';
import './AboutSection.scss';

interface AboutSectionProps {
    data: {
        title?: string;
        content?: string;
        image?: string;
        skills?: string[];
    };
    template: string;
}

export default function AboutSection({data, template}: AboutSectionProps) {
    return (
        <section className={`about-section about-section--${template}`}>
            <div className="container mx-auto px-4 py-8">
                <h2 className="text-2xl font-bold mb-6">{data.title || 'About Me'}</h2>

                <div className="grid md:grid-cols-2 gap-8">
                    {data.image && (
                        <div className="about-image">
                            <img
                                src={data.image}
                                alt="Profile"
                                className="rounded-lg shadow-md w-full h-auto"
                            />
                        </div>
                    )}

                    <div className="about-content">
                        {data.content && (
                            <div className="mb-6">
                                <p>{data.content}</p>
                            </div>
                        )}

                        {data.skills && data.skills.length > 0 && (
                            <div className="skills">
                                <h3 className="text-xl font-semibold mb-3">Skills</h3>
                                <div className="flex flex-wrap gap-2">
                                    {data.skills.map((skill, index) => (
                                        <span
                                            key={index}
                                            className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
