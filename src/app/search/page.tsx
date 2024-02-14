import { redirect } from "next/navigation"

import PostList from "@/components/posts/post-list"
import { fetchPostSearch } from "@/db/queries/posts"
import { Suspense } from "react"


interface SearchPageProps {
    searchParams: {
        term: string
    }
}

export default function SearchPage({ searchParams }: SearchPageProps) {
    const { term }  = searchParams

    if(!term){
        redirect('/')
    }

    return <div>
        <Suspense fallback={<div>loading ....</div>} >
       <PostList fetchData={()=> fetchPostSearch(term)} />
        </Suspense>
    </div>
}