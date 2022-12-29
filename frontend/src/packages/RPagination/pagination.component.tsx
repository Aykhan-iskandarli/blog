
import ButtonComponent from "packages/RButton/button.component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./pagination.component.scss"
import left from "../../assets/images/icons/left-arrow-dark.svg"
import right from "../../assets/images/icons/right-arrow-dark.svg"
import { IPagination } from "./types/pagination.types";

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
                <ul className="pagination pagination-no_spacing">
                    <li className="prev_btn_div">
                        <ButtonComponent
                            disabled={!prev}
                            className={
                                prev ? " btn--transparent" : "disable btn--transparent"
                            }
                            click={prevHandle}
                        >
                           <img src={left} alt="left" />
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
                            className={
                                next ? "btn--transparent" : "disable btn--transparent"
                            }
                            click={nextHandle}
                        >
                            <img src={right} alt="right" />
                        </ButtonComponent>
                    </li>
                </ul>
            )}
        </>
    );
};

export default PaginationComponent;
