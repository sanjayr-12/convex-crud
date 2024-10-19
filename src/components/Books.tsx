import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Display } from "./Display";
import { useState } from "react";

const Books = () => {
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
          setTitle("")
          setAuthor("")
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" value={title} onChange={(e)=>setTitle(e.target.value)}/>
        <br />
        <input type="text" name="author" value={author} onChange={(e)=>setAuthor(e.target.value)}/>
        <br />
        <input type="submit" />
      </form>
      {books && <Display books={books} />}
    </div>
  );
};

export default Books;
