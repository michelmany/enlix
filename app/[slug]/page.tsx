import {getUserPageBySlug} from "@/lib/services/pages";
import {getTemplateComponent} from '@/lib/getTemplateComponent'
import SectionRenderer from "@/components/SectionRenderer";
import {notFound} from 'next/navigation';
import {Section, PageProps} from "@/types";

export default async function PublicPage({params}: PageProps) {
    const resolvedParams = await params;
    const page = await getUserPageBySlug(resolvedParams.slug);

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
    const resolvedParams = await params;
    const page = await getUserPageBySlug(resolvedParams.slug);

    if (!page) return {title: 'Not Found'};

    const content = typeof page.content === 'string'
        ? JSON.parse(page.content || '{}')
        : (page.content || {});

    return {
        title: content.title || 'Page',
        description: content.subtitle || 'A user page',
    }
}
