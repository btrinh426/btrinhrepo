# C# Notes

Use Breakpoints
if you don't konw where, light it up and hit play
Immediate Window
Can be used to reassign variables on the fly while debugging
Review Over of Learning Environment - debugger

GetSafeString - means getting a string not null not other non-compatible data - will return type specific default if no data

IDataReader and IDataProvider can be used in any .Net setup

Use ExecuteCmd for select statements
USe ExecuteNonQuery for Inserts and Updates

# Models - Domain model?

    All models go in Sabio.Models
    Model is name given to objects what will carry information in and out of tables to the middle tier.
    No functions
    Little suitcases of data going back and forth

# Domain

    - Data coming in and out of database
    - Establish class
        - add public
    Clean - clean out all old information
    Ctrl Shift B - Run a Build
    Data doesn't need to be complete
        - Can create a base widget that only looks for certain information
        - Like you may just need a postal code to calculate the rate to ship for an address
        - Can assign it a child-parent prop relationship
    - Models are nouns NOT actions
        - Do not name them as such

<------ FINAL PROGRAM.CS ----->

```C#

    using Sabio.Data;
    using Sabio.Models.Domain;
    using Sabio.Models.Requests.Addresses;
    using Sabio.Services;
    using System;
    using System.Collections.Generic;
    using System.Data.SqlClient;

    namespace Sabio.Db.ConsoleApp
    {
        internal class Program
        {
            private static void Main(string[] args)
            {
                //Here are two example connection strings. Please check with the wiki and video courses to help you pick an option

                //string connString = @"Data Source=localhost;Initial Catalog=Sabio01;User ID=SabioUser;Password=Sabiopass1!";
                string connString = @"Data Source=104.42.194.102;Initial Catalog=coloradoblueline_gmail;User ID=coloradoblueline_gmail_User;Password=coloradoblueline_gmail_UserC990748A";

                TestConnection(connString);
                TestAddressService(connString);

                Console.ReadLine();//This waits for you to hit the enter key before closing window
            }

            private static void TestAddressService(string myConn)
            {
                #region - Address Service OK
                SqlDataProvider provider = new SqlDataProvider(myConn);

                AddressesService addressService = new AddressesService(provider);
                #endregion

                #region Gets/Selects
                Address aAddress = addressService.Get(9);

                Address missAddress = addressService.Get(99999);

                List<Address> addresses = addressService.GetTop();
                #endregion

                //Add Request
                //when sending data into the service need to put Service requests here

                #region Adds/Updates
                AddressAddRequest request = new AddressAddRequest();

                request.LineOne = "238 Main";
                request.SuiteNumber = 38;
                request.City = "Denver";
                request.State = "Colorado";
                request.PostalCode = "80123";
                request.IsActive = true;
                request.Lat = 34.345043;
                request.Long = 25.84450;

                int newId = addressService.Add(request);

                AddressUpdateRequest updateRequest = new AddressUpdateRequest();

                updateRequest.LineOne = "239 The greatest Address";
                updateRequest.SuiteNumber = 39;
                updateRequest.City = "Denver";
                updateRequest.State = "Colorado";
                updateRequest.PostalCode = "80123";
                updateRequest.IsActive = true;
                updateRequest.Lat = 34.345043;
                updateRequest.Long = 25.84450;
                updateRequest.Id = newId;

                addressService.Update(updateRequest);

                Address greatAddress = addressService.Get(newId);
                #endregion

                Console.WriteLine(greatAddress.Id.ToString());


        }

            private static void TestConnection(string connString)
            {
                bool isConnected = IsServerConnected(connString);
                Console.WriteLine("DB isConnected = {0}", isConnected);
            }

            private static bool IsServerConnected(string connectionString)
            {
                using (SqlConnection connection = new SqlConnection(connectionString))
                {
                    try
                    {
                        connection.Open();
                        return true;
                    }
                    catch (SqlException ex)
                    {
                        Console.WriteLine(ex.Message);
                        return false;
                    }
                }
            }
        }
    }


```

<------ FINAL DOMAIN MODEL WITH BASE ----->

```C#

    using System;
    using System.Collections.Generic;
    using System.Text;

    namespace Sabio.Models.Domain
    {
        //for data coming from the database
        public class Address : BaseAddress
        {
            public string LineOne { get; set; }
            public int SuiteNumber { get; set; }
            public Boolean isActive { get; set; }
            public Double Lat { get; set; }
            public Double Long { get; set; }


        }
    }

    using System;
    using System.Collections.Generic;
    using System.Text;

    namespace Sabio.Models.Domain
    {
        //for data coming from the database
        public class BaseAddress
        {
            public int Id { get; set; }
            public string City { get; set; }
            public string State { get; set; }
            public string PostalCode { get; set; }

            // This is where you will be SQL tracked columns like: DateAddeded, ModifiedBy

            // public DateTime DateAdded { get; set; }

            // public DateTime DateModified { get; set; }

        }
    }
```

