using Connect.Conference.Core.Models.SessionEvaluations;
using DotNetNuke.Data;
using DotNetNuke.Framework;
using System;

namespace Connect.Conference.Core.Repositories
{
    public partial class SessionEvaluationRepository : ServiceLocator<ISessionEvaluationRepository, SessionEvaluationRepository>, ISessionEvaluationRepository
    {
        public void SetSessionEvaluation(SessionEvaluationBase sessionEvaluation, int userId)
        {
            sessionEvaluation.CreatedByUserID = userId;
            sessionEvaluation.CreatedOnDate = DateTime.Now;
            sessionEvaluation.LastModifiedByUserID = userId;
            sessionEvaluation.LastModifiedOnDate = DateTime.Now;
            using (var context = DataContext.Instance())
            {
                context.Execute(System.Data.CommandType.Text,
                    "IF NOT EXISTS (SELECT * FROM {databaseOwner}{objectQualifier}Connect_Conference_SessionEvaluations " +
                    "WHERE SessionId=@0 AND UserId=@1) " +
                    "INSERT INTO {databaseOwner}{objectQualifier}Connect_Conference_SessionEvaluations (SessionId, UserId, Stars, Review, CreatedByUserID, CreatedOnDate, LastModifiedByUserID, LastModifiedOnDate) " +
                    "SELECT @0, @1, @2, @3, @4, @5, @6, @7 " +
                    "ELSE " +
                    "UPDATE {databaseOwner}{objectQualifier}Connect_Conference_SessionEvaluations " +
                    "SET Stars=@2, Review=@3, LastModifiedByUserID=@6, LastModifiedOnDate=@7 " +
                    "WHERE SessionId=@0 AND UserId=@1", sessionEvaluation.SessionId, sessionEvaluation.UserId, sessionEvaluation.Stars, sessionEvaluation.Review, sessionEvaluation.CreatedByUserID, sessionEvaluation.CreatedOnDate, sessionEvaluation.LastModifiedByUserID, sessionEvaluation.LastModifiedOnDate);
            }
        }

    }
    public partial interface ISessionEvaluationRepository
    {
        void SetSessionEvaluation(SessionEvaluationBase sessionEvaluation, int userId);
    }
}

