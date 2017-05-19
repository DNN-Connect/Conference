
using System;
using System.Runtime.Serialization;
using DotNetNuke.ComponentModel.DataAnnotations;
using Connect.Conference.Core.Data;

namespace Connect.Conference.Core.Models.SessionEvaluations
{
    [TableName("Connect_Conference_SessionEvaluations")]
    [DataContract]
    public partial class SessionEvaluationBase  : AuditableEntity 
    {

        #region .ctor
        public SessionEvaluationBase()
        {
        }
        #endregion

        #region Properties
        [DataMember]
        public int SessionId { get; set; }
        [DataMember]
        public int UserId { get; set; }
        [DataMember]
        public int Stars { get; set; }
        [DataMember]
        public string Review { get; set; }
        #endregion

        #region Methods
        public void ReadSessionEvaluationBase(SessionEvaluationBase sessionEvaluation)
        {
            if (sessionEvaluation.SessionId > -1)
                SessionId = sessionEvaluation.SessionId;

            if (sessionEvaluation.UserId > -1)
                UserId = sessionEvaluation.UserId;

            if (sessionEvaluation.Stars > -1)
                Stars = sessionEvaluation.Stars;

            if (!String.IsNullOrEmpty(sessionEvaluation.Review))
                Review = sessionEvaluation.Review;

        }
        #endregion

    }
}



