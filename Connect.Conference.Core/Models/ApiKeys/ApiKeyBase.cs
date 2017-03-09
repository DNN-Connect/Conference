
using System;
using System.Runtime.Serialization;
using DotNetNuke.ComponentModel.DataAnnotations;
using Connect.Conference.Core.Data;

namespace Connect.Conference.Core.Models.ApiKeys
{
    [TableName("Connect_Conference_ApiKeys")]
    [DataContract]
    public partial class ApiKeyBase     {

        #region .ctor
        public ApiKeyBase()
        {
        }
        #endregion

        #region Properties
        [DataMember]
        public string ApiKey { get; set; }
        [DataMember]
        public DateTime? Expires { get; set; }
        [DataMember]
        public int CreatedByUserID { get; set; }
        [DataMember]
        public DateTime CreatedOnDate { get; set; }
        #endregion

        #region Methods
        public void ReadApiKeyBase(ApiKeyBase apiKey)
        {
            if (!String.IsNullOrEmpty(apiKey.ApiKey))
                ApiKey = apiKey.ApiKey;

            if (apiKey.Expires != null)
            Expires = apiKey.Expires;

            if (apiKey.CreatedByUserID > -1)
                CreatedByUserID = apiKey.CreatedByUserID;

            CreatedOnDate = apiKey.CreatedOnDate;

        }
        #endregion

    }
}



