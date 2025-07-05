// types/template.ts
export interface TemplateContent {
    title?: string
    subtitle?: string
    description?: string
    image?: string
    links?: Array<{
        text: string
        url: string
    }>

    [key: string]: any
}

export interface TemplateProps {
    content: TemplateContent
}
