import React from "react";
import BookItem from "./BookItem";
import { useNavigate } from "react-router-dom";
import styles from "./BookList.module.css";

export default function BookList({ books = [], onDelete }) {
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xoá sách này?")) {
      try {
        await onDelete(id); // gọi hàm xoá từ Home
      } catch (error) {
        console.error("Lỗi khi xoá sách:", error);
      }
    }
  };

  const handleEdit = (book) => {
    navigate(`/edit/${book.id}`);
  };

  if (books.length === 0) {
    return <p className={styles.noBooks}>Không có sách nào để hiển thị.</p>;
  }

  return (
    <div className={styles.listContainer}>
      {books.map((book) => (
        <BookItem
          key={book.id}
          book={book}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}
