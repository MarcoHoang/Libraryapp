import React, { useState, useEffect } from "react";
import styles from "./BookForm.module.css";

export default function BookForm({ initialValue, onSubmit }) {
  const [form, setForm] = useState({
    title: "",
    author: "",
    category: "",
    publisher: "",
    publishedYear: "",
    description: "",
    status: "available",
    coverUrl: ""
  });

  const [errors, setErrors] = useState({});

  // Nếu có dữ liệu ban đầu (sửa sách), thì setForm
  useEffect(() => {
    if (initialValue) {
      setForm(initialValue);
    }
  }, [initialValue]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.title) newErrors.title = "Vui lòng nhập tên sách";
    if (!form.author) newErrors.author = "Vui lòng nhập tác giả";
    if (!form.category) newErrors.category = "Vui lòng nhập thể loại";
    if (!form.publisher) newErrors.publisher = "Vui lòng nhập nhà xuất bản";
    if (!form.publishedYear) newErrors.publishedYear = "Vui lòng nhập năm xuất bản";
    if (!form.coverUrl) newErrors.coverUrl = "Vui lòng nhập URL ảnh bìa";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(form);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.heading}>
        {initialValue ? "✏️ Chỉnh sửa sách" : "➕ Thêm sách mới"}
      </h2>

      <label>Tiêu đề sách</label>
      <input name="title" value={form.title} onChange={handleChange} />
      {errors.title && <span className={styles.error}>{errors.title}</span>}

      <label>Tác giả</label>
      <input name="author" value={form.author} onChange={handleChange} />
      {errors.author && <span className={styles.error}>{errors.author}</span>}

      <label>Thể loại</label>
      <input name="category" value={form.category} onChange={handleChange} />
      {errors.category && <span className={styles.error}>{errors.category}</span>}

      <label>Nhà xuất bản</label>
      <input name="publisher" value={form.publisher} onChange={handleChange} />
      {errors.publisher && <span className={styles.error}>{errors.publisher}</span>}

      <label>Năm xuất bản</label>
      <input
        name="publishedYear"
        type="number"
        value={form.publishedYear}
        onChange={handleChange}
      />
      {errors.publishedYear && <span className={styles.error}>{errors.publishedYear}</span>}

      <label>Trạng thái</label>
      <select name="status" value={form.status} onChange={handleChange}>
        <option value="available">Còn hàng</option>
        <option value="unavailable">Hết hàng</option>
      </select>

      <label>Ảnh bìa (URL)</label>
      <input name="coverUrl" value={form.coverUrl} onChange={handleChange} />
      {errors.coverUrl && <span className={styles.error}>{errors.coverUrl}</span>}

      <label>Mô tả</label>
      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        rows="4"
      />

      <button type="submit" className={styles.submitBtn}>
        {initialValue ? "Lưu thay đổi" : "Thêm sách"}
      </button>
    </form>
  );
}
