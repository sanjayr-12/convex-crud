import { useState } from "react";
import { book } from "../types/book.type";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";
import "../styles/book.css";

export const Books = ({ books }: { books: book[] }) => {
  const [update, setUpdate] = useState(false);
  const [id, setId] = useState("");

  const deleteBooks = useMutation(api.queries.deleteBooks);
  const updateStatus = useMutation(api.queries.updateStatus);

  const handleClick = (id: string) => {
    setId(id);
    setUpdate(!update);
  };

  const handleDelete = (id: string) => {
    deleteBooks({ id: id as Id<"books"> })
      .then((mess) => console.log(mess))
      .catch((err) => console.log(err));
  };

  const handleUpdate = (e: React.FormEvent<HTMLFormElement>, id: string) => {
    e.preventDefault();
    const formdata = new FormData(e.currentTarget);
    const isCompleted: boolean =
      (formdata.get("completed") as string) === "true";
    updateStatus({ id: id as Id<"books">, isCompleted })
      .then((mess) => console.log(mess))
      .catch((err) => console.log(err));
    setUpdate(false);
  };

  return (
    <div>
      {books.map((data: book, index: number) => {
        return (
          <div
            key={data._id}
            className={`book-container ${data.isCompleted ? "completed" : "not-completed"}`}
          >
            <h3>Book no: {index + 1}</h3>
            <p>Book title: {data.title}</p>
            <p>Book Author: {data.author}</p>
            <p>
              Completed Status:{" "}
              {data.isCompleted ? "Completed" : "Not Completed"}
            </p>
            <button onClick={() => handleClick(data._id)}>Update</button>
            {id === data._id && update && (
              <>
                <form onSubmit={(e) => handleUpdate(e, data._id)}>
                  <select name="completed">
                    <option value="true">Completed</option>
                    <option value="false">Not Completed</option>
                  </select>
                  <input type="submit" />
                </form>
              </>
            )}
            <button onClick={() => handleDelete(data._id)}>delete</button>
          </div>
        );
      })}
    </div>
  );
};
