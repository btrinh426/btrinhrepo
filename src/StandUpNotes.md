# Stand UP

# coloradoblueline_gmail_UserC990748A



# 11/09

    Completed
        - Trys and Catches
            Users and 
            Testing endpoints in postman        
        - SQL Questions
        - Life Cycle videos

        
        Military and law enforcement veteran 
        Here on the vet tec program
        Live in Denver CO
        Pay attention to your peers.  each of them  from your peers

        At the end of each phase, take a moment to create trello cards with working examples

# 11/07

    Completed
        - Login
            - Check password with hashed database password
            - Retrieved roles and set cookies
        - Gave code talk covering connecting endpoints via postman.

    By Monday
        - Trys and Catches
        - Error Response
        - SQL Questions

# 11/06

    Completed
        - Updated User Table to reflect the requirements in the Trello card
        - Created Select_AuthData and SelectPass_ByEmail procs
        - Created Users Service and Api Controls for Register and Login
        - Tested Register and successfully hashed the password for storage using BCrypt
        - Tested Login: retrieved the hashedPassword and compared it with user input
            - Tested with generic User Roles
            - Adjusted Select_AuthData
                - Error converting to string

    By Tomorrow
        - Complete login Test
        - Review: https://www.geeksforgeeks.org/difference-between-authentication-and-authorization/
                - https://stackoverflow.com/questions/21645323/what-is-the-claims-in-asp-net-identity


# 11/05

    Completed
        - Completed the 2nd Assessment
            - Identified areas of Improvement
                - Advanced SQL procs
        - PropsTypes video and wiki.
        - Implemented Prop types into FriendCard

    By Tomorrow 11/06
        - Test PropTypes on FriendCard
        - Update Users table and procs to Trello Card specs
        - Update Foreign Key relationships

    For the weekend
        - Start adding examples to SQL questions
        - Try adding events on the front end
            - Specifically work with Google maps

    Blockers
        - C# Authentication

# 11/04

    Completed
        - Test Prep

    Today - take the assessment

    Blockers - theory


    Assessment Takeways
        - spend time with joins

    Props.Types - https://github.com/sabiocode/wiki/blob/78c2670086c6f56a27170f700144ba6e87985c28/javascript/React/Components/PropTypes.md
    Log in and Authentication  C#

# 11/03

    Completed
        - Created a Sql Events Table and its associted procs
        - Then in .NET I created Domain and Request models
        - Then I stubbed out shells for the Event Service, Interface, and Api Controller
        - Ran a successful test retrieving an event record by id in Postman

    React State Management
        - Exploring react
        - Component life cycle**
            - sync or async
        - Virtual DOM (React Fundamentals)

    Backend
        - Connect to database
        - Backend from postman to sql send info

# 11/02

    Completed
        - Created study guide for React Prep Questions
        - Created Trello cards for Connecting React to .NET
        - Test Friends endpoints
            - Postman
            - React (console.logs)

    Tomorrow
        - Fully implement validation and response codes
        - Implement Formik, paginate

    Questions
        - What are arrow functions in React?

    From Gregorio
        - Understand state management the Sabio way.
        - Go through React course

# 10/31

    Completed
        - Updating the Friends procs to include the Skills and thier bridge table
        - Updated the .Net Friends Api Controller and Service

    By Monday
        - Complete Prep questions

    Blocker
        - Connecting React to .NET

# 10/30

    Completed
        - Coding along Api Videos
        - Set up interfaces for Friends and Users
        - Created a controller to encapsulate the endpoints for Users
            - Added Validation and Response Codes

    By Tomorrow
        - Implement Skills into the Friends Insert and Update procs
        - Create a controller for Friends complete with validation and responses
        - *** SET UP INTERVAL TIMER FOR EXERCISE ***

        Other To Do's
            - Inner join Friends with Skills
            - Create tables for Events/Jobs

    Brijesh - Weekend work
        - Interview Prep!!!!

# 10/29

    Completed
        - Got clarification on table design
        - Watched: Passing Multiple Recoreds to SQL DataTable
        - Created a DataTable to recieve an array of strings from a List
        - Need to hop in the queue for review
        - Started coding along with Web API series

    By Tomorrow
        - Will finish the API Web Development series

    Blockers - None

# 10/28

    Completed
        - First section of C# Course
        - Set up C# Store Procs
            - Established Domain and Request Models based on Users SQL Table
            - Set up a User Service to:
                - Send and retrieve data
                - Used the ExecuteCmd and ExecuteNonQuery to:
                    - Select, Insert, and Update Records based on previously created SQL procs
            - Tested functionality
    By Tomorrow I'll definitively complete:
        - Clean up Friends table and procs in SQL
        - Create .NET Procs to pull information from Friends

    Blockers
        - Information design

    Completed
        - Got clarification on table design
        - Watched: Passing Multiple Recoreds to SQL DataTable
        - Created a DataTable to recieve an array of strings from a List
            - Then Crashed into a loop

