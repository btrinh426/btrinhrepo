import axios from "axios";

const endpointURL = "https://api.remotebootcamp.dev/api/entities";

const addEntity = (entity) => {
    const config = {
        method: "POST",
        url: `${endpointURL}/${entity.name}`,
        data: entity,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
      };
    
      return axios(config);
}

export {addEntity};