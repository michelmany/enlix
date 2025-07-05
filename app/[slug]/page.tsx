import {notFound} from 'next/navigation'
import {db} from '@/lib/db'
import {getTemplateComponent} from '@/lib/getTemplateComponent'

interface PageProps {
    params: Promise<{ slug: string }>
}

export default async function PublicPage({params}: PageProps) {
    const {slug} = await params

    const user = await db.user.findUnique({
        where: {slug}
    })

    if (!user) {
        notFound()
    }

    const content = JSON.parse(user.content || '{}')
    const TemplateComponent = getTemplateComponent(user.template)

    return <TemplateComponent content={content}/>
}

export async function generateMetadata({params}: PageProps) {
    const {slug} = await params

    const user = await db.user.findUnique({
        where: {slug}
    })

    if (!user) return {title: 'Not Found'}

    const content = JSON.parse(user.content || '{}')

    return {
        title: content.title || user.name,
        description: content.subtitle || `${user.name}'s page`
    }
}
