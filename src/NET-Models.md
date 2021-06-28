# C# Shells

# Domain/Request Shell

```C#

//Dependency injection

//Domain Models named in the singular
//Request Models named singular + add/update/etc + Request

public class ClassName : CouldHaveBaseHere
    {
        //examples
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime StartDate { get; set; }
        public List<string> NameOfStrings { get; set; }

    }

```

# Service Shell

```C#

public class PluralService : InterfaceName
    {
        //provides the service with the necessary information to connect to the database and send and receive information
        //Location keeps the data within scope for all service calls to use
        IDataProvider _data = null;

        //service constructor
        public PluralService(IDataProvider data)
        {
            _data = data;
        }

        //Get example
        public SingleModel Get(int id)
        {
            string procName = "[dbo].[Table_SelectById]";

            SingleModel retrieve = null;

            _data.ExecuteCmd(procName, delegate (SqlParameterCollection parameterCollection)
            {
                parameterCollection.AddWithValue("@Id", id);

            }, delegate (IDataReader reader, short set)
            {
                retrieve = MapModel(reader);
            });

            return retrieve;
        }

        //Reader map method - group privates at the bottom
        private static SingleModel MapModel(IDataReader reader)
        {
            SingleModel retrieve = new SingleModel();
            int startingIndex = 0;

            retrieve.SqlColumnName = reader.GetSafeInt32(startingIndex++);
            retrieve.SqlColumnName = reader.GetSafeString(startingIndex++)
            retrieve.SqlColumnName = reader.GetSafeDateTime(startingIndex++);

            return retrieve;
        }

        //Get > one record
        public List<SingleModel> GetTop()
            {
                List<SingleModel> list = null;

                string procName = "[dbo].[SqlModel_SelectAll]";

                _data.ExecuteCmd(procName, inputParamMapper: null
                    , singleRecordMapper: delegate (IDataReader reader, short set)
                    {
                        SingleModel aSingleModel = MapModel(reader);

                        if (list == null)
                        {
                            list = new List<SingleModel>();
                        }

                        list.Add(aSingleModel);
                    });

                return list;
            }

        //Delete
        public void Delete(int id)
            {
                string procName = "[dbo].[SqlModel_Delete_V2]";

                _data.ExecuteNonQuery(procName, delegate (SqlParameterCollection parameterCollection)
                {
                    parameterCollection.AddWithValue("@id", id);
                }, returnParameters: null);
            }

        //Add
        public int Add(SingleModelAddRequest model)
        {
            int id = 0;

            //Need to change back to V3 and implement skills array AutoJSON
            string procName = "[dbo].[SqlModel_Insert_V3]";

            DataTable myParamValue = MapModelPropertyToTable(model.PropertyName);

            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                //ensure model matches the table @ColumnName
                col.AddWithValue("@ColumnName", model.PropertyName);
                col.AddWithValue("@ColumnName", model.PropertyName);
                col.AddWithValue("@ColumnName", model.PropertyName);
                col.AddWithValue("@UdtName", myParamValue);

                SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                idOut.Direction = ParameterDirection.Output;

                col.Add(idOut);

            }, returnParameters: delegate (SqlParameterCollection returnCollection)
            {
                object oId = returnCollection["@Id"].Value;

                int.TryParse(oId.ToString(), out id);
            });

            return id;
        }

        public void Update(SingleModelUpdateRequest model)
        {
            string procName = "[dbo].[SqlModel_Update]";

            DataTable myParamValue = MapModelPropertyToTable(model.PropertyName);

            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@ColumnName", model.PropertyName);
                col.AddWithValue("@ColumnName", model.PropertyName);
                col.AddWithValue("@ColumnName", model.PropertyName);
                col.AddWithValue("@UdtName", myParamValue);

            }, returnParameters: null);
        }

        private DataTable MapModelPropertyToTable(List<string> PropertyName)
        {
            DataTable dt = new DataTable();

            dt.Columns.Add("Skill", typeof(string));

            foreach (string singlePropertyName in PropertyName)
            {
                DataRow dr = dt.NewRow();

                dr.SetField(0, singlePropertyName);

                dt.Rows.Add(dr);
            }

            return dt;
        }

    }
```

# Interface Shell

