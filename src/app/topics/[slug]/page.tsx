import PostCreateForm from "@/components/posts/post-create-form"
import { db } from "@/db"
import { redirect } from "next/navigation"
import { Avatar } from "@nextui-org/react"
import Link from "next/link"
import paths from "@/path"

import { fetchPostsByTopicSlug } from "@/db/queries/posts"
import PostList from "@/components/posts/post-list"

interface TopicShowPageProps {
    params: {
        slug: string
    }
}


export default async function TopicShowPage(props: TopicShowPageProps) {

    const { slug } = props.params



    return <div className="grid grid-cols-4 gap-4 p-4" >
        <div className="col-span-3 border p-2">
            <h1 className="text-xl- m-2" >Top Posts <span className="text-[32px] ml-3 font-bold">{slug}</span> </h1>
           <PostList fetchData={()=> fetchPostsByTopicSlug(slug)} />
        </div>
        <div className="py-3 px-2" >
            <PostCreateForm slug={slug} />
        </div>


    </div>
}