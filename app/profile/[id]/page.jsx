"use client";
import Profile from "@components/Profile";
import { useParams, useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";

const UserProfile = () => {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const currentUserName = searchParams.get("name");
  console.log(currentUserName);
  const [userPosts, setUserPosts] = useState([]);
  const fetchPosts = async () => {
    const response = await fetch(`/api/users/${id}/posts`);
    const data = await response.json();
    setUserPosts(data);
  };
  useEffect(() => {
    if (id) fetchPosts();
  }, []);

  //   const handleEdit = (post) => {
  //     router.push(`edit-prompt?id=${post._id}`);
  //   };
  //   const handleDelete = async (post) => {
  //     const hasConfirmed = confirm(
  //       "Are you sure you want to delete this prompt?"
  //     );
  //     if (hasConfirmed) {
  //       try {
  //         await fetch(`/api/prompt/${post._id.toString()}`, {
  //           method: "DELETE",
  //         });
  //         const filteredPosts = myPosts.filter((item) => {
  //           item._id !== post._id;
  //         });
  //         setMyPosts(filteredPosts);
  //       } catch (e) {
  //         console.log(e);
  //       }
  //     }
  //   };
  return (
    <Profile
      name={currentUserName}
      desc={`Welcome to ${currentUserName}'s personalized profile page. Share your exceptional prompts and inspire others with the power of your imagination`}
      data={userPosts}
    />
  );
};

export default UserProfile;