```C#

    public interface IPluralService
        {
            int Add(SingleModelAddRequest model);
            void Delete(int id);
            SingleModel Get(int id);
            List<SingleModel> GetTop();
            void Update(SingleModelUpdateRequest model);
        }

    //Add Dependency Injection - Sabio.Web.Api > StartUp > DependencyInjection.cs
    services.AddSingleton<ISingleNameService, SingleNameService>();

```

# Api Controller Shell

```C#

    // the controller is not a singleton.  Every time a request is sent a new instance of the singleton is created.
    [Route("api/PluralEntity")]
    [ApiController]

    // Base Api controller needs a logger and will need to be passed on any controller
    public class SingleNameApiController : BaseApiController
    {
        // Constructor
        private IPluralService _service = null;
        // base is the .NET equivelent of super(props)
        public SingleNameApiController(IPluralService service, ILogger<SingleNameApiController> logger) : base(logger)
        {
            _service = service;
        }

        // GET api/PluralEntity
        [HttpGet()] // String captured becomes the route from above

        public ActionResult<ItemsResponse<SingleName>> GetTop()
        {
            //cannot return the list - must pass it
            List<Singlename> list = _service.GetTop();

            //Items it type of response you want to return out of your endpoint
            ItemsResponse<SingleName> response = new ItemsResponse<Singlename>();
            response.Items = list;

            if (list == null)
            {
                return NotFound404(response);
            }
            else
            {
                return Ok(response);
            }
        }

        // api/SingleModel/{id:int} (route pattern)
        // Needs a place holder to pass id - this will qualify the URL
        // Run a null check
        [HttpGet("{id:int}")]
        public ActionResult <ItemResponse<SingleModel>> GetById(int id)
        {
            //purpose is to return response class

            SingleModel sm = _service.Get(id);

            ItemResponse<SingleModel> response = new ItemResponse<SingleModel>();
            response.Item = sm;

            if(response.Item == null)
            {
                return NotFound404(response);
            }
            else
            {
                return Ok(response);
            }


        }

        [HttpDelete("{id:int}")]
        public ActionResult<SuccessResponse> Delete(int id)
        {
            _service.Delete(id);

            SuccessResponse response = new SuccessResponse();
            return response;
        }


        [HttpPut("{id:int}")]
        public ActionResult<ItemResponse<int>> Update(SingleModelUpdateRequest model)
        {
            _service.Update(model);

            SuccessResponse response = new SuccessResponse();

            return Ok(response);
        }

        [HttpPost] // [HttpPost("")] same
        public ActionResult <ItemResponse<int>> Create(SingleModel model)
        {
            int id = _service.Add(model);

            ItemResponse<int> response = new ItemResponse<int>();

            response.Item = id;

            return Ok(response);
        }
    }
}
```
# Try Catch Example

```C#
            [HttpGet("{id:int}")]
            public ActionResult GetById(int id)
            {
                int iCode = 200;
               BaseResponse response = null;

               try
               {
                   User u = _service.GetById(id);

                   //ItemResponse<User> response = new ItemResponse<User>();
                   //response.Item = u;
                   //May not want to return just an item

                   if (u == null)
                   {
                       iCode = 404;
                       response = new ErrorResponse("Application Resource not found.");
                   }
                   else
                   {
                       response = new ItemResponse<User> { Item = u };
                       return Ok(response);
                   }
               }
               catch (SqlException sqlEx)
               {
                   iCode = 500;
                   // other clean up code or logging to do
                   response = new ErrorResponse($"SqlExeception Error: {sqlEx.Message}");
                   base.Logger.LogError(sqlEx.ToString());

               }
               catch (ArgumentException argEx)
               {
                   iCode = 500;
                   // other clean up code or logging to do
                   response = new ErrorResponse($"ArgumentException Error: {argEx.Message}");
               }
               catch (Exception ex) //important to add a logger
               {
                   iCode = 500;
                   base.Logger.LogError(ex.ToString());
                   response = new ErrorResponse($"Generic Error: {ex.Message}");
                   //return base.StatusCode(500, new ErrorResponse($"Generic Error: {ex.Message}"));
               }
               //only one return statement - use refactoring
               // Needs a StatusCode

               return StatusCode(iCode, response);


    

```
