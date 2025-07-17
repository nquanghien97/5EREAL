'use client'

import React from 'react';
import { usePagination, DOTS } from '@/hooks/usePagination';
import styles from './pagination.module.css';

type PaginationProps = {
  onPageChange: (page: number) => void;
  totalCount: number;
  siblingCount?: number;
  currentPage: number;
  pageSize: number;
  className?: string;
};

const Pagination: React.FC<PaginationProps> = (props: PaginationProps) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });
  if (!paginationRange || currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  const lastPage = paginationRange[paginationRange.length - 1];

  return (
    <ul className={styles.paginationContainer}>
      <li
        className={`${styles.paginationItem} ${currentPage === 1 ? styles.disabled : ''
          }`}
        onClick={onPrevious}
      >
        <div className={`${styles.arrow} ${styles.left}`} />
      </li>
      {paginationRange.map((pageNumber, index) => {
        if (pageNumber === DOTS) {
          return (
            <li key={index} className={`${styles.paginationItem} ${styles.dots}`}>
              &#8230;
            </li>
          );
        }

        return (
          <li
            key={index}
            className={`${styles.paginationItem} ${pageNumber === currentPage ? styles.selected : ''
              }`}
            onClick={() => onPageChange(Number(pageNumber))}
          >
            {pageNumber}
          </li>
        );
      })}
      <li
        className={`${styles.paginationItem} ${currentPage === lastPage ? styles.disabled : ''
          }`}
        onClick={onNext}
      >
        <div className={`${styles.arrow} ${styles.right}`} />
      </li>
    </ul>
  );
};

export default Pagination;
