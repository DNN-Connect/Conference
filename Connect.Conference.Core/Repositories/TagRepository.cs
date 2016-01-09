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

    public class TagRepository : ServiceLocator<ITagRepository, TagRepository>, ITagRepository
    {
        protected override Func<ITagRepository> GetFactory()
        {
            return () => new TagRepository();
        }
        public IEnumerable<Tag> GetTags(int conferenceId)
        {
            using (var context = DataContext.Instance())
            {
                var rep = context.GetRepository<Tag>();
                return rep.Get(conferenceId);
            }
        }
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
        public IEnumerable<Tag> SearchTags(int conferenceId, string search)
        {
            using (var context = DataContext.Instance())
            {
                return context.ExecuteQuery<Tag>(System.Data.CommandType.Text,
                    "SELECT * FROM {databaseOwner}{objectQualifier}vw_Connect_Conference_Tags WHERE ConferenceId=@0 AND TagName LIKE '%' + @1 + '%'",
                    conferenceId, search);
            }
        }
        public int AddTag(ref TagBase tag, int userId)
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
        public void DeleteTag(TagBase tag)
        {
            Requires.NotNull(tag);
            Requires.PropertyNotNegative(tag, "TagId");
            using (var context = DataContext.Instance())
            {
                var rep = context.GetRepository<TagBase>();
                rep.Delete(tag);
            }
        }
        public void DeleteTag(int conferenceId, int tagId)
        {
            using (var context = DataContext.Instance())
            {
                var rep = context.GetRepository<TagBase>();
                rep.Delete("WHERE ConferenceId = @0 AND TagId = @1", conferenceId, tagId);
            }
        }
        public void UpdateTag(TagBase tag, int userId)
        {
            Requires.NotNull(tag);
            Requires.PropertyNotNegative(tag, "TagId");
            tag.LastModifiedByUserID = userId;
            tag.LastModifiedOnDate = DateTime.Now;
            using (var context = DataContext.Instance())
            {
                var rep = context.GetRepository<TagBase>();
                rep.Update(tag);
            }
        }
    }

    public interface ITagRepository
    {
        IEnumerable<Tag> GetTags(int conferenceId);
        Tag GetTag(int conferenceId, int tagId);
        Tag GetTagByName(int conferenceId, string tagName);
        IEnumerable<Tag> SearchTags(int conferenceId, string search);
        int AddTag(ref TagBase tag, int userId);
        void DeleteTag(TagBase tag);
        void DeleteTag(int conferenceId, int tagId);
        void UpdateTag(TagBase tag, int userId);
    }
}

