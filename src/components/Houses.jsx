import React, { Component } from "react";
import {
  getHouses,
  deleteHouses,
  updateHouses,
  postHouses,
} from "../services/houseService";
import HouseCard from "./HouseCard";

class Houses extends Component {
  state = {
    Houses: [],
    mappedHouses: [],
  };

  componentDidMount() {
    this.onGetHouses();
  }

  onGetHouses = () => {
    getHouses().then(this.onGetHousesSuccess).catch(this.onGetHousesError);
  };
  onGetHousesSuccess = (response) => {
    let houses = response.data.item.pagedItems;
    this.setState((prevState) => {
      return {
        ...prevState,
        houses,
        mappedHouses: houses.map(this.housesMapped),
        totalCount: response.data.item.totalCount,
      };
    });
    console.log(houses);
  };
  onGetHousesError = () => {
    console.warn();
  };

  onDeleteHousesClick = (houseId, statusId) => {
    console.log("onDeleteHousesClick");

    deleteHouses(houseId, statusId)
      .then(this.onDeleteHousesSuccess)
      .catch(this.onDeleteHousesError);
  };
  onDeleteHousesSuccess = (idDeleted) => {
    console.log("onDeleteJobsSuccess");
    // getHouses().then(this.onGetHousesSuccess).catch(this.onGetHousesError);
    this.setState((prevState) => {
      const indexOfHouses = prevState.mappedHouses.findIndex(
        (houses) => houses.props.house.id === idDeleted
      );

      console.log(indexOfHouses);

      const updatedHouses = [...prevState.mappedHouses];
      if (indexOfHouses >= 0) {
        updatedHouses.splice(indexOfHouses, 1);
      }
      return {
        mappedHouses: updatedHouses,
        formData: null,
      };
    });
  };

  onDeleteHousesError = (err) => console.log(err);

  housesMapped = (oneHouse) => {
    return (
      <HouseCard
        key={oneHouse.id}
        house={oneHouse}
        onDeleteJobsClick={this.onDeleteHousesClick}
        handleEditClick={this.onEdit}
      />
    );
  };

  onEdit = (oneHouse) => {
    console.log(oneHouse);
    this.props.history.push(`/jobs/${oneHouse.id}/edit`, {
      type: "house_Obj",
      payload: { oneHouse },
    });
  };
  handleInput = (e) => {
    console.log(e.target.value);
    this.setState({ searchTerm: e.target.value });
  };
  render() {
    return (
      <div>
        <input onChange={this.handleInput}></input>
        <div className="row">{this.state.housesMapped}</div>
      </div>
    );
  }
}
export default Houses;
