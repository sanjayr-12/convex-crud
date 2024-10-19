import { useState } from "react";
import { book } from "../types/book.type";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";

export const Display = ({ books }: { books: book[] }) => {
  const [update, setUpdate] = useState(false);
  const [id, setId] = useState("");

  const deleteBooks = useMutation(api.queries.deleteBooks);

  const handleClick = (id: string) => {
    setId(id);
    setUpdate(!update);
  };

  const handleDelete = (id: string) => {
    deleteBooks({ id: id as Id<"books"> })
      .then((mess) => console.log(mess))
      .catch((err) => console.log(err));
    };
    
    const handleSubmit = () => {
        
    }

  return (
    <div>
      {books.map((data: book) => {
        return (
          <div key={data._id}>
            <p>{data.title}</p>
            <p>{data.author}</p>
            <button onClick={() => handleClick(data._id)}>edit</button>
            {id === data._id && update && (
              <>
                <form onSubmit={handleUpdate}>
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
