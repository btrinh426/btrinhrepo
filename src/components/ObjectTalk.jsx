import React from 'react'

class ObjectTalk extends React.Component { 
    
    state = {
    }

    objStuffs = () => {
        //Shallow copys create duplicates of primitives, these do not take up the same space in memory
        // const obj1 = {a: "TEST"};
        // const obj2 = {... obj1};

        // obj2.a += " COMPLETE";
        // console.log(obj1, obj2);

        //What happens when we add a object value to the property?
        //You will see that they do take up the same space in memory, thus if you modify the object value it also modifies the object property.
        // const obj3 = {a: ["TEST"]};
        // const obj4 = {... obj3};

        // obj4.a.push("TESTED");
        // console.log(obj3, obj4);

        //So how would we create a Deep copy?
        //Unfortunately thats out of the scope of this code talk, but one method is using the for ... in loop, example below
        // const deepObj = {
        //     tier0: {
        //         tier1: {
        //             value: ["This", "Is", "An", "Array"]
        //         }
        //     }
        // };
        
        //This is a simple explanation here, but with proper looping you could create an entire deep copy using for ... in
        // const objCopy = {};
        // for(const prop in deepObj){
        //     objCopy[prop] = deepObj[prop];
        // }
        // console.log(deepObj, objCopy);

        //Now how could we dig deeper into an object without knowing what its made up of?
        //Loops and Bracket notation are the way
        
        // const path = ["tier0", "tier1", "value"];

        // let obj = deepObj;

        // path.forEach( p => {
        //     obj = obj[p];
        // })
        // console.log(obj);

        //combining these 2 things we can begin to see how a deep copy might be possible
        //We could loop thru the object, seeing if any properties are objects
        //Then loop thru those, until the only value types left are primitives
    }
    
    render(){
         return (
             <React.Fragment>
                {this.objStuffs()}
             </React.Fragment>
         );
    }
}

export default ObjectTalk;