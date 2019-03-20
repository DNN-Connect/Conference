using System;
using System.CodeDom;
using System.Collections.Generic;
using System.Linq;
using DotNetNuke.Collections;
using DotNetNuke.Common;
using DotNetNuke.Data;
using DotNetNuke.Framework;
using Connect.Conference.Core.Data;
using Connect.Conference.Core.Models.Tags;

namespace Connect.Conference.Core.Repositories
{

    public partial class TagRepository : ServiceLocator<ITagRepository, TagRepository>, ITagRepository
    {
        public Tag GetTag(int conferenceId, int tagId)
        {
            using (var context = DataContext.Instance())
            {
                var rep = context.GetRepository<Tag>();
                return rep.GetById(tagId, conferenceId);
            }
        }
        public Tag GetTagByName(int conferenceId, string tagName)
        {
            using (var context = DataContext.Instance())
            {
                return context.ExecuteSingleOrDefault<Tag>(System.Data.CommandType.Text,
                    "SELECT * FROM {databaseOwner}{objectQualifier}vw_Connect_Conference_Tags WHERE ConferenceId=@0 AND TagName=@1",
                    conferenceId, tagName);
            }
        }
        public IEnumerable<TagWithVote> GetTagsWithVote(int conferenceId, int userId)
        {
            using (var context = DataContext.Instance())
            {
                return context.ExecuteQuery<TagWithVote>(System.Data.CommandType.Text,
                    "SELECT t.*, ISNULL(tv.UserId, 0) Voted FROM {databaseOwner}{objectQualifier}vw_Connect_Conference_Tags t LEFT JOIN {databaseOwner}{objectQualifier}Connect_Conference_TagVotes tv ON tv.TagId=t.TagId AND tv.UserId=@1 WHERE ConferenceId=@0",
                    conferenceId, userId);
            }
        }
        public IEnumerable<Tag> SearchTags(int conferenceId, string search)
        {
            using (var context = DataContext.Instance())
            {
                return context.ExecuteQuery<Tag>(System.Data.CommandType.Text,
                    "SELECT * FROM {databaseOwner}{objectQualifier}vw_Connect_Conference_Tags WHERE ConferenceId=@0 AND TagName LIKE '%' + @1 + '%'",
                    conferenceId, search);
            }
        }
        public int AddTagSafe(ref TagBase tag, int userId)
        {
            Requires.NotNull(tag);
            Requires.PropertyNotNegative(tag, "ConferenceId");
            tag.CreatedByUserID = userId;
            tag.CreatedOnDate = DateTime.Now;
            tag.LastModifiedByUserID = userId;
            tag.LastModifiedOnDate = DateTime.Now;
            var existing = GetTagByName(tag.ConferenceId, tag.TagName);
            if (existing != null)
            {
                tag = existing.GetTagBase();
            }
            else
            {
                using (var context = DataContext.Instance())
                {
                    var rep = context.GetRepository<TagBase>();
                    rep.Insert(tag);
                }
            }
            return tag.TagId;
        }
        public void DeleteTag(int conferenceId, int tagId)
        {
            using (var context = DataContext.Instance())
            {
                var rep = context.GetRepository<TagBase>();
                rep.Delete("WHERE ConferenceId = @0 AND TagId = @1", conferenceId, tagId);
            }
        }
    }

    public partial interface ITagRepository
    {
        Tag GetTag(int conferenceId, int tagId);
        Tag GetTagByName(int conferenceId, string tagName);
        IEnumerable<TagWithVote> GetTagsWithVote(int conferenceId, int userId);
        IEnumerable<Tag> SearchTags(int conferenceId, string search);
        int AddTagSafe(ref TagBase tag, int userId);
        void DeleteTag(int conferenceId, int tagId);
    }
}

