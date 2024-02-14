import type { Post} from "@prisma/client";
import { db } from "@/db";
import { cache } from "react";
 
export type PostWithData = Post & {
    topic: { slug: string  };
    user: { name: string | null , image : string | null };
  _count: { comments: number };
};
 
export const  fetchPostSearch = cache((term: string): Promise<PostWithData[]> => {
  console.log('fetched post by slug')
  return db.post.findMany({
    where: {
      OR : [
        { 
          title : {  contains : term} 
        },
        {
          content : { contains : term}
        }
      ]
    },
    include: {
      topic: { select: { slug: true } },
      user: { select: { name: true , image : true} },
      _count: { select: { comments: true } }, 
    },
  });
})
export const  fetchPostsByTopicSlug = cache((slug: string): Promise<PostWithData[]> => {
  console.log('fetched post by slug')
  return db.post.findMany({
    where: { topic: { slug } },
    include: {
      topic: { select: { slug: true } },
      user: { select: { name: true , image : true} },
      _count: { select: { comments: true } }, 
    },
  });
})

export const  fetchTopPosts = cache((): Promise<PostWithData[]> => {
  console.log('fetched top posts')
  return db.post.findMany({
   orderBy : [
    {
      comments : {
        _count : 'desc'
      }
    }
   ],
    include: {
      topic: { select: { slug: true } },
      user: { select: { name: true , image : true} },
      _count: { select: { comments: true } }, 
    },
    take : 5
  });
})