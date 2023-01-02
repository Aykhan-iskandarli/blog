import React, { useEffect, useState } from "react";
import { accardion } from "./index";
import "./accardion.component.scss";
import DividerComponent from "packages/RDivider/divider.components";
import ButtonComponent from "packages/RButton/button.component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IAccardion } from "./types/accardion.types";
import PaginationComponent from "packages/RPagination/pagination.component";
import { useHistory } from "react-router-dom";

const AccardionComponent = ({faqs,more_acc,paginationData,fetchFAQ,paginate,question,PageSize}:IAccardion) => {
  const [selected, setSeleced] = useState(null);
  const history = useHistory()
  const goFaq = ()=>{
    history.push("/app/faq")
    window.scrollTo(0,0)
  }
  const toggle = (i: any) => {
    if (selected === i) {
      return setSeleced(null);
    }
    setSeleced(i);
  };
  return (
    <div className="accardion_section" id="faq">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="accardion_wrapper">
             {
               question && <h1>Sorğular</h1>
             }
              <ul className="accardion_list">
                {faqs &&
                  faqs.items?.map((acc: any, i: any) => (
                    <li
                      key={i}
                      onClick={() => toggle(i)}
                      className={`accardion_list_item ${
                        selected === i ? "active" : ""
                      }`}
                    >
                      <div className="accardion_title">
                        <p>{acc.title}</p>
                        <p
                          className={`accardion_icon ${
                            selected === i ? "active" : ""
                          }`}
                        >
                          <FontAwesomeIcon icon={"chevron-down"} />
                        </p>
                      </div>
                      <div className="answer_container">
                        <div
                          className={`accardion_answer ${
                            selected === i ? "content_show" : ""
                          }`}
                        >
                          <DividerComponent className="acc_divider" />
                          <p>{acc.description}</p>
                        </div>
                      </div>
                    </li>
                  ))}
              </ul>
             {
               paginate &&  <PaginationComponent
               totalCount={paginationData?.totalCount}
               totalPages={paginationData?.totalPages}
               prev={paginationData?.hasPreviousPage}
               next={paginationData?.hasNextPage}
               changeCount={fetchFAQ}
               pageIndex={faqs.pagination?.pageIndex}
               PageSize = {PageSize}
             />
             }

            </div>
          </div>
         {
           more_acc &&  <div className="col-12 text-center mt-40">
           <ButtonComponent classNames=" primary-btn btn--rounded-circle " click={goFaq}>
             Daha çox
           </ButtonComponent>
         </div>
         }
        </div>
      </div>
    </div>
  );
};

export default AccardionComponent;
