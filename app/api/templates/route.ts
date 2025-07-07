import {NextResponse} from 'next/server';
import {getAllTemplates} from '@/lib/services/templates';
import {getCurrentUser} from '@/lib/auth/clerk';

export async function GET() {
    const user = await getCurrentUser();
    if (!user) {
        return NextResponse.json({error: 'Unauthorized'}, {status: 401});
    }

    const templates = await getAllTemplates();
    return NextResponse.json(templates);
}
