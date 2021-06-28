//Need to complete Testing for Search and Paginate

//Service Tests

let testPayload = {
  title: "React Test Add",
  bio: "React TestReact TestReact Test",
  summary: "React TestReact TestReact Test",
  headline: "React TestReact TestReact TestReact TestReact Test",
  slug: "React Test",
  statusId: 1,
  primaryImage:
    "https://icons.veryicon.com/png/Movie%20%26%20TV/Futurama%20Vol.%203%20-%20The%20Aliens/Brain%20Spawn.png",
  createdBy: "User-1",
  modifiedBy: "User-1",
  skills: ["React", "Javascript", "Jack Hammer"],
};
//Add
//add(testPayload).then(this.onAddTestSuccess).catch(this.onAddTestError);

let testUpdate = {
  id: 3,
  title: "React Test Update",
  bio: "React TestReact TestReact Test",
  summary: "React TestReact TestReact Test",
  headline: "React TestReact TestReact TestReact TestReact Test",
  slug: "React Test",
  statusId: 1,
  primaryImage:
    "https://icons.veryicon.com/png/Movie%20%26%20TV/Futurama%20Vol.%203%20-%20The%20Aliens/Brain%20Spawn.png",
  createdBy: "User-1",
  modifiedBy: "User-1",
  skills: ["High Jumper", "Javascript", "Higher Jumper"],
};

//Get By Id
//getById(3).then(this.onGetByIdTestSuccess).catch(this.onGetByIdTestError);

//console.log("Test Payload: ", testPayload);

// Update Test
// update(testUpdate.id, testUpdate)
//   .then(this.onUpdateTestSuccess)
//   .catch(this.onUpdateTestError);

//Select All
// selectAll()
//   .then(this.onSelectAllTestSuccess)
//   .catch(this.onSelectAllTestError);

// Paginate Call
// paginate(0, 10)
//   .then(this.onPaginateTestSuccess)
//   .catch(this.onPaginateTestError);

//search
// search(0, 10, "update")
//   .then(this.onSearchTestSuccess)
//   .catch(this.onSearchTestError);

onPaginateTestError = (err) => {
  console.log("onPaginateTestError is firing with error: ", err);
};

onPaginateTestSuccess = (response) => {
  console.log("onPaginateTestSuccess is firing with response: ", response);
};

onSearchTestError = (err) => {
  console.log("onSearchTestError is firing with error: ", err);
};

onSearchTestSuccess = (response) => {
  console.log("onSearchTestSuccess is firing with response: ", response);
};

onGetByIdTestError = (err) => {
  console.log("onGetByIdTestError is firing with error: ", err);
};

onGetByIdTestSuccess = (response) => {
  console.log("onGetByIdTestSuccess is firing with response: ", response);
};

onAddTestError = (err) => {
  console.log("onAddTestError is firing with error: ", err);
};

onAddTestSuccess = (response) => {
  console.log("onAddTestSuccess is firing with response: ", response);
};

onSelectAllTestError = (err) => {
  console.log("onSelectAllTestError is firing with error: ", err);
};

onSelectAllTestSuccess = (response) => {
  console.log("onSelectAllTestSuccess is firing with response: ", response);
};

onUpdateTestError = (err) => {
  console.log("onUpdateTestError is firing with error: ", err);
};

onUpdateTestSuccess = (response) => {
  console.log("onUpdateTestSuccess is firing with response: ", response);
};