# 10/27

    Completed
        - C# Primer Class
        - Started .Net Core classes - I learned to
            - Tested the Connection to the SQL server using a connection string
            - Started to gain familiarity with the environment and its debugging tools
            - Established a Domain for Addressess
            - Created Add and Update Request models
            - Set up an Address Service to:
                - Map a single record by ID
                - Map multiple records
                - Refactored Address Service

        By Tomorrow - Will Complete
            - Finish first section of C# Course
            - Review NULL checks
            - Review variable types var vs const vs let       (explicit type?)
            - Definitions: AJAX and API, String literal, string interpralation
            - Branches and Loops exercise: "https://docs.microsoft.com/en-us/dotnet/csharp/tutorials/intro-to-csharp/branches-and-loops?tutorial-step=6"

# 10/26

    Also use formik for Friends Search?

    What I did
        - Review Formik and Yup documentation
            - Sabio Wiki
                - hidden "errors"
            - Formik.org
            - Yup wiki
        - Implemented
            - Login
            - Registration
            - Friends
                - Completed
                    - Wired onSave click handler
                    - Passing Friend ID back to
                    - Set state in Friends via onSave handler
                    -
                -Issues
                    - Pulling schema from separate file

    Tomorrow
        - Review NULL checks
        - Review variable types var vs const vs let       (explicit type?)
        - will complete Friends add/edit/delete with Formik/Schemas
            - Gregorio said to
                - use break points on schema call
                - Check FriendFormik props.  Maybe schema should be passed as props
        - Watch C# Course
        - Definitions: AJAX and API, String literal, string interpralation
        - Branches and Loops exercise: "https://docs.microsoft.com/en-us/dotnet/csharp/tutorials/intro-to-csharp/branches-and-loops?tutorial-step=6"

# C# Notes:

search - Ctrl Q
keyboard - set VS Code keyboard

Go to Tools - Ctrl T
View Recent Docs

Shft F12
Find all references within a doc
ctrl click - go to

- All about that syantactic sugar (smack)

# 10/24

    Completed ANYONE?
     - First Assessment
        - Build better examples
            Review filtering via mapping
        - Review more documentation in general and Overviews of concepts
            -AJAX & API

    Will Have Done by Monday
        - Focus on Formik
            - Read documentions
            - Rebuild Forms
                - Login
                - Registration
                - Friends
        - If there is time
            - Overview of AJAX and API
            - Polish up React
            - Establish SQL Tables and CRUDS for Friends/Events

        - Blocker? I hardly know her.

        https://github.com/sabiocode/wiki/blob/cdab2ea7e4b33761f5cf3154791926e4681c17d5/javascript/React/Validation/Formik-Basic-Example.md
        https://github.com/sabiocode/wiki/blob/2b05a428d36358778ff429f1cc07813d4d58c4eb/javascript/React/Validation/Example-6-with-Formik.md

# 10/23

    I completed the final video in the join series - Working with Duplicate Data
    Then I refreshed React
        - focusing on rendering arrays via mapping
        - implementing click handlers to pass data
        - using memo to allow react to efficiently track rendered data
    I wrapped preparing for the assessment by
        - slapping out a few tables
        - CRUDing out the necessary procs



    Completed
     - First Assessment
        - Build better examples
        - Review more documentation in general and Overviews of concepts

    For weekend
        - Formik
            - yarn add Formik Yup
            - DO NOT USE EXAMPLE WITH HOOKS!
            - Read documention
        - Rebuild Forms
            - Login
            - Registration
            - Friends

        https://github.com/sabiocode/wiki/blob/cdab2ea7e4b33761f5cf3154791926e4681c17d5/javascript/React/Validation/Formik-Basic-Example.md
        https://github.com/sabiocode/wiki/blob/2b05a428d36358778ff429f1cc07813d4d58c4eb/javascript/React/Validation/Example-6-with-Formik.md

# 10/22

    I started watching the join series where I learned how I can get data from a multitude of tables that share a common data point.

    I applied that to the Friends data so I could locate all Skills associated to a particular friend.  I wrote an inner join statement to select all friends with skills referencing the bridge table.  I then created a query and applied JSON AUTO to return a string of the associated skills and ensured it was valid JSON syntax.

    I gave a code talk walking through the step by step process for applying an inner join and a query to return the data I had asked for and the data I was looking for.


    Today I will complete the final video in the join series and will complete the table designs for Events and write the insert statement for each.


    My blocker - NONE


    Notes:

    To Do

# Prepare for assessment tomorrow. Study React mapping and SQL CRUD statements

        - Working on applying to Friends Skills
