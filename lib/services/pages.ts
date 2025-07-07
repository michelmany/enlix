import {prisma} from '@/lib/db/prisma';
import {Page, Section} from '@/types';
import {getAuthUserId} from '@/lib/auth/clerk';

/**
 * Get a user's page by their slug.
 * @param slug
 */
export async function getUserPageBySlug(slug: string): Promise<Page | null> {
    const user = await prisma.user.findUnique({
        where: {slug},
        include: {page: true}
    });

    if (!user || !user.page) return null;

    return {
        id: user.page.id,
        template: user.page.template,
        content: JSON.parse(user.page.content),
        userId: user.id,
        customDomain: user.page.customDomain,
        hasCustomTemplate: user.page.hasCustomTemplate,
    };
}

/**
 * Update or create a user's page.
 * @param userId
 * @param data
 */
export async function updateUserPage(userId: string, data: Partial<Page>): Promise<Page | null> {
    const user = await prisma.user.findUnique({
        where: {id: userId},
        include: {page: true}
    });

    if (!user) return null;

    // Create or update the page
    const updatedPage = await prisma.page.upsert({
        where: {
            userId
        },
        create: {
            userId,
            template: data.template || 'default',
            content: data.content ? JSON.stringify(data.content) : '{"sections":[]}',
            hasCustomTemplate: data.hasCustomTemplate || false,
            customDomain: data.customDomain
        },
        update: {
            template: data.template,
            content: data.content ? JSON.stringify(data.content) : undefined,
            hasCustomTemplate: data.hasCustomTemplate,
            customDomain: data.customDomain
        }
    });

    return {
        id: updatedPage.id,
        template: updatedPage.template,
        content: JSON.parse(updatedPage.content),
        userId: updatedPage.userId,
        customDomain: updatedPage.customDomain,
        hasCustomTemplate: updatedPage.hasCustomTemplate
    };
}

/**
 * Toggle a section's enabled state in a user's page.
 * @param userId
 * @param sectionId
 * @param enabled
 */
export async function toggleSectionEnabled(userId: string, sectionId: string, enabled: boolean): Promise<Page | null> {
    const user = await prisma.user.findUnique({
        where: {id: userId},
        include: {page: true}
    });

    if (!user || !user.page) return null;

    const content = JSON.parse(user.page.content);
    const sections = content.sections || [];

    content.sections = sections.map((section: Section) => {
        if (section.id === sectionId) {
            return {...section, enabled};
        }
        return section;
    });

    return updateUserPage(userId, {content});
}

/**
 * Reorder sections in a user's page.
 * @param userId
 * @param orderedSectionIds
 */
export async function reorderSections(userId: string, orderedSectionIds: string[]): Promise<Page | null> {
    const user = await prisma.user.findUnique({
        where: {id: userId},
        include: {page: true}
    });

    if (!user || !user.page) return null;

    const content = JSON.parse(user.page.content);
    const sectionsMap: Record<string, Section> = {};

    (content.sections || []).forEach((section: Section) => {
        sectionsMap[section.id] = section;
    });

    content.sections = orderedSectionIds
        .map((id, index) => {
            if (!sectionsMap[id]) return null;
            return {...sectionsMap[id], order: index + 1};
        })
        .filter(Boolean);

    return updateUserPage(userId, {content});
}

/**
 * Update section data in a user's page.
 * @param userId
 * @param sectionId
 * @param sectionData
 */
export async function updateSectionData(userId: string, sectionId: string, sectionData: any): Promise<Page | null> {
    const user = await prisma.user.findUnique({
        where: {id: userId},
        include: {page: true}
    });

    if (!user || !user.page) return null;

    const content = JSON.parse(user.page.content);
    const sections = content.sections || [];

    content.sections = sections.map((section: Section) => {
        if (section.id === sectionId) {
            return {...section, data: {...section.data, ...sectionData}};
        }
        return section;
    });

    return updateUserPage(userId, {content});
}

