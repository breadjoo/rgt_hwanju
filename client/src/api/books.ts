import axios from 'axios';
import type { Book } from '../types/book';
import {BookRequest} from "../types/bookRequest";

//책 전체목록
export const fetchBooks = () => axios.get<Book[]>('/api/books');
//책 상세 조회
export const fetchBook = (id: number) => axios.get<Book>(`/api/books/${id}`);
export const createBook = (data: BookRequest) => axios.post('/api/books', data);
//책 수정
export const updateBook = (id: number, data: BookRequest) => axios.put(`/api/books/${id}`, data);
//책 삭제
export const deleteBook = (id: number) => axios.delete(`/api/books/${id}`);
//재고 관리
export const patchBookStock = (id: number, stock: number) => axios.patch(`/api/books/${id}/stock`, { stock });