# Requests

    - Add a new folder with the entity name in plural
    - Add class with singular name + request action (ie. AddRequest)
    - Do not mix domains with requests
    - Requests get treated with validation to protect the database
    - For Update Request
    - Pass AddRequest
    - Add Id

<------ FINAL REQUEST MODELS ----->

```C#
            public class AddressUpdateRequest : AddressAddRequest
            {
                public int Id { get; set; }
            }

            using System;
            using System.Collections.Generic;
            using System.Text;

            namespace Sabio.Models.Requests.Addresses
            {
                public class AddressAddRequest
                {
                    public string LineOne { get; set; }
                    public int SuiteNumber { get; set; }
                    public bool IsActive { get; set; }
                    public double Lat { get; set; }
                    public double Long { get; set; }
                    public string City { get; set; }
                    public string State { get; set; }
                    public string PostalCode { get; set; }
                    public int Id { get; set; }
                }
            }
```

# Services

    - Reserved for classes that provide info to the database
    .Net Method
    - Create Service Class
        - EntityNameService
        - Add Singular with Get(type, )
        - using Sabio.Models.Domain

    - Code Small

<------ FINAL SERVICE REQUEST MODELS ----->

```C#

    using Sabio.Data;
    using Sabio.Data.Providers;
    using Sabio.Models.Domain;
    using Sabio.Models.Requests.Addresses;
    using System;
    using System.Collections.Generic;
    using System.Data;
    using System.Data.SqlClient;
    using System.Diagnostics;
    using System.Text;
    using System.Threading;
    using System.Threading.Tasks.Dataflow;

    namespace Sabio.Services
    {
        public class AddressesService
        {

            //Add a point to be able to reference data later on.
            IDataProvider _data = null;

            //want to save data, but data goes away after ran so add a pointer like above to reference the data outside.
            public AddressesService(IDataProvider data)
            {
                _data = data;
            }

            // Any time you have a proc you have to test and check the database
            public void Update(AddressUpdateRequest model)
            {
                string procName = "[dbo].[Sabio_Addresses_Update]";

                _data.ExecuteNonQuery(procName,
                    inputParamMapper: delegate (SqlParameterCollection col)
                    {
                        AddCommonParams(model, col);
                        col.AddWithValue("@Id", model.Id);

                    }, returnParameters: null);
            }

            public int Add(AddressAddRequest model)
            {

                int id = 0;

                string procName = "[dbo].[Sabio_Addresses_Insert]";

                _data.ExecuteNonQuery(procName,
                    inputParamMapper: delegate (SqlParameterCollection col)
                    {
                        AddCommonParams(model, col);

                        // and 1 output
                        // Specify the integer and the direction
                        SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                        idOut.Direction = ParameterDirection.Output;

                        // Returns the Id
                        col.Add(idOut);

                    }, returnParameters: delegate (SqlParameterCollection returnCollection)
                    {
                        Console.WriteLine("");
                        // returns id as an object
                        object oId = returnCollection["@Id"].Value;
                        // Conver to int
                        int.TryParse(oId.ToString(), out id);

                    });

                return id;

            }

            public Address Get(int id)

            {
                ////Action<SqlParameterCollection> inputParamMapper,
                ////Action< IDataReader, short> singleRecordMapper,

                ////Action<SqlParameterCollection> returnParameters = null,
                ////Action< SqlCommand > cmdModifier = null);

                string procName = "[dbo].[Sabio_Addresses_SelectById]";

                Address address = null;

                _data.ExecuteCmd(procName, delegate (SqlParameterCollection paramCollection)
                {
                    paramCollection.AddWithValue("@Id", id);

                }, delegate (IDataReader reader, short set) //single Record Mapper
                {
                    // oneShape > secondShape - reader from Dabular Datastring (DB) >>> Addresses - this is where we hydrate the model (fill it with data)

                    // can apply MapAddress(reader) here as well
                    address = new Address();

                    int startingIndex = 0;

                    address.Id = reader.GetSafeInt32(startingIndex++);
                    address.LineOne = reader.GetSafeString(startingIndex++);
                    address.SuiteNumber = reader.GetSafeInt32(startingIndex++);
                    address.City = reader.GetSafeString(startingIndex++);
                    address.State = reader.GetSafeString(startingIndex++);
                    address.PostalCode = reader.GetSafeString(startingIndex++);
                    address.IsActive = reader.GetSafeBool(startingIndex++);
                    address.Lat = reader.GetSafeDouble(startingIndex++);
                    address.Long = reader.GetSafeDouble(startingIndex++);
                }

                );

                return address;
            }

            //review weird way to clear GetTop() error
            public List<Address> GetTop()
            {
            // list is the multi-mapper tool to be used with singleRecordMapper
            //always substantiating null
            List<Address> list = null;
                string procName = "[dbo].[Sabio_Addresses_SelectRandom50]";

                _data.ExecuteCmd(procName, inputParamMapper: null
                    ,singleRecordMapper: delegate (IDataReader reader, short set) //single Record Mapper
                    {
                        // Builds a method that returns an Address
                        //takes data from the reader
                        //shapes it into Address and returns a map Address
                        //Highlight right side - right click Quick Actions - Extract Method
                        Address aAddress = MapAddress(reader);


                        // Need the if statement other it will scrap the list for a new instance each turn the mapper
                        if (list == null)
                        {
                            //be sure to create a new instance of list else NullReference Error
                            list = new List<Address>();
                        }

                        list.Add(aAddress);
                    }

                );

            return list;
            }


            // VS generated code after extrating method
            private static void AddCommonParams(AddressAddRequest model, SqlParameterCollection col)
            {
                col.AddWithValue("@LineOne", model.LineOne);
                col.AddWithValue("@SuiteNumber", model.SuiteNumber);
                col.AddWithValue("@City", model.City);
                col.AddWithValue("@State", model.State);
                col.AddWithValue("@PostalCode", model.PostalCode);
                col.AddWithValue("@IsActive", model.IsActive);
                col.AddWithValue("@Lat", model.Lat);
                col.AddWithValue("@Long", model.Long);
            }


            private static Address MapAddress(IDataReader reader)
            {
                Address aAddress = new Address();

                int startingIndex = 0;

                aAddress.Id = reader.GetSafeInt32(startingIndex++);
                aAddress.LineOne = reader.GetSafeString(startingIndex++);
                aAddress.SuiteNumber = reader.GetSafeInt32(startingIndex++);
                aAddress.City = reader.GetSafeString(startingIndex++);
                aAddress.State = reader.GetSafeString(startingIndex++);
                aAddress.PostalCode = reader.GetSafeString(startingIndex++);
                aAddress.IsActive = reader.GetSafeBool(startingIndex++);
                aAddress.Lat = reader.GetSafeDouble(startingIndex++);
                aAddress.Long = reader.GetSafeDouble(startingIndex++);
                return aAddress;
            }
        };



    }



```

