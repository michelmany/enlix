import {getUserPageBySlug} from "@/lib/services/pages";
import {getTemplateComponent} from '@/lib/getTemplateComponent'
import SectionRenderer from "@/components/SectionRenderer";
import {notFound} from 'next/navigation';


interface PageProps {
    params: { slug: string }
}

interface Section {
    id: string;
    enabled: boolean;
    order: number;
    type: string;
    data: any;
}

export default async function PublicPage({params}: PageProps) {
    const page = await getUserPageBySlug(params.slug);

    if (!page) {
        notFound()
    }

    // Filter enabled sections and sort by order
    const enabledSections = page.content.sections
        .filter((section: Section) => section.enabled)
        .sort((a: Section, b: Section) => a.order - b.order);

    // Get template component for the page layout
    const TemplateComponent = getTemplateComponent(page.template);

    return (
        <TemplateComponent content={page.content}>
            {enabledSections.map((section: Section) => (
                <SectionRenderer
                    key={section.id}
                    section={section}
                    template={page.template}
                />
            ))}
        </TemplateComponent>
    );
}

export async function generateMetadata({params}: PageProps) {
    const page = await getUserPageBySlug(params.slug);

    if (!page) return {title: 'Not Found'};

    const content = typeof page.content === 'string'
        ? JSON.parse(page.content || '{}')
        : page.content;

    return {
        title: content.title || page.user.name,
        description: content.subtitle || `${page.user.name}'s page`
    }
}
