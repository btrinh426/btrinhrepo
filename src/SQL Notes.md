# SQL

# Instrutor Questions/Comments

1.  Can you go over the structure of a UDT

# Notes

# Joins

    - Inner Join - only displays a record with matching Primary Keys
    - Left Outer Join - Brings back everything from Table A, but also adds data from Table B to the corresponding Primary Key Record.
    -

    Steps
        1. Determine which data needs to line up by looking at the tables
        2. Write out your From Clause
        3. Choose a JOIN method
        4. Use ON to compare data from Table 1 column A and Table 2 column B

    < ----- EXAMPLE ----- >
        SELECT p.PersonId,
        o.InstructorId,
        o.Id
        FROM sab.Person AS p
        INNER JOIN sab.OfficeAssignment AS o
            ON p.PersonId = o.InstructorId
            Where p.PersonId = 27

- The Query is only going to give you what you ask for, not what you want.
- There doesn't need to be a formal database relationship structure called a PK for you to write a join statement.

# Formal Relationships

    Easier for Third parties to understand schema
    Leverage relationships tools (constraints) to enhance referential integrity

Create a relationship

SQLQuery Executer

# Primary key is a column or set of columns that uniquely identifies a record in a table

- Helpful Query COMMANDS
  - Truncate table dbo.tablename
  - Select [@variableName] - use like a console.log
  -

* for backend add: DateAdded datetime2(7) no nulls; DateModified datetime2(7); UserId nvarchar(50) all no nulls

Task for creating a new table

- assign primary key
- add column names and data types
- Add to all tables = DateAdded & DateModified -> Set default binding to getutcdate()

CRUD - Creat - Read - Update - Delete

- Use tall format - notice comma placement
- Order on top has to match the order on bottom
- Test script stratgey - run select to visually inspect what we inserted
- Every table should have Primary Key, Date Added, Date Modified, and User ID
- Declare can support multiple declared variables in the same call.
- Columns that are managed by SQL can be excluded - such as date added or modified
- Order of the script needs to match the order of the table
- Foreign key is a primary key from another table that can be referenced in the current table
- Bridge Table is a table that links

# Table Types

- In order to accept table variable as a paramter - need to use UDT User Defined Table Type

# Creating a table variable

<----- EXAMPLE ----->

    Declare @myTable Table (
    		Id int Primary key NOT NULL
    		,[Name] nvarchar(100) NOT NULL)

    Insert Into @myTable ( Id, Name )
    Values	( 2, 'Chad' )
    		,( 4, 'Anna' )

    Insert Into @myTable ( Id, Name )
    Values	( 4, 'John' )

    Select *
    from @myTable as myT
    Where myT.Id < 4

/\*

Table Variables:

Has to be used locally as opposed to User Defined Tables that can be used as parameters

Sometimes you need to keep track of a results set in your proc to use in some other ?sequence?

Can also be used in JOINING

Commands:

Delete from @myTable

Select \*
from @myTable

\*/

# User Defined Table Type

<----- EXAMPLE ----->

    Declare @myTable Table (
        [Data] int Primary Key NOT NULL
    )

    Create Type sab.TestTable as Table (
        [Data] [int] NOT NULL
        ,[TypeId] [int] NOT NULL
        PRIMARY KEY
        (
            [Data] ASC
        )
    )

If need to alter (DROP)

<----- EXAMPLE ----->

In order to alter table type execute:

    DROP Type sab.TestTable

Make adjustments as needed and execute (example: description):
Create Type sab.TestTable as Table (
[Data] [int] NOT NULL
,[TypeId] [int] NOT NULL
,[Description] nvarchar(100) NOT NULL
PRIMARY KEY
(
[Data] ASC
)
)

!!!! You can't DROP a table type if it is being referenced in a Stored Proc !!!!

Instead you should be createing a new store proc and a new test table type

    Create Type sab.TestTable_V2

<----- LEAST VIDEO EXAMPLE ----->

/\*

Create Type sab.TestTable as Table (
[Data] [int] NOT NULL
,[TypeId] [int] NOT NULL
PRIMARY KEY
(
[Data] ASC
)
)

