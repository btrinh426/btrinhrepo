import React from "react";

class Practice extends React.Component {
  state = {
    wizards: [
      {
        name: "Harry Potter",
        id: 1,
        house: "Gryffindor",
        avatar:
          "https://api.time.com/wp-content/uploads/2014/07/301386_full1.jpg?w=600&quality=85",
      },
      {
        name: "Luna Lovegood",
        id: 2,
        house: "Ravenclaw",
        avatar:
          "https://images.ctfassets.net/usf1vwtuqyxm/Mam68Vfou2OO6kqEcyW8W/41657e4dbb7d42d2cab591276105bcc1/LunaLovegood_WB_F6_LunaLovegoodInQuibblerSpecsOnHogwartsExpress_Still_080615_Port.jpg?w=1200&fit=fill&f=top",
      },
      {
        name: "Draco Malfoy",
        id: 3,
        house: "Slytherin",
        avatar:
          "https://hips.hearstapps.com/cos.h-cdn.co/assets/14/52/nrm_1419259388-draco-malfoy.jpg",
      },
    ],
  };

  mapWizards = (wizard) => {
    return (
      <div
        key={`Wizards-${wizard.id}`}
        className="card"
        style={{ width: "18rem" }}
      >
        <img src={wizard.avatar} className="card-img-top" alt="..."></img>
        <div className="card-body">
          <h5 className="card-title">{wizard.name}</h5>
          <p className="card-text" name="house">
            {wizard.house}
          </p>
        </div>
      </div>
    );
  };

  render() {
    return (
      <React.Fragment>
        <h1>THIS IS A PRACTICE MAP</h1>
        <div> {this.state.wizards.map(this.mapWizards)}</div>
      </React.Fragment>
    );
  }
}
export default Practice;
