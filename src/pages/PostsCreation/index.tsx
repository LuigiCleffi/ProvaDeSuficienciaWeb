import { Button, Card, Form } from "react-bootstrap";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { CardContainer, ContainerForm } from "./styles";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosConfig";

interface Post {
  id: number;
  title: string;
  body: string;
}

export function PostsCreation() {
  const [validated, setValidated] = useState(false);
  const [post, setPost] = useState<Post>({ id: 0, title: "", body: "" });
  const [posts, setPosts] = useState<Post[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedPosts = localStorage.getItem("posts");
    if (storedPosts) {
      setPosts(JSON.parse(storedPosts));
    }
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    const { title, body } = post;
    const newPost: Post = { id: post.id, title, body };

    try {
      const response = await axiosInstance.post<Post>('posts', newPost);
      const { data } = response;
      // Store data locally
      const highestId = posts.reduce((acc, curr) => curr.id > acc ? curr.id : acc, 0);
      const updatedPost = { ...data, id: highestId + 1 };
      const storedPosts = localStorage.getItem('posts');
      if (storedPosts) {
        const posts = JSON.parse(storedPosts) as Post[];
        localStorage.setItem('posts', JSON.stringify([updatedPost, ...posts]));
        setPosts([updatedPost, ...posts]);
      } else {
        localStorage.setItem('posts', JSON.stringify([updatedPost]));
        setPosts([updatedPost]);
      }
      // Navigate to home page
      navigate('/home');
    } catch (error) {
      console.error(error);
    }
  };
  
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });
  };

  useEffect(() => {
    if (posts.length > 0) {
      const maxId = Math.max(...posts.map(post => post.id));
      setPost({ ...post, id: maxId + 1 });
    }
  }, [posts]);
  return (
    <ContainerForm>
      <CardContainer>
        <Card.Title>
          <h1>Create a new Post !</h1>
        </Card.Title>
        <Card.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit} method="POST">
            <Form.Group>
              <Form.Label htmlFor="title">Title</Form.Label>
              <Form.Control
                type="text"
                id="title"
                name="title"
                placeholder="Title"
                value={post.title}
                onChange={handleInputChange}
                required
              />
              <Form.Control.Feedback type="invalid">Please enter a title</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="my-3">
              <Form.Label htmlFor="body">Content</Form.Label>
              <Form.Control
                as="textarea"
                id="body"
                name="body"
                rows={3}
                placeholder="Content"
                value={post.body}
                onChange={handleInputChange}
                required
              />
              <Form.Control.Feedback type="invalid">Please enter some content</Form.Control.Feedback>
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Card.Body>
      </CardContainer>
    </ContainerForm>
  );
}
