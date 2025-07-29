import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BookForm from "../components/BookForm";
import { getBookById, updateBook } from "../services/bookService";
import "../styles/EditBook.css";

export default function EditBook() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await getBookById(id);
        setBook(response.data);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu sách:", error);
      }
    };
    fetchBook();
  }, [id]);

  const handleUpdate = async (updatedBook) => {
    try {
      await updateBook(id, updatedBook);
      alert("Cập nhật sách thành công!");
      navigate("/");
    } catch (error) {
      console.error("Lỗi khi cập nhật sách:", error);
    }
  };

  return (
    <div className="edit-book-container">
      <h2>Chỉnh sửa sách</h2>
      {book ? (
        <BookForm initialValue={book} onSubmit={handleUpdate} />
      ) : (
        <p>Đang tải dữ liệu...</p>
      )}
    </div>
  );
}
