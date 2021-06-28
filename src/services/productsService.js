import axios from "axios";

var entityUrl = { endpoint: "https://api.remotebootcamp.dev/api/entities/" }

function createEntity(payload) {

    var payloadData =
    {
        "entityName": [payload.entityName],
        "name": [payload.name],
        "manufacturer": [
            payload.manufacturer
        ],
        "description": [
            payload.description
        ],
        "cost": [
            payload.cost
        ]
    }

    const config = {
        method: "POST",
        url: entityUrl.endpoint + payloadData.entityName,
        data: payload,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config);
};


export default createEntity 