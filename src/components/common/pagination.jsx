import React from "react";
import _ from "lodash";
import "./pagination.css";
// import { ReactPropTypes } from "react";
import PropTypes from "prop-types";

const Pagination = (props) => {
    const { itemsCount: count, pageSize, onPageChange, currentPage } = props;
    const pagesCount = Math.ceil(count / pageSize);
    if (pagesCount === 1) return null;
    const pages = _.range(1, pagesCount + 1);
    return (
        <nav>
            <ul className="pagination">
                {pages.map((page) => (
                    <li
                        key={page}
                        className={
                            currentPage === page
                                ? "page-item active"
                                : "page-item"
                        }
                    >
                        <a
                            className="page-link"
                            onClick={() => onPageChange(page)}
                        >
                            {page}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

Pagination.propTypes = {
    itemsCount: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    currentPage: PropTypes.number.isRequired,
};

export default Pagination;