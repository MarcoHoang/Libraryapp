import React from "react";
import { useNavigate } from "react-router-dom";
import BookForm from "../components/BookForm";
import { createBook } from "../services/bookService";
import "../styles/AddBook.css";

export default function AddBook() {
  const navigate = useNavigate();

  const handleAdd = async (book) => {
    await createBook(book);
    navigate("/");
  };

  return (
    <div className="add-book-container">
      <h2>Thêm sách mới</h2>
      <BookForm onSubmit={handleAdd} />
    </div>
  );
}
