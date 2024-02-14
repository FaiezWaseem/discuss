'use client';
import { Input } from "@nextui-org/react";

import { useSearchParams } from "next/navigation";
import { Search } from "@/actions/search";

export default function SearchInput(){
    const params = useSearchParams();
    
    return  <form action={Search}>
        <Input name="term" variant="bordered" label="search" defaultValue={params.get('term') || ''}  />
    </form>
}