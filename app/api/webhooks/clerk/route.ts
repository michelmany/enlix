import {Webhook} from 'svix';
import {headers} from 'next/headers';
import {WebhookEvent} from '@clerk/nextjs/server';
import {NextResponse} from 'next/server';
import {prisma} from '@/lib/db/prisma';
import {generateUniqueSlug} from '@/utils/user-utils';
import {
    DEFAULT_TEMPLATE,
    DEFAULT_ROLE,
    TRIAL_PERIOD_DAYS,
    DEFAULT_USER_NAME
} from '@/lib/constants';

export async function POST(req: Request) {
    // The `headers` function must be awaited to get the ReadonlyHeaders object.
    const headersList = await headers();
    const svix_id = headersList.get('svix-id');
    const svix_timestamp = headersList.get('svix-timestamp');
    const svix_signature = headersList.get('svix-signature');

    if (!svix_id || !svix_timestamp || !svix_signature) {
        return new Response('Missing svix headers', {status: 400});
    }

    // Get the body
    const payload = await req.json();
    const body = JSON.stringify(payload);

    // Verify webhook
    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET || '');
    let evt: WebhookEvent;

    try {
        evt = wh.verify(body, {
            'svix-id': svix_id,
            'svix-timestamp': svix_timestamp,
            'svix-signature': svix_signature,
        }) as WebhookEvent;
    } catch (err) {
        console.error('Error verifying webhook:', err);
        return new Response('Error verifying webhook', {status: 400});
    }

    // Handle user.created event
    if (evt.type === 'user.created') {
        const {id, email_addresses, primary_email_address_id, first_name} = evt.data;

        // Get primary email
        const primaryEmail = email_addresses.find(
            (email) => email.id === primary_email_address_id
        );

        if (!primaryEmail) {
            return NextResponse.json(
                {success: false, message: "No primary email found"},
                {status: 400}
            );
        }

        // Set trial period (15 days)
        const trialEndsAt = new Date();
        trialEndsAt.setDate(trialEndsAt.getDate() + TRIAL_PERIOD_DAYS);

        try {
            // Generate unique slug - await the async function
            const slug = await generateUniqueSlug(primaryEmail.email_address);

            // Create user in database
            await prisma.user.create({
                data: {
                    id,
                    email: primaryEmail.email_address,
                    name: first_name || DEFAULT_USER_NAME,
                    slug,
                    role: DEFAULT_ROLE,
                    plan: 'pro', // Start with pro trial
                    trialEndsAt,
                    page: {
                        create: {
                            template: DEFAULT_TEMPLATE,
                            content: JSON.stringify({}), // Empty content to start
                            hasCustomTemplate: false,
                            customDomain: null,
                        }
                    }
                },
            });

            return NextResponse.json({success: true});
        } catch (error) {
            console.error('Error creating user:', error);
            return NextResponse.json({success: false, message: 'Error creating user'}, {status: 500});
        }
    }

    return NextResponse.json({success: true});
}
