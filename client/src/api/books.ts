import api from './axiosInstance';
import type { Book } from '../types/book';
import { BookRequest } from '../types/bookRequest';

// 책 전체목록
export const fetchBooks = () => api.get<Book[]>('/api/books');
// 책 상세 조회
export const fetchBook = (id: number) => api.get<Book>(`/api/books/${id}`);
// 책 등록
export const createBook = (data: BookRequest) => api.post('/api/books', data);
// 책 수정
export const updateBook = (id: number, data: BookRequest) => api.put(`/api/books/${id}`, data);
// 책 삭제
export const deleteBook = (id: number) => api.delete(`/api/books/${id}`);
// 재고 관리
export const patchBookStock = (id: number, stock: number) =>
    api.patch(`/api/books/${id}/stock`, { stock });
