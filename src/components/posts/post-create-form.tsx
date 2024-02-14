'use client';
import { Button, Textarea, Input, Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react"
import * as actions from '@/actions'
import { useFormState } from "react-dom"
import FormButtom from "@/components/topics/form-button";


export default function PostCreateForm({ slug } : { slug: string }) {
    const [formState , action] = useFormState(actions.createPost.bind(null, slug), { errors : {} })

    return (
        <Popover placement="bottom">
            <PopoverTrigger>
                <Button color="primary" >Create a Post</Button>
            </PopoverTrigger>
            <PopoverContent>
                <form action={action}>
             
                    <div className="flex flex-col gap-4 p-4 w-80">
                        <h3 className="text-lg">Create a Topic</h3>
                        <Input name="title" label="Title" labelPlacement="outside" 
                        placeholder="Title" isInvalid={!!formState.errors?.title}
                        errorMessage={formState.errors?.title?.join(',')}
                        />
                        <Textarea name="content" label="Content"
                         labelPlacement="outside" placeholder="Content"
                         isInvalid={!!formState.errors?.content}
                         errorMessage={formState.errors?.content?.join(',')}
                         />
                         {formState.errors._form && <p className="rounded p-2 bg-red-200 border-orange-600">{formState.errors._form.join(',')}</p>}
                        <FormButtom>Submit</FormButtom>
                    </div>

                </form>
            </PopoverContent>

        </Popover>
    )
}