```C#

    public class AddressesService
    {
        public Address Get(int id)
        {
            return null;
        }
    }

```

    - Open Program.cs
    - Under TestConnection
        - Add Service call by creating new instance
            - add using Sabio.Services by right clicking error

```C#

    AddressesService addressService = new AddressesService();

```

    - Go back to Service file and add a parameterless constructor
    - Definition of a constructor
        - Method that does not return
        - named after the class it is encapsulated in
        - used to construct the use and build of, create an instance of the class.

```C#
    public class AddressesService
    {
        public AddressesService()
        {

        }
        public Address Get(int id)
        {
            return null;
        }
    }
```

    - Go back to Program.cs

```C#

    addressService.Get(9);

```

    - Test Save and Build
    - Assign function to Get

```C#
    public class AddressesService
    {
        public AddressesService()
        {

        }
        public Address Get(int id)
        {
            Address address = null;

            return address;
        }
    }
```

# Execute Command - Returning one record

    - Use IDataProvider: used to execute a SQL SELECT
    - delegate
    - Have to create the instance first
    - Look at Proc output, DO NOT look at the table

```C#

public class AddressesService
    {

        //Add a point to be able to reference data later on.
        IDataProvider _data = null;

        //want to save data, but data goes away after ran.
        public AddressesService(IDataProvider data)
        {
            _data = data;
        }
        public Address Get(int id)

        {

            string procName = "[dbo].[Sabio_Addresses_SelectById]";

            Address address = null;

            _data.ExecuteCmd(procName, delegate (SqlParameterCollection paramCollection)
            {
                paramCollection.AddWithValue("@Id", id);

            }, delegate (IDataReader reader, short set) //single Record Mapper
            {
                // oneShape > secondShape - reader from Dabular Datastring (DB) >>> Addresses - this is where we hydrate the model (fill it with data)

                address = new Address();

                int startingIndex = 0;

                address.Id = reader.GetSafeInt32(startingIndex++);
                address.LineOne = reader.GetSafeString(startingIndex++);
                address.SuiteNumber = reader.GetSafeInt32(startingIndex++);
                address.City = reader.GetSafeString(startingIndex++);
                address.State = reader.GetSafeString(startingIndex++);
                address.PostalCode = reader.GetSafeString(startingIndex++);
                address.isActive = reader.GetSafeBool(startingIndex++);
                address.Lat = reader.GetSafeDouble(startingIndex++);
                address.Long = reader.GetSafeDouble(startingIndex++);
            }

            );

            return address;
        }
    }

```

# Execute Command - Returning multiple records

    - System.NullReferenceException:'Object refernce not set to an instance of an object

    - Dry principal Violation

# Execute NonQuery

# Passing Multi Recs to SQL datatable

Create a Skills Request Model
Create DataTable matched with UDT - can exercise defensive programming - Ensure DataTable is setup - Has Datatable dt = new DataTable();
Populate with list of Skills
Use loop - foreach - Create a row: DataRow dr = dt.NewRow():
dt.Rows.Add(dr)
