import { useState, useEffect } from "react";
import axios from "axios";
import Post from "./Post";
import LoadingIndicator from "./LoadingIndicator";
import ErrorIndicator from "./ErrorIndicator";

function Posts() {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  async function fetchAndUpdateData(page) {
    setLoading(true);
    setError(false);
    try {
      let res = await axios({
        method: "get",
        url: `https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${page}`,
      });

      const totalCount = res.headers["x-total-count"];
      if (totalCount) {
        setTotalPages(Math.ceil(Number(totalCount) / 10));
      }

      setPosts(res.data);
      setLoading(false);
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAndUpdateData(page);
  }, [page]);

  if (loading) {
    return <LoadingIndicator />;
  }

  if (error) {
    return <ErrorIndicator />;
  }

  return (
    <div>
      <div id="pagination">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          PREVIOUS
        </button>
        <p>{page}</p>
        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          NEXT
        </button>
      </div>
      <h1>List of Posts</h1>

      {posts.map((post) => (
        <Post {...post} key={post.id} />
      ))}
    </div>
  );
}

export default Posts;
