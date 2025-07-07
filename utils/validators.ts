import {z} from 'zod';

export const pageUpdateValidator = z.object({
    template: z.string().optional(),
    content: z.record(z.any()).optional(),
    hasCustomTemplate: z.boolean().optional(),
    customDomain: z.string().nullable().optional()
});

export type PageUpdateDTO = z.infer<typeof pageUpdateValidator>;

export const userSearchValidator = z.object({
    page: z.coerce.number().positive().default(1),
    limit: z.coerce.number().positive().max(100).default(10),
    search: z.string().optional()
});

export type UserSearchDTO = z.infer<typeof userSearchValidator>;
