import axios from "axios";

let userEndpoint = "https://api.remotebootcamp.dev/api/techcompanies";
let techCompanyNames = [];
let pageIndex = 0;
const pageSize = 2;

// "https://api.remotebootcamp.dev/api/techcompanies?pageIndex=0&pageSize=20"
const getTechCompanies = (idx, pageSize) => {
    const config = {
        method: "GET",
        url: `${userEndpoint}?pageIndex=${idx}&pageSize=${pageSize}`,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config);     
}

  ///////////////////// return list of tech company names

  // keep calling until 404 error (have all companies)
  const getTechCompanyNames = () => {
    techCompanyNames = [];
    getPageOfTechCompanies ();
  };

  const getPageOfTechCompanies = () => {
    getTechCompanies(pageIndex++, pageSize)
      .then(getTechCompaniesSuccess)
      .catch(getTechCompaniesError);
  }

  const mapForTitle = (company) => {
    return company.name;
  };

  const getTechCompaniesSuccess = (response) => {
    let companyTitles = response.data.item.pagedItems.map(mapForTitle);
    techCompanyNames = techCompanyNames.concat (companyTitles);

    getPageOfTechCompanies();
  };

  // JTG send tech company names to caller
  // JTG: response -> 404 Not Found means have all companies
  const getTechCompaniesError = (response) => {
    console.log(techCompanyNames);

  };


export { getTechCompanyNames };