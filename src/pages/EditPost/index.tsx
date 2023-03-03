import React, { useState, useEffect } from "react";
import axiosInstance from "../../api/axiosConfig";
import { useParams } from 'react-router-dom';

interface UserPosts {
  id: number;
  title: string;
  body: string;
}

export function EditPost() {
  const [userPosts, setUserPosts] = useState<UserPosts[]>([]);
  const { postId } = useParams();

  const fetchUserPosts = async () => {
    const response = await axiosInstance.get<UserPosts[]>(`posts/${postId}`);
    const data = response.data;
    setUserPosts(data);
    localStorage.setItem("posts", JSON.stringify(data));
  };

  useEffect(() => {
    fetchUserPosts();
  }, []);

  return (
    <div>
      <h1>Edit Post</h1>
      <ul>
        {userPosts.map((post) => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
