import { Card, Button, Table } from "react-bootstrap";
import {
  AddPostButton,
  BodyContent,
  CardsContainer,
  TitleContainer,
} from "./styles";
import React, { useState, useEffect } from "react";
import axiosInstance from "../../api/axiosConfig";
import { Trash, FadersHorizontal, Pen } from "phosphor-react";
import { Link } from "react-router-dom";
import { EditConfigIcon } from "../PostsCreation/styles";

interface UserPosts {
  id: number;
  title: string;
  body: string;
}

export function Home() {
  const [posts, setPosts] = useState<UserPosts[]>([]);
  const [deleteItemId, setDeleteItemId] = useState<string>("");
  const [showIcons, setShowIcons] = useState<boolean>(false);

  const fetchData = async () => {
    const response = await axiosInstance.get<UserPosts[]>("posts");
    const data = response.data;
    setPosts(data);
    localStorage.setItem("posts", JSON.stringify(data));
  };

  const deleteItem = async (itemId: number): Promise<void> => {
    try {
      await axiosInstance.delete(`posts/${itemId}`);
      console.log(`Item ${itemId} deleted successfully`);
      setPosts(posts.filter((post) => post.id !== itemId));
      localStorage.setItem("posts", JSON.stringify(posts.filter((post) => post.id !== itemId)));
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteButtonClick = async (itemId: number) => {
    try {
      await deleteItem(itemId);
      console.log("Item deleted successfully");
    } catch (error) {
      console.error(error); // handle error here
    }
  };

  const updatePosts = (newPost: UserPosts) => {
    setPosts(posts.map((post) => (post.id === newPost.id ? newPost : post)));
    localStorage.setItem("posts", JSON.stringify(posts));
  };

  const handleEditConfigIconClick = () => {
    setShowIcons(!showIcons);
  };

  useEffect(() => {
    const savedPosts = localStorage.getItem("posts");
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    } else {
      fetchData();
    }
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
                        {showIcons && (
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
