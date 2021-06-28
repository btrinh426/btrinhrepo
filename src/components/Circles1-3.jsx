import React from "react"

class FirstThreeCircles extends React.Component {

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
                    <h2>Limbo</h2>
                    <p>
                        According to the poem, Dante, along with Virgil, arrives at Limbo, the First Circle of Hell.
                        They had to cross the river Acheron on a boat to reach Limbo. The literal meaning of Limbo is ‘boundary’ or ‘edge.’
                        The First Circle contains people who did not accept Christ.
                        Limbo is filled with virtuous pagans, and people who were never baptized.
                        The people who don’t have enough faith to enter Heaven, but also were not sinful are sent to Limbo.
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
                    <h2>Lust</h2>
                    <p>
                        Limbo is succeeded by the Second Circle of Hell. People who were driven by Lust are tormented here.
                        In the poem, Dante says that strong violent winds blow in the Second Circle of Hell.
                        The violent winds drag and beat the tormenting souls on the rocks and mountains.
                        It symbolizes the supremacy of lust over the people which driven them to satisfy their never quenching thirst.
                        According to the poem, Dante sees many adulterous people such as Cleopatra, Dido, Helen of Troy, Tristan, Semiramis and many more over here.
                        Dante considers lust as a less-heinous crime as it involves more of mutual indulgence rather than being self-centered.
                        This could be a reason why Lust is the Second Circle of Hell.
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
                    <h2>Gluttony</h2>
                    <p>
                        In the Third Circle, souls of the people who indulged in voracious feasting and appetite are tortured.
                        The whole landscape is filled with putrefying mud and living organs.
                        The souls are punished by the icy and violent storm which rained foul, decaying sludge and mud onto them.
                        The storm also rained worms and human wastes upon them.
                        They are forced to gurgle around in the solid waste and mud. The monstrous dog beasts with three heads also lived in this circle.
                        The souls are tormented not only for their overindulging excessive eating and drinking but also for their other addictions.
                        Unlike Lust, Gluttony is a self-centered sin, and, hence it is considered much more heinous.
                    </p>
                    <p>
                        <button type="button"
                            className="btn btn-secondary"
                            onClick={this.onThirdButtonClicked}>
                            View details &raquo;
                        </button>
                    </p>
                </div>
            </React.Fragment>

        )
    }
}
export default FirstThreeCircles;