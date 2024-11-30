import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginateProps {
  currentPage: number;
  totalPages: number;
  paginationRange: number[];
  goToPage: (page: number) => void;
  goToPreviousPage: () => void;
  goToNextPage: () => void;
}

export const Paginate: React.FC<PaginateProps> = ({
  currentPage,
  totalPages,
  paginationRange,
  goToPage,
  goToPreviousPage,
  goToNextPage,
}) => {
  return totalPages > 1 ? (
    <Pagination className="my-4 gap-2">
      <PaginationPrevious onClick={goToPreviousPage} />
      <PaginationContent>
        {paginationRange.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              isActive={page === currentPage}
              onClick={() => goToPage(page)}
            >
              {page + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
      </PaginationContent>
      <PaginationNext onClick={goToNextPage} />
    </Pagination>
  ) : null;
};
