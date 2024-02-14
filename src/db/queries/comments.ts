import type { Comment } from "@prisma/client";

import { cache } from "react";
import { db } from "@/db";


export type CommentWithAuhtor =  Comment & {
   user : { name : string | null , image : string | null  }
}


export const  fetchCommentByPostId = cache((postId : string) :  Promise<CommentWithAuhtor[]> =>{

    console.log('fetchcommentsByPostId')
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
})