\*/

    Declare @myTable sab.TestTable
    Insert into @myTable ( Data, TypeId, Description)
    Values (1, 2, 'Hello')

    Select *
    from @myTable

/\*

In order to alter table type execute:

    DROP Type sab.TestTable

Make adjustments as needed and execute (example: description):
Create Type sab.TestTable as Table (
[Data] [int] NOT NULL
,[TypeId] [int] NOT NULL
,[Description] nvarchar(100) NOT NULL
PRIMARY KEY
(
[Data] ASC
)
)

# Using UDT's as parameters for Stored Procs

# Store Procedures - CRUD

# Insert Proc Steps

1. Create hard coded variables
2. Use variables in place of hard coded values for test script

<----- EXAMPLE ----->
INSERT INTO [dbo].[Friends]
([Title]
,[Bio]
,[Summary]
,[Headline]
,[Slug]
,[StatusId]
,[PrimaryImage]

           ,[CreatedBy]

           ,[ModifiedBy])
     VALUES
           ('Frank Martinez'
    	   ,'lsdjkldfgjg'
    	   ,'lsdjkldfgjg'
    	   ,'lsdjkldfgjg'
    	   ,'lsdjkldfgjg'
    	   ,1
    	   ,'lsdjkldfgjg'
    	   ,'lsdjkldfgjg'
    	   ,'lsdjkldfgjg')

Select \*
from dbo.Friends

<----- END EXAMPLE ----->

3. Create shell/wrapper for what will be your proc and execute

- Change create to alter and execute again

<----- EXAMPLE ----->

Create proc dbo.[tablename_Insert]

as

/\*

Multi-line comment

\*/

BEGIN

    (Enter script here)

END

4. Change to params and variables

<----- EXAMPLE ----->

Declare @Id int = 0

Declare @PersonName nvarchar(50) = 'John'
,@UserId nvarchar(50) = 'User-149'

    INSERT INTO [dbo].[EX1]
            ([Name]

           ,[UserId])
         VALUES
           (@Personname
    	   ,@UserId)

    SET @Id = SCOPE_IDENTITY()

    Select *
    from dbo.EX1
    Where Id = @Id

Step 1

- EMBED WITHIN A MULTILINE COMMENT AN EXAMPLE OF EXECUTION OF THE PROC /_ THIS IS A COMMENT _/ NO EXCEPTION!!
- Run the Shell Proc
- Copy and paste Script Proc between BEGIN and GO
- Change Create to Alter and execute - this will store the proc
- Execute to save
- Go to Programmability -> Stored Procedures -> [Table] -> Modify

<---- EXAMPLE ---->

ALTER proc [dbo].[EX1_Insert]

    	@PersonName nvarchar(50)
    	,@UserId nvarchar(50)
    	,@Id int OUTPUT

/\*
Declare @Id int = 0

Declare @PersonName nvarchar(50) = 'Jeremy'
,@UserId nvarchar(50) = 'User-155'

Execute dbo.EX1_Insert
@PersonName
,@UserId
,@Id OUTPUT

    Select @Id

    Select *
    from dbo.EX1
    Where Id = @Id

\*/

as

BEGIN

INSERT INTO [dbo].[EX1]
([Name]

           ,[UserId])
     VALUES
           (@Personname
    	   ,@UserId)

    SET @Id = SCOPE_IDENTITY()

END

Step 2

- Make varaibles into params by moving the declared statements above the execution line and removing the delaration (see example)
- Execute script and re-open by Programmability -> Stored Procedures -> [Table] -> Modify
- EXECUTE TO SAVE SCRIPT

<---- EXAMPLE ---->

ALTER proc [dbo].[EX1_Insert]

    	@PersonName nvarchar(50)
    	,@UserId nvarchar(50)
    	,@Id int = 0

/\* ---- TEST CODE - MUST INCLUDE ------
Declare @Id int = 0

Declare @PersonName nvarchar(50) = 'Jeremy'
,@UserId nvarchar(50) = 'User-155'

Execute dbo.EX1_Insert
@PersonName
,@UserId
,@Id OUTPUT

    Select @Id

    Select *
    from dbo.EX1
    Where Id = @Id

\*/

