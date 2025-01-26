import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const UserPosts = () => {
  const { userId } = useParams(); // Get userId from URL params
  const [posts, setPosts] = useState([]); // Store fetched posts
  const [loading, setLoading] = useState(true); // Loading state
  const [selectedPost, setSelectedPost] = useState(null); // State for selected post (modal)
  const backendBaseUrl = "http://localhost:7000"; // Backend base URL
  // const vercelurl="https://socialmedia-backend-2njs.onrender.com";
  const vercelurl="https://friendsbookweb.up.railway.app";

  const fetchUserPosts = async () => {
    try {
      if (userId) {
        const response = await axios.get(`${vercelurl}/profile/userPosts/${userId}`);

        console.log("Posts response:");
        console.log(response);

        setPosts(response.data.posts || []);
      } else {
        console.log("No userId provided!");
      }
    } catch (error) {
      console.error("Error fetching user posts:", error);
      setPosts([]); // Set posts to an empty array on error
    } finally {
      setLoading(false); // Ensure loading is set to false regardless of success or error
    }
  };

  useEffect(() => {
    fetchUserPosts();
  }, [userId]);

  if (loading) {
    return <p>Loading...</p>; // Show loading indicator
  }



      return (
        <div className="grid-container">
{posts.map((post) => {
// Determine whether to use post or post.postId
// const currentPost = post.postId || post;

return (
  <div
    key={post._id}
    className="grid-item"
    onClick={() => setSelectedPost(post)}
  >
   
    {post.content?.mediaUrl && post.postType === "image" && (
      <img
        src={post.content.mediaUrl}
        alt={`Post ${post._id}`}
      />
    )}
    {post.content?.mediaUrl && post.postType === "video" && (
      <video
        
        src={post.content.mediaUrl}
        alt={`Post ${post._id}`}
      />
    )}
    {post.caption && <p>{post.caption}</p>}
  </div>
);
})}

{/* Modal Section */}
{selectedPost && (
<div
  className="modal-overlay"
  onClick={() => setSelectedPost(null)} // Close modal on overlay click
>
  <div
    className="modal-content"
    onClick={(e) => e.stopPropagation()} // Prevent overlay click from closing modal
  >
    <button
      className="close-button"
      onClick={() => setSelectedPost(null)} // Close modal on button click
    >
      &times;
    </button>
    {selectedPost.content?.mediaUrl && selectedPost.postType==="image" && (
      <img
        src={selectedPost.content.mediaUrl}
        alt={`Selected Post ${selectedPost._id}`}
        className="modal-image"
      />
    )}
    {selectedPost.content?.mediaUrl && selectedPost.postType==="video" && (
      <video
        controls
        src={selectedPost.content.mediaUrl}
        alt={`Selected Post ${selectedPost._id}`}
        className="modal-image"
      />
    )}
    {selectedPost.caption && (
      <p className="modal-caption">{selectedPost.caption}</p>
    )}
  </div>
</div>
)}
</div>

      );
     
};

export default UserPosts;