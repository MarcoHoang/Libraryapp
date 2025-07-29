import React from "react";
import styles from "./BookItem.module.css";

export default function BookItem({ book, onEdit, onDelete }) {
  return (
    <div className={styles.container}>
      <img src={book.coverUrl} alt={book.title} className={styles.cover} />
      <div className={styles.info}>
        <h2 className={styles.title}>{book.title}</h2>
        <p><strong>Tác giả:</strong> {book.author}</p>
        <p><strong>Thể loại:</strong> {book.category}</p>
        <p><strong>Nhà xuất bản:</strong> {book.publisher}</p>
        <p><strong>Năm xuất bản:</strong> {book.publishedYear}</p>
        <p>
          <strong>Trạng thái:</strong>{" "}
          <span style={{ color: book.status === "available" ? "green" : "red", fontWeight: "bold" }}>
            {book.status === "available" ? "Còn hàng" : "Hết hàng"}
          </span>
        </p>
        <p className={styles.description}><strong>Mô tả:</strong> {book.description}</p>

        <div className={styles.actions}>
          <button onClick={() => onEdit(book)} className={styles.buttonEdit}>Sửa</button>
          <button onClick={() => onDelete(book.id)} className={styles.buttonDelete}>Xoá</button>
        </div>
      </div>
    </div>
  );
}
