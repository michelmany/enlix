import {User, UserRole} from '@/types';

export function isSuperAdmin(user: User | null): boolean {
    return user?.role === 'superadmin';
}

export function isAdmin(user: User | null): boolean {
    return user?.role === 'admin' || user?.role === 'superadmin';
}

export function requireRole(user: User | null, allowedRoles: UserRole[]): boolean {
    if (!user) return false;
    return allowedRoles.includes(user.role);
}
