import type { Comment } from "@prisma/client";


import { db } from "@/db";


export type CommentWithAuhtor =  Comment & {
   user : { name : string | null , image : string | null  }
}


export function fetchCommentByPostId(postId : string) :  Promise<CommentWithAuhtor[]>{

    return db.comment.findMany({
        where : {
            postId
        },
        include : {
            user : {
                select : {
                    image : true,
                    name : true,
                }
            }
        }
    })
}