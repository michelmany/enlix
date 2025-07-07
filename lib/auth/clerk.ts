import {auth, currentUser} from '@clerk/nextjs';
import {User, UserRole} from '@/types';

export async function getCurrentUser() {
    const user = await currentUser();

    if (!user) {
        return null;
    }

    return {
        id: user.id,
        email: user.emailAddresses[0]?.emailAddress || '',
        name: `${user.firstName || ''} ${user.lastName || ''}`.trim(),
        role: (user.publicMetadata?.role as UserRole) || 'client'
    };
}

export function getAuthUserId() {
    const {userId} = auth();
    return userId;
}