as

BEGIN

INSERT INTO [dbo].[EX1]
([Name]

           ,[UserId])
     VALUES
           (@Personname
    	   ,@UserId)

    SET @Id = SCOPE_IDENTITY()

END

Step 3

- Seperate out executed script into new query window and right click -> New Verticle Tab Group
- Execute to verify it works and save by executing
- For Insert/Create procs the Id needs to be set to OUTPUT

Declare @Id int = 0

Declare @PersonName nvarchar(50) = 'Jeremy'
,@UserId nvarchar(50) = 'User-155'

Execute dbo.EX1_Insert
@PersonName
,@UserId
,@Id OUTPUT

    Select @Id

    Select *
    from dbo.EX1
    Where Id = @Id

Step 4

- Close execution window
- Save store procedure by executing
- Highlight multi line comment and execute to test proc

<----- FINAL EXAMPLE ----->

Alter proc dbo.[Friends_Insert]
@Title nvarchar(50) = 'Chad Martinez'
,@Bio nvarchar(50) = 'jgfdigjfodf'
,@Summary nvarchar(50) = ';lsdjfa'
,@Headline nvarchar(50) = 'sdgjlasdfg;l'
,@Slug nvarchar(50) = 'jdgflj'
,@StatusId int = 1
,@PrimaryImage nvarchar(50) = 'a;ldskjfgas;kldfjgh'
,@Createdby nvarchar(50) = 'User-1'
,@ModifiedBy nvarchar(50) = 'User-1'
,@Id int OUTPUT

/\*

    	Declare @Id int = 0;

    	Declare @Title nvarchar(50) = 'Richard Martinez'
    			,@Bio nvarchar(50) = 'jgfdigjfodf'
    			,@Summary nvarchar(50) = ';lsdjfa'
    			,@Headline nvarchar(50) = 'sdgjlasdfg;l'
    			,@Slug nvarchar(50) = 'jdgflj'
    			,@StatusId int = 1
    			,@PrimaryImage nvarchar(50) = 'a;ldskjfgas;kldfjgh'

    			,@Createdby nvarchar(50) = 'User-1'

    			,@ModifiedBy nvarchar(50) = 'User-1'

    	Execute dbo.[Friends_Insert]
    				@Title
    			   ,@Bio
    			   ,@Summary
    			   ,@Headline
    			   ,@Slug
    			   ,@StatusId
    			   ,@PrimaryImage
    			   ,@CreatedBy
    			   ,@ModifiedBy
    			   ,@Id OUTPUT

    	Select @Id

    	Select *
    	from dbo.Friends
    	Where Id = @Id

\*/

as

BEGIN

INSERT INTO [dbo].[Friends]
([Title]
,[Bio]
,[Summary]
,[Headline]
,[Slug]
,[StatusId]
,[PrimaryImage]

           ,[CreatedBy]

           ,[ModifiedBy])
     VALUES
           (@Title
    	   ,@Bio
    	   ,@Summary
    	   ,@Headline
    	   ,@Slug
    	   ,@StatusId
    	   ,@PrimaryImage
    	   ,@CreatedBy
    	   ,@ModifiedBy)

    	SET @Id = SCOPE_IDENTITY()

END

<----- FINISHED ----->

# Update Proc Steps

- Script tables as... -> Update -> New Query Window (will create update shell)
- Never want to update/change date added.
- Test with below example

<----- EXAMPLE ----->

    	Select *
    	from dbo.EX1
    	Where Id = 8


    UPDATE [dbo].[EX1]
       SET [Name] = 'Juan'

    	  ,[DateModified] = GETUTCDATE()
    	  ,[UserId] = 'User-Test1'
     WHERE Id = 8

    	Select *
    	from dbo.EX1
    	Where Id = 8

<----- FINISHED ----->

Step 2

- Change from hard coded to variables
- Copy variables from Insert proc
- Order of declared variables does not need to match UPDATE statement

<----- EXAMPLE ----->

Declare @Id int = 8

