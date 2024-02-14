'use server';
import Link from "next/link";
import { Chip } from "@nextui-org/react";
import { db } from "@/db";
import paths from "@/path";

export default async function TopicLists() {
    const topics = await db.topic.findMany();

    const renderedTopics = topics.map((topic) => (
    <Link  href={paths.topicShowPath(topic.slug)} key={topic.id}>
        <Chip color="warning" variant="shadow"  >
        {topic.slug}
        </Chip>
        </Link> ))

    return <div className="flex flex-row flex-wrap gap-2 mt-3" >
            {renderedTopics}
    </div>

}