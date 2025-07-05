import dynamic from 'next/dynamic'

const LumiTemplate = dynamic(() => import('@/templates/lumi'))
const NoirTemplate = dynamic(() => import('@/templates/noir'))
const SageTemplate = dynamic(() => import('@/templates/sage'))

export function getTemplateComponent(template: string) {
    switch (template) {
        case 'lumi':
            return LumiTemplate
        case 'noir':
            return NoirTemplate
        case 'sage':
            return SageTemplate
        default:
            return LumiTemplate
    }
}
