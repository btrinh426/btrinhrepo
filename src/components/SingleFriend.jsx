import React from "react";



function SingleFriend(props)
{
    const oneFriend =props.currentFriend

    const onFriendClickFull=function (){
        props.onClick(oneFriend)
        // console.log(oneFriend.id)
// if(oneFriend.id)
// {
//   onSelectedFriendEdit(oneFriend.id)
// }
    };

//   const onSelectedFriendEdit=(id)=>
// {
//   console.log(id)
  
// }

    return (

        <div  className="card col-md-3"
             style={{minWidth: "",maxHeight:"450px", overflow:"hidden",
             margin:"1%",textOverflow:'ellipsis',borderRadius:"2%",boxShadow:"2px -1px 3px #ccc"}}>
    
            <button  style={{borderRadius: "50%", border:"0px",backgroundColor:"white"}}> 
            <img className="card-img-top" src={oneFriend.primaryImage.imageUrl}
   
         alt="Card cap"  style={{borderRadius: "50%", width:"75%", margin:"auto",
         boxShadow:"8px -1px 5px #ccc",maxWidth:"60%",maxHeight:"13em"}}></img>      
        </button> 
        <div className="card-body" style={{fontSize:".8em"}}>
          <h5 className="card-title" style={{textAlign:"center"}}>{oneFriend.title}</h5>
          {oneFriend.summary}
          <hr style={{backgroundColor:"plum"}}></hr>
          <span className="card-text">
          {oneFriend.bio}
          </span>
          {/* <button href="" className="btn btn-primary btn-sm btn-block">Go somewhere</button> */}
        </div>
        <div>
        <button href="" className="btn btn-danger btn-md " style={{float:"right"}}>Delete</button>
        
        <button href="" className="btn btn-primary btn-md " style={{float:"left"}}

       
        onClick={onFriendClickFull} 
        data-friend-id={oneFriend.id}>
            Edit</button>
        </div>
      </div>

    )
}

export default React.memo(SingleFriend);