import React, { useState } from "react"
import ReactPaginate from "react-paginate"

function Pages(props) {
	const [pageNumber, setPageNumber] = useState(0)

	const usersPerPage = 4
	const pagesVisited = pageNumber * usersPerPage

	const displayUsers = !props.searchedUsers
		? props.users
				.slice(pagesVisited, pagesVisited + usersPerPage)
				.map(props.mapFriend)
		: props.searchedUsers
				.slice(pagesVisited, pagesVisited + usersPerPage)
				.map(props.mapFriend)

	const pageCount = Math.ceil(props.users.length / usersPerPage)
	const changePage = ({ selected }) => {
		setPageNumber(selected)
	}

	return (
		<>
			{displayUsers}

			<div className="pageButtons">
				<ReactPaginate
					previousLabel={"Previous"}
					nextLabel={"Next"}
					pageCount={pageCount}
					onPageChange={changePage}
					containerClassName={"paginationButtons"}
					previousLinkClassName={"previousButtons"}
					nextLinkClassName={"nextButtons"}
					disabledClassName={"paginationDisabled"}
					activeClassName={"paginationActive"}
				/>
			</div>
		</>
	)
}

export default Pages
