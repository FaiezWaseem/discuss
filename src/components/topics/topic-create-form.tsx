'use client';
import { Button, Textarea, Input, Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react"
import * as actions from '@/actions'
import { useFormState } from "react-dom"
import FormButtom from "./form-button";
export default function TopicCreateForm() {

    const [formState , action] = useFormState(actions.createTopic, { errors : {} })

    return (
        <Popover placement="bottom">
            <PopoverTrigger>
                <Button color="primary" >Create a Topic</Button>
            </PopoverTrigger>
            <PopoverContent>
                <form action={action}>
             
                    <div className="flex flex-col gap-4 p-4 w-80">
                        <h3 className="text-lg">Create a Topic</h3>
                        <Input name="name" label="Name" labelPlacement="outside" 
                        placeholder="Name" isInvalid={!!formState.errors?.name}
                        errorMessage={formState.errors?.name?.join(',')}
                        />
                        <Textarea name="description" label="Description"
                         labelPlacement="outside" placeholder="Describe your topic"
                         isInvalid={!!formState.errors?.description}
                         errorMessage={formState.errors?.description?.join(',')}
                         />
                         {formState.errors._form && <p className="rounded p-2 bg-red-200 border-orange-600">{formState.errors._form.join(',')}</p>}
                        <FormButtom>Submit</FormButtom>
                    </div>

                </form>
            </PopoverContent>

        </Popover>
    )
}