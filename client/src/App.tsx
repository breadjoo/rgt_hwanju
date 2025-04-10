import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BookListPage from "./pages/BookListPage";
import BookDetailPage from "./pages/BookDetaiPage";
import BookFormPage from "./pages/BookFormPage";

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<BookListPage />} />
          <Route path="/books/:bookId" element={<BookDetailPage />} />
          <Route path="/books/new" element={<BookFormPage />} />
          <Route path="/books/edit/:id" element={<BookFormPage />} />
        </Routes>
      </Router>
  );
};

export default App;
