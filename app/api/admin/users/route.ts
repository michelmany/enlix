import {NextRequest, NextResponse} from 'next/server';
import {getCurrentUser} from '@/lib/auth/clerk';
import {getAllUsers} from '@/lib/services/users';
import {isSuperAdmin} from '@/lib/auth/rbac';
import {userSearchValidator} from '@/utils/validators';

export async function GET(request: NextRequest) {
    const user = await getCurrentUser();

    if (!user || !isSuperAdmin(user)) {
        return NextResponse.json({error: 'Unauthorized'}, {status: 403});
    }

    try {
        const searchParams = Object.fromEntries(request.nextUrl.searchParams.entries());
        const {page, limit, search} = userSearchValidator.parse(searchParams);

        const result = await getAllUsers(page, limit, search);
        return NextResponse.json(result);
    } catch (error: any) {
        if (error.name === 'ZodError') {
            return NextResponse.json({error: error.errors}, {status: 400});
        }
        return NextResponse.json({error: 'Failed to fetch users'}, {status: 500});
    }
}
