import { useState } from "react";
import axios from "axios";
import Post from "./Post";
import LoadingIndicator from "./LoadingIndicator";
import ErrorIndicator from "./ErrorIndicator";

function Posts() {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(false);

  async function fetchAndUpdateData() {
    setLoading(true);
    try {
      const res = await axios({
        method: "get",
        url: "https://dummyjson.com/posts",
      });
      setPosts(res?.data?.posts);
      setLoading(false);
      /*Complete the missing code*/
    } catch (error) {
      setError(true);
      setLoading(false);
      /*Complete the missing code*/
    }
  }

  if (loading) {
    return <LoadingIndicator />;
  }

  if (error) {
    return <ErrorIndicator />;
  }

  return (
    <div>
      <h1>List of Posts</h1>
      <button onClick={fetchAndUpdateData}>
        Click to display list of posts
      </button>
      {posts.map((post) => (
        <div className="post">
          <h1>{post.title}</h1>
          <p>{post.body}</p>
          <div className="tags">
            {post.tags.map((tag, index) => (
              <span key={index} className="tag">
                {tag}
              </span>
            ))}
          </div>
          <div className="reactions">
            <span>Likes: {post.reactions.likes}</span>
            <span>Dislikes: {post.reactions.dislikes}</span>
          </div>
          <div className="views">
            <span>Views: {post.views}</span>
          </div>
          <div className="user">
            <span>User ID: {post.userId}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Posts;
