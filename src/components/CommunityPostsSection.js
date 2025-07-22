import React from 'react';

const CommunityPostsSection = () => {
  // Example community posts data
  const communityPosts = [
    { id: 1, user: 'John Doe', post: 'Just finished the React course, it was amazing!' },
    { id: 2, user: 'Jane Smith', post: 'Looking for advice on CSS animations. Any tips?' },
    // Add more posts as needed
  ];

  return (
    <section className="community-posts">
      <div className="container">
        <h2>Community Posts</h2>
        <div className="post-list">
          {communityPosts.map(post => (
            <div key={post.id} className="post">
              <p>{post.post}</p>
              <span className="user">{post.user}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CommunityPostsSection;
