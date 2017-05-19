
using System;
using System.Runtime.Serialization;
using DotNetNuke.ComponentModel.DataAnnotations;

namespace Connect.Conference.Core.Models.SessionEvaluations
{

    [TableName("vw_Connect_Conference_SessionEvaluations")]
    [DataContract]
    public partial class SessionEvaluation  : SessionEvaluationBase 
    {

        #region .ctor
        public SessionEvaluation()  : base() 
        {
        }
        #endregion

        #region Properties
        [DataMember]
        public string DisplayName { get; set; }
        [DataMember]
        public string CreatedByUser { get; set; }
        [DataMember]
        public string LastModifiedByUser { get; set; }
        #endregion

        #region Methods
        public SessionEvaluationBase GetSessionEvaluationBase()
        {
            SessionEvaluationBase res = new SessionEvaluationBase();
             res.SessionId = SessionId;
             res.UserId = UserId;
             res.Stars = Stars;
             res.Review = Review;
  res.CreatedByUserID = CreatedByUserID;
  res.CreatedOnDate = CreatedOnDate;
  res.LastModifiedByUserID = LastModifiedByUserID;
  res.LastModifiedOnDate = LastModifiedOnDate;
            return res;
        }
        #endregion

    }
}
