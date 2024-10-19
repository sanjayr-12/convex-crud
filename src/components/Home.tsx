import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Books } from "./Books";
import { useState } from "react";
import "../styles/home.css";

const Home = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const books = useQuery(api.queries.getBooks);
  console.log(books);
  const createBooks = useMutation(api.queries.createBooks);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    createBooks({ title, author })
      .then(() => {
        console.log("created");
        setTitle("");
        setAuthor("");
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="main-container">
      <h1>Book Collections</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="book title"
        />
        <br />
        <input
          type="text"
          name="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="book author"
        />
        <br />
        <input type="submit" />
      </form>
      {books ? <Books books={books} /> : "Loading..."}
    </div>
  );
};

export default Home;
