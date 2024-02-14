import Link from "next/link";
import PostShow from "@/components/posts/post-show";
import CommentList from "@/components/comments/comment-list";
import CommentCreateForm from "@/components/comments/comment-create-form";
import paths from "@/path";
import { fetchCommentByPostId } from "@/db/queries/comments";
import { Suspense } from "react";
import { Skeleton } from "@nextui-org/react";

interface PostShowPageProps {
  params: {
    slug: string;
    id: string;
  };
}

export default async function PostShowPage({ params }: PostShowPageProps) {
  const { slug, id } = params;


  return (
    <div className="space-y-3">
      <Link className="underline decoration-solid" href={paths.topicShowPath(slug)}>
        {"< "}Back to {slug}
      </Link>
      <Suspense fallback={<TopicSkeleton />} >
        <PostShow postId={id} />
      </Suspense>
      <CommentCreateForm postId={id} startOpen />
      <Suspense fallback={<>
        <CommentSkeleton />
        <CommentSkeleton />
        <CommentSkeleton />
      </>} >
        <CommentList fetchData={() => fetchCommentByPostId(id)} />
      </Suspense>
    </div>
  );
}

const CommentSkeleton = () => {
  return <div className="max-w-[50%] w-full flex items-center gap-3">
    <div>
      <Skeleton className="flex rounded-full w-12 h-12" />
    </div>
    <div className="w-full flex flex-col gap-2">
      <Skeleton className="h-3 w-3/5 rounded-lg" />
      <Skeleton className="h-3 w-4/5 rounded-lg" />
    </div>
  </div>
}
const TopicSkeleton = () =>{
  return <div className="max-w-[80%] w-full flex items-center gap-3">
  <div className="w-full flex flex-col gap-2">
    <Skeleton className="h-5 w-3/5 rounded-lg" />
    <Skeleton className="h-5 w-5/5 rounded-lg" />
    <Skeleton className="h-5 w-4/5 rounded-lg" />
    <Skeleton className="h-5 w-2/5 rounded-lg" />
  </div>
</div> 
}