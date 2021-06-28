# Rendering an Array

    - CODE SMALL
    - USE ARROW FUNCTIONS!
    - ALWAYS ATTACK YOUR ERRORS
    -
    Need to supply an array of JSX Components
    - There are futher efficiecies to implement
    - Provide unique key in the form of:
        key={ `abbrObjName-${object.id}`}
    - Place key in React Fragment
        <React.Fragment key={ `abbrObjName-${object.id}`}> </React.Fragment>
    - Use a functional component to pass
    - Retrieve array of data via AJAX call
    - Place in state onGetSuccess via
    - React.Memo will compare the props being passed
        if no change
            Prevents function from firing &
            Returns the output from the previous render

        this.State(prevState) => {
            return { mappedObject: AJAXResponseArrayOfObjects.map(this.singleObjectToBePassed)};
        });

    - Create Mapper Function to pass single objects for rendering via

````jsx
        singleObjectToBePassed = (singleObject) => {
                return (
                    <React.Fragment key={ `abbrObjName-${object.id}`}>
                     JSX COMPONENT
                     <button className:"btn btn-primary" onClick={() => {
                        this.onClickFunction(singleObject)
                        }}
                    id={singleObject.id}>
                    </React.Fragment>
                )
        }

    - If needed return the singleObject by using a Click Handler
        - Need to call a function within a function
        - Use a non-named arrow function to call
        - Wire button calls the event handler
            onClickInside = (e) => {

            };

        - Edit Button
            <button
                className="btn btn-primary"
                onClick={() => {
                    this.onClickFunction(singleObject)
                }}
                id={singleObject.id}
            >
    - Copy and convert Mapper Function code into a functional component
            - Add props
                declare const and assign it the value of props
                declare const function assign it props.function
            - Insert jxs by using: {oneObject.PropertyName}
            - Add functions that reference outer Click Handler

```jsx
        import React from 'react';

        function SingleObjectAsComponent(props) {

            const oneObject = props.singleObject;

            const onClickMain = ()=> {
                props.onClick(onPresident)
            };

            return
            (
                JSX TEMPLATE START

                <button
                className="btn btn-primary"
                onClick={onClickMain}
                id={singleObject.id}
                >
                Button Name
                </button>

                JSX TEMPLATE END
            )
        }

        export default SingleObjectAsComponent
````

    - Insert Component into Mapper Function in the class component
            - Pass it some props
                - Object
                    object={oneObject}
                - Function
                    onClick={this.onClickMain}

```jsx
singleObjectToBePassed = (singleObject) => (
  <SingleObjectAsComponent
    key={`abbrObjName-${object.id}`}
    object={oneObject}
    onClick={this.onClickMain}
  ></SingleObjectAsComponent>
);
```