Declare @PersonName nvarchar(50) = 'Was Jeremy'
,@UserId nvarchar(50) = 'User-155User-Test1'
,@datNow datetime2 = getutcdate()

    	Select *
    	from dbo.EX1
    	Where Id = @Id


    UPDATE [dbo].[EX1]
       SET [Name] = @PersonName

    	  ,[DateModified] = @datNow
    	  ,[UserId] = @UserId
     WHERE Id = @Id

    	Select *
    	from dbo.EX1
    	Where Id = @Id

<----- FINISHED ----->

Step 3

- Open new query window
- Execute as Below / execute to save

<----- EXAMPLE ----->

Create proc dbo.[EX1_Update]

as

BEGIN

    Select 1

END

<----- FINISHED ----->

Step 4

- Change Create to Alter
- There is no OUTPUT for the Id during the Alter statement
- Remove Id from the test script (middle part)
- Declare any variable(functions) in the proc that are system generated like Date Modified
- Copy over as follows

<----- EXAMPLE ----->

Alter proc dbo.EX1_Update
@PersonName nvarchar(50)
,@UserId nvarchar(50)
,@Id int

as
/\*

    	Declare @Id int = 0

    	Declare @PersonName nvarchar(50) = 'Jeremy'
    			,@UserId nvarchar(50) = 'User-155'

    	Select *
    	from dbo.EX1
    	Where Id = @Id

    	Execute dbo.EX1_Update
    			@PersonName
    			,@UserId
    			,@Id

    	Select *
    	from dbo.EX1
    	Where Id = @Id

\*/

BEGIN

    Declare @datNow datetime2 = getutcdate()

    UPDATE [dbo].[EX1]
       SET [Name] = @PersonName

    	  ,[DateModified] = @datNow
    	  ,[UserId] = @UserId
     WHERE Id = @Id

END

<----- FINISHED ----->

Step 5

- Execute proc to save
- Run test code (stuff in the comments)

# Select All proc

- When returning nulls use:
  Where ([LastName] = @LastName)
  OR
  (@LastName IS NULL AND [LastName] IS NULL)
- Select statements must have the SAME columns in the SAME order!

<----- EXAMPLE ----->
ALTER proc [dbo].[User_SelectAll]

as

/\*

    Execute dbo.User_SelectAll

\*/

BEGIN

    SELECT [Id]
      ,[FirstName]
      ,[LastName]
      ,[Email]
      ,[Password]
      ,[PasswordConfirm]
      ,[AvatarUrl]
      ,[TenantId]
      ,[DateAdded]
      ,[DateModified]
      ,[UserId]

FROM [dbo].[User]

END

# Select By Id

<----- EXAMPLE ----->
ALTER proc [dbo].[User_SelectById]
@Id int

as

/\*
Declare @Id int = 2;
Execute dbo.User_SelectById @Id

\*/

BEGIN

    SELECT [Id]
      ,[FirstName]
      ,[LastName]
      ,[Email]
      ,[Password]
      ,[PasswordConfirm]
      ,[AvatarUrl]
      ,[TenantId]
      ,[DateAdded]
      ,[DateModified]
      ,[UserId]

FROM [dbo].[User]
Where Id = @Id

END

# Delete Proc

Steps:

Step 1

- Script table as... -> Delete to -> New Query Window
- Set up selector and test

<----- EXAMPLE ----->

Declare @Id int = 3

Select \*
from dbo.[User]
Where Id = @Id;

Delete from dbo.[User]
Where Id = @Id

Select \*
from dbo.[User]
Where Id = @Id;

Step 2

- Create shell proc and execute
- Assign variable to the params

<----- EXAMPLE ----->
ALTER proc [dbo].[User_Delete]
@Id int

as

/\*

    Declare @Id int = 3

    Select *
    from dbo.[User]
    Where Id = @Id;

    Execute dbo[User_Delete] @Id

    Select *
    from dbo.[User]
    Where Id = @Id;

\*/

BEGIN

    Delete from dbo.[User]
    Where Id = @Id

END

# Export Scripts

Steps:

- Right click data base
- Tasks
- Generate scripts
- Choose Objects - all
- Save as Script File - Give it a name - all defaults good.
- Finish

Close all databases
Find Server info from xcel and replace the local server info
Change to SQL Authentication and enter user name and password from xcel sheet
