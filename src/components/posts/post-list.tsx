import type { PostWithData } from '@/db/queries/posts';
import Link from 'next/link';
import paths from '@/path';
import { Avatar } from '@nextui-org/react';

interface PostList {
  fetchData: () => Promise<PostWithData[]>
}

export default async function PostList({ fetchData }: PostList) {

  const posts = await fetchData();

  const renderedPosts = posts.map((post) => {
    const topicSlug = post.topic.slug;

    if (!topicSlug) {
      throw new Error('Need a slug to link to a post');
    }

    return (
      <div key={post.id} >
        <Link href={paths.postShowPath(topicSlug, post.id)}>
          <div key={post.id} className="border shadow py-3 px-2 mt-2" >
            <div className="flex gap-2 items-center mb-2">
              <Avatar src={post.user.image || ''} size="sm" />
              <p>{post.user.name}</p>
            </div>
            <h2 className="font-bold text-[20px]">{post.title}</h2>
            <p  className='text-[14px] text-gray-500'> { post.content.length > 100 ?  post.content.substring(0,100) + ' ...' : post.content} </p>
            <p> {post._count.comments} Comments</p>
          </div>
        </Link>
      </div>
    );
  });

  return <div className="space-y-2">{renderedPosts}</div>;
}
