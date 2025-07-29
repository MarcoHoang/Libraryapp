import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBookById } from "../services/bookService";
import "../styles/BookDetail.css";

export default function BookDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      const data = await getBookById(id);
      setBook(data);
    };
    fetchBook();
  }, [id]);

  if (!book) return <p className="loading">Đang tải chi tiết sách...</p>;

  return (
    <div className="book-detail-container">
      <h2>{book.title}</h2>
      <div className="book-detail-content">
        <img src={book.coverUrl} alt={book.title} />
        <div className="book-info">
          <p><strong>Tác giả:</strong> {book.author}</p>
          <p><strong>Thể loại:</strong> {book.category}</p>
          <p><strong>Nhà xuất bản:</strong> {book.publisher}</p>
          <p><strong>Năm xuất bản:</strong> {book.publishedYear}</p>
          <p><strong>Mô tả:</strong> {book.description}</p>
          <p><strong>Trạng thái:</strong> {book.status === "available" ? "Có sẵn" : "Hết sách"}</p>
        </div>
      </div>
      <button className="back-button" onClick={() => navigate("/")}>← Quay lại</button>
    </div>
  );
}
