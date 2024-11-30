import { useState } from "react";

interface UsePaginationProps<T> {
  items: T[];
  itemsPerPage: number;
}

export function usePagination<T>({
  items,
  itemsPerPage,
}: UsePaginationProps<T>) {
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(items.length / itemsPerPage);

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
  };

  const goToPreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(0, Math.min(page, totalPages - 1)));
  };

  const goToLastPage = () => {
    setCurrentPage(totalPages);
  };

  const goToFirstPage = () => {
    setCurrentPage(0);
  };

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentItems = items.slice(startIndex, endIndex);

  const paginationRange = Array.from(
    { length: totalPages },
    (_, index) => index
  );

  return {
    currentPage,
    totalPages,
    goToNextPage,
    goToPreviousPage,
    goToPage,
    goToLastPage,
    goToFirstPage,
    currentItems,
    paginationRange,
  };
}
