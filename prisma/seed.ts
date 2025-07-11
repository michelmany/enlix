import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient();

async function main() {
    const sampleContent = {
        title: "Welcome to My Page",
        subtitle: "This is a sample subtitle",
        description: "This is a sample description for the page content.",
        image: "/placeholder.jpg",
        sections: [
            {
                id: "section1",
                type: "about",
                enabled: true,
                order: 0,
                data: {
                    title: "About Me",
                    content: "This is some sample content about me."
                }
            }
        ],
    }

    const michelUserSampleContent = {
        title: "Michel Moraes",
        subtitle: "This is a sample subtitle",
        description: "This is a sample description for the page content.",
        image: "/placeholder.jpg",
        sections: [
            {
                id: "section1",
                type: "about",
                enabled: true,
                order: 1,
                data: {
                    title: "About Me",
                    content: "This is some sample content about me."
                }
            },
            {
                id: "section2",
                type: "links",
                enabled: true,
                order: 0,
                data: {
                    title: "Links",
                    content: [
                        {text: "Fale comigo pelo WhatsApp", url: "https://wa.me/1234567890"},
                        {text: "Meu Portfólio", url: "https://michelmoraes.com"},
                        {text: "Meu GitHub", url: "https://github.com/michelmany"}
                    ]
                }
            }
        ],
    }

    await prisma.user.create({
        data: {
            email: 'demo@example.com',
            name: 'Demo User',
            slug: 'demo',
            role: 'client',
            page: {
                create: {
                    template: 'lumi',
                    content: JSON.stringify(sampleContent)
                }
            }
        }
    })

    await prisma.user.create({
        data: {
            email: 'michel@example.com',
            name: 'Michel User',
            slug: 'michel',
            role: 'client',
            page: {
                create: {
                    template: 'noir',
                    content: JSON.stringify(michelUserSampleContent)
                }
            }
        }
    })

    await prisma.user.create({
        data: {
            email: 'admin@enlix.com',
            name: 'Admin User',
            slug: 'admin-user',
            role: 'admin',
            page: {
                create: {
                    template: 'noir',
                    content: JSON.stringify(sampleContent)
                }
            }
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
