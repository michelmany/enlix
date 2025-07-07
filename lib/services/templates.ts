import {Template} from '@/types';

export async function getAllTemplates(): Promise<Template[]> {
    return [
        {
            id: 'lumi',
            name: 'Lumi',
            previewImage: '/templates/lumi-preview.jpg',
            description: 'A bright and modern template with gradient backgrounds'
        },
        {
            id: 'noir',
            name: 'Noir',
            previewImage: '/templates/noir-preview.jpg',
            description: 'Dark and elegant template with minimalist design'
        },
        {
            id: 'sage',
            name: 'Sage',
            previewImage: '/templates/sage-preview.jpg',
            description: 'Natural and calming template with earthy tones'
        }
    ];
}
