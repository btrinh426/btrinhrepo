import React from "react";
// import service from "./services/userService";
import SinglePresident from "./SinglePresident";

class Presidents extends React.Component {

    state = {
        names: ["George Washington", "John Adams", "Thomas Jefferson"],
        presidents: [{
            "id": 1,
            "president": 1,
            "nm": "George Washington",
            "pp": "None, Federalist",
            "tm": "1789-1797",
            "avatar":
                "https://www.history.com/.image/ar_4:3%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTU3OTIzNjc4MTIxMzcxNTk4/the-things-george-washington-worried-about-are-happening-todays-featured-photo.jpg"
        },
        {
            "id": 2,
            "president": 2,
            "nm": "John Adams",
            "pp": "Federalist",
            "tm": "1797-1801",
            "avatar":
                "https://www.history.com/.image/ar_4:3%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTU3ODc5MDg2NzA2ODYxNzkx/john_adams.jpg"
        },
        {
            "id": 3,
            "president": 3,
            "nm": "Thomas Jefferson",
            "pp": "Democratic-Republican",
            "tm": "1801-1809",
            "avatar":
                "https://upload.wikimedia.org/wikipedia/commons/b/b1/Official_Presidential_portrait_of_Thomas_Jefferson_%28by_Rembrandt_Peale%2C_1800%29%28cropped%29.jpg"
        },
        ],
    };

    componentDidMount() {

        this.setState((preState) => {
            return { mappedPresidents: preState.presidents.map(this.mapPresident) }
        });

        // service.getPresidents().then(this.onGetSuccess).catch(this.onGetError)
    }

    // onGetSuccess = (myPresidents) => {
    //     console.log(myPresidents);

    //     this.setState((preState) => {
    //         return { mappedPresidents: myPresidents.map(this.mapPresident) }
    //     });
    // }

    // onGetError = (error) => {
    //     console.log(error);
    // }

    onPresClick = (e) => {
        console.log(e.currentTarget.dataset);
        console.log(e.currentTarget.dataset.presId);
        //data-pres-id
        //presId
    }

    onPresClickFull = (pres) => {
        console.log(pres);
    }

    mapPresident = (onePresident) => {
        return (
            <React.Fragment key={`Presidents-${onePresident.id}`}>
                <SinglePresident
                    president={onePresident}
                    onClick={this.onPresClickFull}
                ></SinglePresident>
            </React.Fragment>
        );
    };

    mapPresidentSimple = (onePresident) => {
        return <p key={`Presidents-${onePresident.id}`}>{onePresident.nm}</p>;
    };

    render() {
        return (
            <div className="col-md-12 p-5">
                <h1>Presidents</h1>
                <hr />
                <div className="row">

                    {/*this.state.presidents.map(this.mapPresident)}*/}
                    {this.state.mappedPresidents}
                </div>

            </div>
        );
    }
}

export default Presidents;