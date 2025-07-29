import React from "react";
import styles from "./SearchBar.module.css";

export default function SearchBar({ filters, onChange, onSubmit }) {
  return (
    <form onSubmit={onSubmit} className={styles.searchForm}>
      <input
        type="text"
        name="title"
        placeholder="Tìm theo tên sách"
        value={filters.title}
        onChange={onChange}
      />
      <input
        type="text"
        name="author"
        placeholder="Tìm theo tác giả"
        value={filters.author}
        onChange={onChange}
      />
      <input
        type="text"
        name="category"
        placeholder="Tìm theo thể loại"
        value={filters.category}
        onChange={onChange}
      />
      <select name="status" value={filters.status} onChange={onChange}>
        <option value="">-- Trạng thái --</option>
        <option value="available">Còn hàng</option>
        <option value="borrowed">Hết hàng</option>
      </select>
      <button type="submit">🔍 Tìm kiếm</button>
    </form>
  );
}
