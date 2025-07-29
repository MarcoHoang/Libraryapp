import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BookList from "../components/BookList";
import SearchBar from "../components/SearchBar";
import { getAllBooks, deleteBook } from "../services/bookService";
import "../styles/Home.css";

export default function Home() {
  const [books, setBooks] = useState([]);
  const [searchParams, setSearchParams] = useState({
    title: "",
    author: "",
    category: "",
    status: ""
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const LIMIT = 5;
  const navigate = useNavigate();

  // Khi currentPage thay đổi, gọi fetchBooks với page mới
  useEffect(() => {
    fetchBooks(currentPage);
  }, [currentPage]);

  // Khi status thay đổi, reset trang 1 và gọi fetchBooks(1)
  useEffect(() => {
    if (searchParams.status !== "") {
      setCurrentPage(1);
      fetchBooks(1);
    }
  }, [searchParams.status]);

  // fetchBooks bắt buộc truyền page, không dùng mặc định
  const fetchBooks = async (page) => {
    try {
      const params = {
        ...searchParams,
        _page: page,
        _limit: LIMIT
      };

      const res = await getAllBooks(params);
      const totalCount = parseInt(res.headers["x-total-count"], 10);
      setBooks(Array.isArray(res.data) ? res.data : []);
      setTotalPages(Math.ceil(totalCount / LIMIT));
    } catch (err) {
      console.error("Lỗi khi fetch books:", err);
      setBooks([]);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa cuốn sách này?")) {
      try {
        await deleteBook(id);
        fetchBooks(currentPage);
      } catch (err) {
        console.error("Lỗi khi xóa sách:", err);
      }
    }
  };

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchParams((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setCurrentPage(1); // Reset trang khi tìm kiếm
    fetchBooks(1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div className="home-container">
      <h1>📚 Quản lý Thư viện</h1>

      <SearchBar
        filters={searchParams}
        onChange={handleSearchChange}
        onSubmit={handleSearchSubmit}
      />

      <button className="add-book-button" onClick={() => navigate("/add")}>
        ➕ Thêm sách
      </button>

      <BookList books={books} onDelete={handleDelete} />

      <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          ⬅ Trước
        </button>
        <span>
          Trang {currentPage} / {totalPages}
        </span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Tiếp ➡
        </button>
      </div>
    </div>
  );
}
