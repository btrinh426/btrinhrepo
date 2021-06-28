//!:DO NOT CALL setState WITHIN RENDER
//!: IF YOU NEED TO MAKE TWO CHANGES TO state DO SO IN ONE CALL TO setState

//step 1: (skeleton: var updater, parameters, return{}, .setState())

//componentDidMount(){
//var updater = (prevState, props) => {
//     return {}; 
// }
//}
//this.setState(updater)

//step 2: (line by line)
//a)the updater receives prevState and props
//b)copies newUser
//c)changes values of firstname
//d)returns object

//componentDidMount(){
// var updater = (prevState, props) =>{
//     var newUser = { ...prevState.currentUser }; 
//     newUser.firstName = "Michael"; 
//     return { currentUser: newUser }
// }
//}
//this.setState(updater)


//may be updated to the following code: 
// var updater = (prevState, props) => {
//     let currentUser = { ...prevState.currentUser}; 
//     currentUser.firstName = "Michael"; 
//     return { currentUser };
// }; 
//this.setState(updater); 
//note how the return statement returns a variable's name that is a property { currentUser }


//ARROW FUNCTION FORMAT: 
//this.setState((prevState, props) => {
//     let currentUser = { ...prevState.currentUser}; 
//     currentUser.firstName = "Michael"; 

//     return { currentUser }; 
// }); 
// )
//OR
//if you have only one parameter
//this.setState(prevState => {
//     let currentUser = { ...prevState.currentUser}; 
//     currentUser.firstName = "Michael"; 

//     return { currentUser }; 
// }); 
// )


//@16:40-20:50 how state components may be changed (new friend added)
//!: ONLY CALL SET STATE ONE TIME

//this.setState(prevState => {
//     let currentUser = { ...prevState.currentUser }; 
//     currentUser.firstName = "Michael"; 

//     const newFriends = [...currentUser.friends, { name: "Goofy"}]; 
//     currentUser.friends = newFriends; 

//     return { currentUser }; 
// })


//see @19:21
//constructor (props)? super (props)? how do they relate to setState? 









//VANILLA METHOD: (USE OTHER METHOD)
//step 0: use function componentDidMount()

//componentDidMount(){
//step 1: declare a new variable by setting the state    
//var newUser = {...this.state.currentUser}

//step 2: now you can change the name of the copy of currentUser 
//newUser.firstName = "Michael"

//step 3: use the function setState() 
//step 3a: 
//var newState = { currentUser: newUser }

//3b: 
// this.setState(newState); 
//}

//step 3a + 3b combined 
//this.setState({ currentUser: newUser})

//adding more properties
//this.setState({ currentUser: newUser, apples: "I love apples"}); 