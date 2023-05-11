import ReactPaginate from 'react-paginate';
import style from './Pagination.module.scss';

const Pagination = ({ onChangePage, pageCount }) => {
  return (
    <ReactPaginate
      className={style.paginate}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={(event) => onChangePage(event.selected + 1)}
      pageRangeDisplayed={4}
      pageCount={3}
      forcePage={pageCount - 1}
      renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;
