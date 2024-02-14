'use server';
import { z } from 'zod'
import { auth } from '@/auth'

import type { Post } from '@prisma/client';
import { db } from '@/db';
import { redirect } from 'next/navigation';
import paths from '@/path';
import { revalidatePath } from 'next/cache';

const createPostSchema = z.object({
    title: z.string().min(3),
    content: z.string().min(10)
})

interface createPostSchemaFormState {
    errors: {
        title?: string[],
        content?: string[],
        _form?: string[]
    }
}
export async function createPost(slug: string, formState: createPostSchemaFormState, formData: FormData): Promise<createPostSchemaFormState> {

    const session = await auth();
    if (!session || !session.user) {
        return {
            errors: {
                _form: ['Not Authorized!! . You Must Login to Create a Topic']
            }
        }
    };
    // validating request
    const result = createPostSchema.safeParse({
        title: formData.get('title'),
        content: formData.get('content')
    })

    if (!result.success) {
        console.log(result.error.flatten().fieldErrors)
        return {
            errors: result.error.flatten().fieldErrors
        }
    }
    console.log(result)

    let topic = await db.topic.findFirst({
        where: {
            slug: slug
        }
    })

    if (!topic) {
        return {
            errors: {
                _form: ['Topic Not Found']
            }
        }
    }

    let post: Post;
    try {
        post = await db.post.create({
            data: {
                title: result.data.title,
                content: result.data.content,
                topic: {
                    connect: {
                        id: topic.id
                    }
                },
                user: {
                    connect: {
                        id: session.user.id
                    }
                }
            }
        })
    } catch (error) {
        if (error instanceof Error) {
            return {
                errors: {
                    _form: [error.message]
                }
            }
        } else {
            return {
                errors: {
                    _form: ['Unknown Error']
                }
            }
        }

    }

    // TODO : revalidate TopicShowPage
    revalidatePath(paths.topicShowPath(slug))
    redirect(paths.postShowPath(slug, post.id))
    return { errors: {} }
}