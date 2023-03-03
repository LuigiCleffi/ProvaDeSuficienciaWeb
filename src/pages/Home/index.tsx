import { Card, Button, Table } from "react-bootstrap";
import {
  AddPostButton,
  CardsContainer,
  TitleContainer,
} from "./styles";
import React, { useState, useEffect } from "react";
import axiosInstance from "../../api/axiosConfig";
import { Trash, Pen } from "phosphor-react";
import { Link } from "react-router-dom";
import { EditConfigIcon } from "../PostsCreation/styles";

interface UserPosts {
  id: number;
  title: string;
  body: string;
}

export function Home() {
  const [posts, setPosts] = useState<UserPosts[]>([]);
  const [isEditIconShown, setIsEditIconShown] = useState<boolean>(false);

  const fetchData = async (): Promise<void>  => {
    const response = await axiosInstance.get<UserPosts[]>("posts");
    const data = response.data;
    localStorage.setItem("posts", JSON.stringify(data));
    setPosts(data);
  }

  const deletePost = async (postId: number): Promise<void> => {
    try {
      await axiosInstance.delete(`posts/${postId}`);
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
      localStorage.setItem(
        "posts",
        JSON.stringify(posts.filter((post) => post.id !== postId))
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteButtonClick = async (postId: number) => {
    try {
      await deletePost(postId);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditConfigIconClick = () => {
    setIsEditIconShown(!isEditIconShown);
  };

  useEffect(() => {
      try {
        fetchData()
      } catch (error) {
        console.error(error);
      }

    // Get data from local storage
    const localData = localStorage.getItem("posts");
    if (localData) {
      setPosts(JSON.parse(localData));
    }

    fetchData();
  }, []);
  
  return (
    <CardsContainer>
      <Card>
        <Card.Body>
          <TitleContainer>
            <Card.Title>
              Posts{" "}
              <EditConfigIcon onClick={handleEditConfigIconClick} size={25} />
            </Card.Title>
            <Link to="/newPost">
              <AddPostButton size={32} />
            </Link>
          </TitleContainer>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Post title</th>
                <th>Post body</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => {
                return (
                  <React.Fragment key={post.id}>
                    <tr>
                      <td>{post.id}</td>
                      <td>{post.title}</td>
                      <td>{post.body}</td>
                    </tr>
                    <tr>
                      <td colSpan={3}>
                        {isEditIconShown && (
                          <>
                            <Button
                              variant="danger"
                              size="sm"
                              onClick={() => handleDeleteButtonClick(post.id)}
                            >
                              <Trash size={20} />
                            </Button>{" "}
                            <Link to={`posts/${post.id}`}>
                              <Pen size={32} />
                            </Link>
                          </>
                        )}
                      </td>
                    </tr>
                  </React.Fragment>
                );
              })}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </CardsContainer>
  );
}
