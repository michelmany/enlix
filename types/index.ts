import React from "react";

export type UserRole = 'client' | 'admin' | 'superadmin';

export interface User {
    id: string;
    email: string;
    name: string;
    slug: string;
    role: UserRole;
    plan: string;
    trialEndDate?: Date | null;
}

export interface Page {
    id: string;
    template: string;
    content: Record<string, any>;
    userId: string;
    customDomain?: string | null;
    hasCustomTemplate?: boolean;
}

export interface PageProps {
    params: { slug: string }
}

export interface Template {
    id: string;
    name: string;
    previewImage: string;
    description: string;
}

export interface Section {
    id: string;
    enabled: boolean;
    order: number;
    type: string;
    data: any;
}

export type SectionProps = {
    section: Pick<Section, 'id' | 'type' | 'data'>;
    template: string;
};

export interface TemplateContent {
    title?: string
    subtitle?: string
    description?: string
    image?: string
    links?: Array<{
        text: string
        url: string
    }>
    sections?: Section[];

    [key: string]: any
}

export interface TemplateProps {
    content: TemplateContent
    children: React.ReactNode
}



