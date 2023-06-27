import { MAX_POST_PAGE } from '../constants/variable';

export function PostPagination({ currentPage, setCurrentPage }) {
  return (
    <div className='pages'>
      <button
        disabled={currentPage <= 1}
        onClick={() => {
          setCurrentPage((prevPage) => prevPage - 1);
        }}
      >
        Previous page
      </button>
      <span>Page {currentPage}</span>
      <button
        disabled={currentPage === MAX_POST_PAGE}
        onClick={() => {
          setCurrentPage((prevPage) => prevPage + 1);
        }}
      >
        Next page
      </button>
    </div>
  );
}
