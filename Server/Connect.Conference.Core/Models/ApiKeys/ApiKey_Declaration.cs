
using System;
using System.Runtime.Serialization;
using DotNetNuke.ComponentModel.DataAnnotations;

namespace Connect.Conference.Core.Models.ApiKeys
{

    [TableName("vw_Connect_Conference_ApiKeys")]
    [PrimaryKey("ApiKey", AutoIncrement = false)]
    [DataContract]
    public partial class ApiKey  : ApiKeyBase 
    {

        #region .ctor
        public ApiKey()  : base() 
        {
        }
        #endregion

        #region Properties
        [DataMember]
        public string CreatedByUser { get; set; }
        [DataMember]
        public string CreatedByUserName { get; set; }
        #endregion

        #region Methods
        public ApiKeyBase GetApiKeyBase()
        {
            ApiKeyBase res = new ApiKeyBase();
             res.ApiKey = ApiKey;
             res.ConferenceId = ConferenceId;
             res.Expires = Expires;
             res.CreatedByUserID = CreatedByUserID;
             res.CreatedOnDate = CreatedOnDate;
            return res;
        }
        public ApiKey Clone()
        {
            ApiKey res = new ApiKey();
            res.ApiKey = ApiKey;
            res.ConferenceId = ConferenceId;
            res.Expires = Expires;
            res.CreatedByUserID = CreatedByUserID;
            res.CreatedOnDate = CreatedOnDate;
            res.CreatedByUser = CreatedByUser;
            res.CreatedByUserName = CreatedByUserName;
            return res;
        }
        #endregion

    }
}
