// prisma/seed.ts
import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const sampleContent = {
        title: "Welcome to My Page",
        subtitle: "This is a sample subtitle",
        description: "This is a sample description for the page content.",
        image: "/placeholder.jpg",
        links: [
            {text: "Contact Me", url: "mailto:hello@example.com"},
            {text: "My Portfolio", url: "https://example.com"}
        ]
    }

    await prisma.user.create({
        data: {
            email: 'demo@example.com',
            name: 'Demo User',
            slug: 'demo',
            template: 'lumi',
            content: JSON.stringify(sampleContent),
            role: 'client'
        }
    })

    await prisma.user.create({
        data: {
            email: 'admin@enlix.com',
            name: 'Admin User',
            slug: 'admin-user',
            template: 'noir',
            content: JSON.stringify(sampleContent),
            role: 'admin'
        }
    })
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
