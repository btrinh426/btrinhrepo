USE [ASMNT]
GO
/****** Object:  Table [dbo].[Presidents]    Script Date: 11/13/2020 1:46:13 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Presidents](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[DateModified] [datetime2](7) NOT NULL,
	[DateAdded] [datetime2](7) NOT NULL,
	[UserId] [nvarchar](128) NOT NULL,
	[FirstName] [nvarchar](50) NOT NULL,
	[LastName] [nvarchar](50) NOT NULL,
	[InaugurationDate] [datetime2](7) NOT NULL,
	[FirstYearInOffice] [int] NOT NULL,
	[LastYearInOffice] [int] NULL,
	[PartyAffiliation] [nvarchar](100) NOT NULL,
 CONSTRAINT [PK_Presidents] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Presidents] ADD  CONSTRAINT [DF_Presidents_DateModified]  DEFAULT (getutcdate()) FOR [DateModified]
GO
ALTER TABLE [dbo].[Presidents] ADD  CONSTRAINT [DF_Presidents_DateAdded]  DEFAULT (getutcdate()) FOR [DateAdded]
GO
ALTER TABLE [dbo].[Presidents] ADD  CONSTRAINT [DF_Presidents_PartyAffiliation]  DEFAULT ('none') FOR [PartyAffiliation]
GO
/****** Object:  StoredProcedure [dbo].[Presidents_Insert]    Script Date: 11/13/2020 1:46:13 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO




CREATE Proc [dbo].[Presidents_Insert]
									@UserId nvarchar(128) 
								   ,@FirstName nvarchar(50) 
								   ,@LastName nvarchar(50)
								   ,@InaugurationDate datetime2(7)
								   ,@FirstYearInOffice int 
								   ,@LastYearInOffice int 
								   ,@PartyAffiliation nvarchar(100) 
								   ,@Id int OUTPUT
/* ---- TEST CODE -----------------------

		Declare @Id int = 0;

		Declare @UserId nvarchar(128) = 'ABABABAB-99'
				   ,@FirstName nvarchar(50) = 'John'
				   ,@LastName nvarchar(50) = 'Adams'
				   ,@InaugurationDate datetime2(7) = '3/4/1797'
				   ,@FirstYearInOffice int = 1797
				   ,@LastYearInOffice int = 1801
				   ,@PartyAffiliation nvarchar(100) = 'Federalist'

		Execute dbo.Presidents_Insert
											@UserId 
										   ,@FirstName  
										   ,@LastName 
										   ,@InaugurationDate 
										   ,@FirstYearInOffice 
										   ,@LastYearInOffice  
										   ,@PartyAffiliation 
										   ,@Id OUTPUT

		Select *
		From dbo.Presidents
		WHERE Id = @Id
		
*/


AS


BEGIN



	INSERT INTO [dbo].[Presidents]
					([UserId]
					,[FirstName]
					,[LastName]
					,[InaugurationDate]
					,[FirstYearInOffice]
					,[LastYearInOffice]
					,[PartyAffiliation])
	VALUES
			(@UserId
			,@FirstName
			,@LastName 
			,@InaugurationDate
			,@FirstYearInOffice 
			,@LastYearInOffice
			,@PartyAffiliation)

	SET @Id = SCOPE_IDENTITY()

END
GO
/****** Object:  StoredProcedure [dbo].[Presidents_SelectByParty]    Script Date: 11/13/2020 1:46:13 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE Proc [dbo].[Presidents_SelectByParty]		@PartyAffiliation nvarchar(100)

/* ---- TEST CODE -----------------------

		Declare @PartyAffiliation nvarchar(100) = 'federalist';

		Execute dbo.Presidents_SelectByParty	@PartyAffiliation

*/

AS

	BEGIN

	SELECT	[FirstName]
			,[LastName]
      
	FROM	[dbo].[Presidents]
	WHERE	[PartyAffiliation] = @PartyAffiliation

END
GO
