import Link from "next/link";
import PostShow from "@/components/posts/post-show";
import CommentList from "@/components/comments/comment-list";
import CommentCreateForm from "@/components/comments/comment-create-form";
import paths from "@/path";
import { db } from "@/db";
import { notFound } from "next/navigation";
import { fetchCommentByPostId } from "@/db/queries/comments";


interface PostShowPageProps {
  params: {
    slug: string;
    id: string;
  };
}

export default async function PostShowPage({ params }: PostShowPageProps) {
  const { slug, id } = params;

  const post = await db.post.findFirst({
    where: {
      id
    }
  });


  if (!post) {
    notFound();
  }

  return (
    <div className="space-y-3">
      <Link className="underline decoration-solid" href={paths.topicShowPath(slug)}>
        {"< "}Back to {slug}
      </Link>

      <PostShow post={post} />
      <CommentCreateForm postId={id} startOpen />
      <CommentList fetchData={()=> fetchCommentByPostId(id)}  />
    </div>
  );
}

