import React from "react"

class NextThreeCircles extends React.Component {
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
                    <h2>Greed</h2>
                    <p>
                        The person who condemns the sin of greed is punished in the fourth circle of hell.
                        The Circle is divided into two groups of people- the ones who spent lavishly and those who hoarded for the great and imperial possession, which is irrelevant.
                        Plutus, the God of Wealth, guards the inner circle of greed.
                        It includes cardinals, clergyman, and also the popes who accumulated possession and wasteful extravagance and foolishly misused others’ money for their own benefits.
                        It refers to people as if they lost their soul and carry a huge weight on the chest; they themselves choose to suffer to attain higher possession.
                        The greed indulgence of two parties has lured them in the self-pity of misery and lies, which is never enough to suffice their appetite for never-ending greed.
                        Hoarding and squandering have led to the indifference to come to mutual antagonism.
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
                    <h2>Wrath</h2>
                    <p>
                        Fifth Circle of Hell is present in the stinking, decaying water of the Styx river. In this Circle live the souls who lived their entire life wrathfully.
                        According to the poem, Dante along with Virgil find the souls to fight each other furiously on the surface of the Styx river.
                        Depending on the severity of their wrathful actions they sink in the river water.
                        It reflects the type of sins they committed in their life. People who indulged in a silent sullen lie just below the surface.
                        The people who were highly driven by their anger struggle deep inside in the river.
                        The souls struggle and fight each other for eternity. They choke each other and stop each other from expressing or speaking.
                        The act represents their anger which when expressed would harm other people.
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
                    <h2>Heresy</h2>
                    <p>
                        The Sixth Circle of Hell marks the beginning of Lower Hell.
                        The souls being tortured in the successive Circles committed heinous crimes and are punished with a severely tortured climate.
                        The souls of people who denied the cores of Christianity are trapped in flaming hot tombs.
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

export default NextThreeCircles;