import React from "react";
import "./pagination.css"

const Pagination = ({ pages, currentPage, setCurrentPage }) => {
  const generatedPages = []
  for (let i = 1; i <= pages; i++) {
    generatedPages.push(i)
  }
  return (
    <div className="pagination">
      <button 
        className={currentPage === 0 ? "disabled" : "page previous"}
        disabled={currentPage === 0}
        onClick={() => setCurrentPage(current => current - 1)}
      >
        {"<"}
      </button>
      {generatedPages.map((page) => {
        return (
          <div 
            key={page} 
            className={currentPage === page ? "page active" : "page"}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </div>
        );
      })}
      <button 
        className={currentPage === pages ? "disabled" : "page next"}
        disabled={currentPage === pages}
        onClick={() => setCurrentPage(current => current + 1)}
      >
        {">"}
      </button>
    </div>
  );
};

export default Pagination;
