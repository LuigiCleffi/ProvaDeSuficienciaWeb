import { Button, Card, Form } from "react-bootstrap";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { CardContainer, ContainerForm } from "./styles";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosConfig";

interface Post {
  id?:number
  title: string;
  body: string;
}

export function PostsCreation() {
  const [validated, setValidated] = useState(false);
  const [post, setPost] = useState<Post>({ title: "", body: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const storedPost = localStorage.getItem("post");
    if (storedPost) {
      setPost(JSON.parse(storedPost));
    }
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      setValidated(true);
      return;
    }
    setValidated(true);
    try {
      const response = await axiosInstance.post("posts", {
        title: post.title,
        body: post.body,
      });
      console.log(response.data);
      localStorage.setItem("post", JSON.stringify(post));      
      navigate("/home");
      setPost({title: "", body: ""})
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });
  };

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
