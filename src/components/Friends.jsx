import React from "react";
import * as Userservices from"../services/AxiosService"
import * as Responseservices from"../services/serviceHelper"
import SingleFriend from"./SingleFriend"

class Friends extends React.Component
{

  state=
    
  {
      currentFriend:{
    //     name: ["Friend 1","Friend 2","Friend 3"],
    //     nameArry:[{name:"Friend 1", id:1   ,
    //     imgUrl:"https://cdn.pixabay.com/photo/2016/09/07/11/37/tropical-1651426__340.jpg"
    // }
    //     , {name:"King Piccolo", id:2 ,
    //     imgUrl:"https://img1.pnghut.com/0/16/23/Biqmq9M0gD/organism-fictional-character-face-king-piccolo-mythical-creature.jpg"},
    //     {name:"Goku", id:3,
    //      imgUrl:"https://i.pinimg.com/originals/0b/b3/36/0bb3363be26836fdc7ebfa1c9b8d94d6.jpg"
    //     },

    //     {name:"Prince Vegeta", id:4   ,
    //     imgUrl:"https://ih1.redbubble.net/image.1070861259.8846/fpp,small,lustre,wall_texture,product,750x1000.jpg"
    // }
    //     , {name:"Kid Buu", id:5,
    //     imgUrl:"https://ih1.redbubble.net/image.1078670991.4585/fposter,small,wall_texture,product,750x1000.jpg"},
    //     {name:"Goku Black", id:6,
    //      imgUrl:"https://www.pngitem.com/pimgs/m/108-1088196_goku-face-png-dragon-ball-z-goku-black.png"
    //     }
      
    //   ],

      "title": "",
"bio": "",
"summary": "",
"headline": "",
"slug": "",
"statusId": 1,
"primaryImage": ""

      }
  }


  componentDidMount(){
    // this.setState((prevState)=>
    // {
    //     return { mappedFriends: prevState.currentFriend.nameArry.map(this.mapFriends) };
    // });
    Userservices.friendCurrent()
    .then(this.friendRequestSuccess)
    .catch(this.friendReqErr)
  }
  friendRequestSuccess=(myFriends)=>
{    
    Responseservices.onGlobalSuccess()
    console.log(myFriends.data.item.pagedItems)
    let friendResponse =myFriends.data.item.pagedItems;
    this.setState((prevState)=>
     {
       
         return { mappedFriends: friendResponse.map(this.mapFriends) };
     });
  
}
  mapFriends=(oneFriend)=>
  { 
        // var result=oneFriend.name;
        
        return ( 
        <React.Fragment key={`FriendsList-${oneFriend.id}`}>
          <SingleFriend currentFriend={oneFriend} onClick={this.onSelectedFriendEdit}></SingleFriend>      
      </React.Fragment>
        )
  }
onBtnClick=(e)=>{
  console.log(e.currentTarget.dataset)
  console.log(e.currentTarget.dataset.friendId)
    // Userservices.friendCurrent()
    // .then(this.onEditCurrentFriend)
    // .then(this.friendRequestSuccess)
}


friendReqErr=(e)=>
{
    console.log(e)
    Responseservices.onGlobalError()
  
}


mapFriendsSimple=(oneFriend)=>
{ 
      // var result=oneFriend.name;
      
      return <p key={`FriendsList-${oneFriend.id}`}>{oneFriend.name}</p>;
    
}

onFriendClickFull=(friend)=>{
  // let currentTargeta=e.currentTarget;
  console.log(friend)
    // console.log( this.mapFriends.oneFriend.primaryImage.id)
 
}

onSelectedFriendEdit=(friend)=>
{
  console.log(friend.id)
  
  this.setState(()=>
  {
  //  this.formData=friend 


    // <SingleFriend fdata={friend}> </SingleFriend>
// let fdata =this.formData:friend
    return {formData:friend}
// return (
  // < fdata={formData}> </SingleFriend>
// )
  })
 
}

editValHandler=(e)=>
{
  let currentTarget = e.currentTarget;
let currentVal = currentTarget.value;
let currentName=currentTarget.name;
this.setState((a)=>
  {
let formData={...a.formData};
formData[currentName]=currentVal;
return {formData};
  })
}


    render()
    {
        return(
            <div className="" style={{float:""}}>

<div 
style={{textAlign:"center",
backgroundColor:"#668cff",color:"white", borderRadius:"50%",width:"35%",margin:"auto",marginLeft:"40%", height:"60px"}}>
 <h2 > Friends Profile</h2>
</div>
<div> {this.state.formData &&(
    <div><form>
      <label>Name</label>
      <input type="text"
      name="title"
      onChange={this.editValHandler}
      value={this.state.formData.title}
      placeholder={this.state.currentFriend.title}
      ></input>
        <label>Name</label>
      <input type="text"
      name="bio"
      onChange={this.editValHandler}
      value={this.state.formData.bio}
      // placeholder={this.state.currentFriend.bio}
      ></input>
        <label>Name</label>
      <input type="text"
      name="summary"
      onChange={this.editValHandler}
      value={this.state.formData.summary}
      // placeholder={this.state.currentFriend.summary}
      ></input>
        <label>Name</label>
      <input type="text"
      name="headline"
      onChange={this.editValHandler}
      value={this.state.formData.headline}
      placeholder={this.state.currentFriend.headline}
      ></input>
        <label>Name</label>
      <input type="text"
      name="slug"
      onChange={this.editValHandler}
      value={this.state.formData.slug}
      placeholder={this.state.currentFriend.slug}
      ></input>
        <label>Name</label>
      <input type="text"
      name="title"
      onChange={this.editValHandler}
      value={this.state.formData.title}
      placeholder={this.state.currentFriend.title}
      ></input>
        <label>Name</label>
      <input type="text"
      name="title"
      onChange={this.editValHandler}
      value={this.state.formData.title}
      placeholder={this.state.currentFriend.title}
      ></input>
      </form></div>
  )}
  </div>
              {/* <h2 className="text-muted" style={{textAlign:"center"}}>Friends:</h2> */}
              <hr style={{width:"80%", backgroundColor:"black", height:"",maring:"auto",marginLeft:"18%"}}></hr>

            <div className="row"  style={{width:""}}>
                         
                
              {/* {this.state.currentFriend.nameArry.map(this.mapFriends)} */}
              

{this.state.mappedFriends}


              


{/* <template> 
              <div className="col-sm">
                One of three columns
    <div className="card" style={{width: "14rem"}}>
  
  <img className="card-img-top" src="

 https://cdn.pixabay.com/photo/2016/09/07/11/37/tropical-1651426__340.jpg
  
  " alt="Card cap"  style={{borderRadius: "50%", width:"70%", margin:"auto"}}></img>
  
  <hr></hr>
 
 
  <div className="card-body">
    <h5 className="card-title">Card title</h5>
    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <span href="" className="btn btn-primary">Go somewhere</span>
  </div>
  
  
</div>
</div>

</template> */}

                {/* <button type="button" onClick={this.onBtnClick}>Get Friends</button> */}

          
            
            </div>
          </div>
        )
    }
}
export default Friends;