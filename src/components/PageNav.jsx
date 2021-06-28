import React from "react";
// import { pageOfPeople } from '../services/friendServices';

// this is a component that will render the total pages you need for the pagination process with working buttons for that specific page
// the goal is to make it so that all you have to do is add this component to a page, and the pagination process will be used ONLY FOR THAT PAGE....

class PageNav extends React.Component {
  state = {};

  createPageNav = () => {
    var totPageNo = this.props.totalPages;
    var allPagesArr = this.makePageArr(totPageNo);
    var mappingBtn = allPagesArr.map(this.mapPageBtn);

    // console.log(allPagesArr)
    // console.log(mappingBtn)

    return mappingBtn;
  };

  makePageArr = (totalPageNumber) => {
    var pagesArr = [];
    var recursePageNum = (num) => {
      if (num > 0) {
        pagesArr.unshift(num);
        recursePageNum(num - 1);
      }
    };

    recursePageNum(totalPageNumber);

    return pagesArr;
  };

  mapPageBtn = (btn) => {
    return (
      <React.Fragment key={`page-${btn}`}>
        <li className="page-item">
          <button
            className="page-link"
            data-no={btn - 1}
            onClick={this.onPageChangeClicked}
          >
            {btn}
          </button>
        </li>
      </React.Fragment>
    );
  };

  onPageChangeClicked = (e) => {
    var pageI = e.currentTarget.getAttribute("data-no");

    this.props.onPageClick(pageI);
  };

  render() {
    //  console.log(this.props.totalPages?
    //     `you have ${this.props.totalPages} pages to render btns for`
    //     :"you dont have this.props.totalPages// make sure you pass totalpages var to this component")

    return (
      <React.Fragment>
        <div>
          <nav aria-label="...">
            <ul className="pagination">{this.createPageNav()}</ul>
          </nav>
        </div>
      </React.Fragment>
    );
  }
}

export default PageNav;
