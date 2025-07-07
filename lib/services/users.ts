import {prisma} from '@/lib/db/prisma';
import {User} from '@/types';

export async function getAllUsers(page = 1, limit = 10, search?: string): Promise<{ users: User[], total: number }> {
    const skip = (page - 1) * limit;

    const where = search
        ? {
            OR: [
                {name: {contains: search}},
                {email: {contains: search}},
                {slug: {contains: search}}
            ]
        }
        : {};

    const [users, total] = await Promise.all([
        prisma.user.findMany({
            where,
            skip,
            take: limit,
            orderBy: {createdAt: 'desc'}
        }),
        prisma.user.count({where})
    ]);

    return {
        users: users.map(user => ({
            id: user.id,
            email: user.email,
            name: user.name,
            slug: user.slug,
            role: user.role as User['role'],
            plan: user.plan,
            trialEndsAt: user.trialEndsAt || undefined
        })),
        total
    };
}
