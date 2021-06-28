import React from "react";
// import * as friendServices from "../../services/friendsService";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";

import "../HomieStyle/Homies.scss";

class ShowFriends extends React.Component {
    state = {
        current: 0,
    };

    componentDidMount() {
        this.setState({ current: this.props.pageIndex });
    }

    onChange = page => {
        let currentIndex = { ...this.state.current };
        let nextIndex = (currentIndex += 4);

        console.log(page);
        this.setState({
            current: nextIndex,
        });
    };
    render() {
        let testFriends = this.props.mappedFriends;
        return (
            <>
                <Pagination
                    total={this.props.totalFriends}
                    className="paged"
                    pageSize={3}
                    onChange={this.onChange}
                    current={this.state.current}
                />
                <div className="row row-cols-1 row-cols-md-3 cards-row">
                    {testFriends}
                </div>
            </>
        );
    }
}

export default ShowFriends;
