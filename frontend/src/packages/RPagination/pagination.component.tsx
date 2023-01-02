import { IPagination } from "./types/pagination";
import "./pagination.component.scss";
import ButtonComponent from "packages/RButton/button.component";
// import right_arrow from "../../assets/images/right_arrow.svg";
// import left_arrow from "../../assets/images/left_arrow.svg";
const PaginationComponent = ({
  changeCount,
  totalPages,
  pageIndex,
  prev,
  next,
}: IPagination) => {
  const paginate = (pageNumber: any) => {
    changeCount(pageNumber);
  };
  const prevHandle = () => {
    changeCount(pageIndex - 1);
  };
  const nextHandle = () => {
    changeCount(pageIndex + 1);
  };
  return (
    <>
      {totalPages >= 2 && (
        <ul className="pagination">
          <li className="prev_btn_div">
            <ButtonComponent
              disabled={!prev}
              classNames={
                prev ? " btn--transparent" : "disable btn--transparent"
              }
              click={prevHandle}
            >
              {/* <img src={left_arrow} alt="" /> */}
            </ButtonComponent>
          </li>

          <li
            onClick={() => paginate(1)}
            className={pageIndex === 1 ? "pagi_active" : ""}
          >
            1
          </li>

          {pageIndex - 2 > 1 && <li>...</li>}

          {pageIndex - 1 > 1 && (
            <li onClick={() => paginate(pageIndex - 1)}>{pageIndex - 1}</li>
          )}

          {pageIndex !== 1 && pageIndex !== totalPages ? (
            <li className="pagi_active">{pageIndex}</li>
          ) : (
            ""
          )}

          {pageIndex + 1 < totalPages && (
            <li onClick={() => paginate(pageIndex + 1)}>{pageIndex + 1}</li>
          )}

          {pageIndex + 2 < totalPages && <li>...</li>}

          <li
            onClick={() => paginate(totalPages)}
            className={pageIndex === totalPages ? "pagi_active" : ""}
          >
            {totalPages}
          </li>
          <li className="next_btn_div">
            <ButtonComponent
              disabled={!next}
              classNames={
                next ? "btn--transparent" : "disable btn--transparent"
              }
              click={nextHandle}
            >
              {/* <img src={right_arrow} alt="" /> */}
            </ButtonComponent>
          </li>
        </ul>
      )}
    </>
  );
};

export default PaginationComponent;
