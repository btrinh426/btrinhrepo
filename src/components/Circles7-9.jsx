import React from "react"

class LastThreeCircles extends React.Component {
    onFirstButtonClicked = (e) => {
        console.log(" First button was clicked", e.currentTarget)
    }
    onSecondButtonClicked = (e) => {
        console.log(" Second button was clicked", e.currentTarget)
    }
    onThirdButtonClicked = (e) => {
        console.log(" Third button was clicked", e.currentTarget)
    }

    render() {
        return (
            <React.Fragment>
                <div className="col-md-4">
                    <h2>Violence</h2>
                    <p>
                        The souls of people who indulged in violence are put to punishment and torture in the Seventh Circle of Hell.
                        It is further divided into three Rings. The souls are sent to suffer in the circles depending on the severity of their violence.
                        The First Ring tortured souls of people who are violent against their neighbors. The Second Ring torments the souls of people who were violent towards themselves.
                        The Third Ring has souls of people who showed violence against God, Nature or Art.
                    </p>
                    <p>
                        <button type="button"
                            className="btn btn-secondary"
                            onClick={this.onFirstButtonClicked}>
                            View details &raquo;
                </button>
                    </p>
                </div>
                <div className="col-md-4">
                    <h2>Fraud</h2>
                    <p>
                        The Eighth Circle of Hell is Malebolge, meaning Evil Ditches.
                        This is the place where people who committed frauds and malicious crimes are tortured.
                        This circle is divided into Ten Ditches or Bolgia.
                </p>
                    <p>
                        <button type="button"
                            className="btn btn-secondary"
                            onClick={this.onSecondButtonClicked}>
                            View details &raquo;
                    </button>
                    </p>
                </div>
                <div className="col-md-4">
                    <h2>Treachery</h2>
                    <p>
                        The Ninth Circle of Hell is a frozen lake called Cocytus. It also has Here Centre of Hell, where Satan resides.
                        The souls are frozen in the depths of Lake depending on the type and severity of their sins.
                        The ones who committed a more severe crime or sin are buried deeper.
                        The Ninth Circle is divided into four Rounds.
                </p>
                    <p>
                        <button type="button"
                            className="btn btn-secondary"
                            onClick={this.onThirdButtonClicked}>
                            View details &raquo;
                    </button>
                    </p>
                </div>
            </React.Fragment>)
    }
}

export default LastThreeCircles;