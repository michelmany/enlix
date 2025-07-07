import {prisma} from '@/lib/db/prisma';

export async function generateUniqueSlug(email: string): Promise<string> {
    // Extract the part of the email before the "@" symbol
    const baseSlug = email.split('@')[0].toLowerCase().replace(/[^a-z0-9]/g, '-');

    let uniqueSlug = baseSlug;
    let counter = 1;

    // Check if the slug already exists in the database
    while (await prisma.user.findUnique({where: {slug: uniqueSlug}})) {
        uniqueSlug = `${baseSlug}-${counter}`;
        counter++;
    }

    return uniqueSlug;
}
