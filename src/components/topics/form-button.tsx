'use client';


import { useFormStatus } from "react-dom";
import { Button } from "@nextui-org/react";

interface FormButtomProps {
    children: React.ReactNode
}


export default function FormButtom({children} : FormButtomProps){

    const { pending } = useFormStatus()

    return <Button type="submit" isLoading={pending} >{children}</Button>

}