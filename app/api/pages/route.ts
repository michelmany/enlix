import {NextRequest, NextResponse} from 'next/server';
import {getCurrentUser} from '@/lib/auth/clerk';
import {updateUserPage, getUserPageBySlug} from '@/lib/services/pages';
import {pageUpdateValidator} from '@/utils/validators';

export async function GET(request: NextRequest) {
    const user = await getCurrentUser();
    if (!user) {
        return NextResponse.json({error: 'Unauthorized'}, {status: 401});
    }

    const slug = request.nextUrl.searchParams.get('slug');
    if (!slug) {
        return NextResponse.json({error: 'Slug is required'}, {status: 400});
    }

    const page = await getUserPageBySlug(slug);
    if (!page) {
        return NextResponse.json({error: 'Page not found'}, {status: 404});
    }

    return NextResponse.json(page);
}

export async function POST(request: NextRequest) {
    const user = await getCurrentUser();
    if (!user) {
        return NextResponse.json({error: 'Unauthorized'}, {status: 401});
    }

    try {
        const body = await request.json();
        const validData = pageUpdateValidator.parse(body);
        const updatedPage = await updateUserPage(user.id, validData);

        return NextResponse.json(updatedPage);
    } catch (error: any) {
        if (error.name === 'ZodError') {
            return NextResponse.json({error: error.errors}, {status: 400});
        }
        return NextResponse.json({error: 'Failed to update page'}, {status: 500});
    }
}
