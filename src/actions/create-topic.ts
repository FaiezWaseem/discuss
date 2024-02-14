'use server';
import { z } from 'zod'
import { auth } from '@/auth'

import type { Topic } from '@prisma/client';
import { db } from '@/db';
import { redirect } from 'next/navigation';
import paths from '@/path';
import { revalidatePath } from 'next/cache';

const createTopicSchema = z.object({
    name: z.string().min(3).regex(/[a-z]/, { message: 'Must Be lowerCase letter without dashes' }),
    description: z.string().min(10)
})

interface createTopicSchemaFormState {
    errors: {
        name?: string[],
        description?: string[],
        _form?: string[]
    }
}

export async function
    createTopic(formState: createTopicSchemaFormState, formData: FormData):
    Promise<createTopicSchemaFormState> {

        // this was only added for testing , creating a delay in server response
        // await new Promise(resolve => setTimeout(resolve, 3000))

     // checks if user is authorized   
    const session = await auth();
    if (!session || !session.user) {
        return {
            errors: {
                _form: ['Not Authorized!! . You Must Login to Create a Topic']
            }
        }
    };


    // validating request
    const result = createTopicSchema.safeParse({
        name: formData.get('name'),
        description: formData.get('description')
    })

    if (!result.success) {
        console.log(result.error.flatten().fieldErrors)
        return {
            errors: result.error.flatten().fieldErrors
        }
    }
    console.log(result)

    let topic : Topic;
    try {
       topic =  await db.topic.create({
            data: {
                slug: result.data.name,
                description: result.data.description,
            }
        })
    } catch (error : unknown) {
        if(error instanceof Error){
            return {
                errors: {
                    _form: [error.message]
                }
            }
        }else{
            return {
                errors: {
                    _form: ['Unknown Error']
                }
            }
        }
    }

    // TODO : revalidate HomePage route
    revalidatePath(paths.homePath())
    redirect(paths.topicShowPath(topic.slug))

}