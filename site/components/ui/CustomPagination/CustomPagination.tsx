import { Pagination } from 'react-instantsearch-dom';
import './algolia-pagination-tailwind.module.css';

function CustomPagination() {
  return (
    <div className="flex items-center justify-center">
      <Pagination className="ais-Pagination" />
    </div>
  );
}

export default CustomPagination;