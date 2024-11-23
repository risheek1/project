import React, { useMemo, useState } from 'react';

const Paginator = ({
	totalPages,
	pagesPerView,
	currentPage,
	onClick,
}: {
	totalPages: number;
	pagesPerView: number;
	currentPage: number;
	onClick: (pageNumber: number) => void;
}) => {
	const getPagingRange = (current: number, { min = 1, total = 20, length = 7 } = {}) => {
		if (length > total) {
			length = total;
		}

		let start = current - Math.floor(length / 2);
		start = Math.max(start, min);
		start = Math.min(start, total - length + 1);
		return Array.from({ length: length }, (el, i) => start + i);
	};
	const paginationRange = getPagingRange(currentPage, {
		min: 1,
		total: totalPages,
		length: pagesPerView,
	});
	return (
		<div className="paginator">
			<div className="paginator__btnContainer">
				<button
					onClick={() => {
						onClick(currentPage - 1);
					}}
					disabled={currentPage === 1}
					aria-label="Previous Page"
					aria-disabled={currentPage === 1}
				>
					{'<'}
				</button>

				{paginationRange.map((pageNo) => (
					<button
						key={pageNo}
						aria-label={`Page ${pageNo}`}
						onClick={() => {
							onClick(pageNo);
						}}
						className={pageNo == currentPage ? 'selectedBtn' : ''}
					>
						{pageNo}
					</button>
				))}
				<button
					onClick={() => {
						onClick(currentPage + 1);
					}}
					disabled={currentPage === totalPages}
					aria-label="Next Page"
					aria-disabled={currentPage === totalPages}
				>
					{'>'}
				</button>
			</div>
		</div>
	);
};

export default Paginator;
