import type React from "react"
import "./PostDetailScreen.css"
import PostDetailContainer from "../../postDetailContainer/PostDetailContainer"

interface PostDetailScreenProps {
  postId?: string
}

const PostDetailScreen: React.FC<PostDetailScreenProps> = ({ postId }) => {
  return (
    <div className="post-detail-screen">
      <PostDetailContainer postId={postId} />
    </div>
  )
}

export default PostDetailScreen
