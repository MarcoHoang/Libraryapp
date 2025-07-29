import axios from "axios";

const API_URL = "http://localhost:3001";

export const getAllBooks = (params = {}) => {
  const queryParams = {};

  if (params.title) {
    queryParams.title_like = params.title;
  }
  if (params.author) {
    queryParams.author_like = params.author;
  }
  if (params.category) {
    queryParams.category_like = params.category;
  }

  if (params.status) {
    queryParams.status = params.status;
  }

  if (params._page) {
    queryParams._page = params._page;
  }
  if (params._limit) {
    queryParams._limit = params._limit;
  }

  return axios.get(API_URL, { params: queryParams });
};

export const getBookById = (id) => axios.get(`${API_URL}/${id}`);

export const createBook = (book) => axios.post(API_URL, book);

export const updateBook = (id, book) => axios.put(`${API_URL}/${id}`, book);

export const deleteBook = (id) => axios.delete(`${API_URL}/${id}`);
