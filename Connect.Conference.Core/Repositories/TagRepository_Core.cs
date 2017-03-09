using System;
using System.Collections.Generic;
using System.Linq;
using DotNetNuke.Common;
using DotNetNuke.Data;
using DotNetNuke.Framework;
using Connect.Conference.Core.Models.Tags;

namespace Connect.Conference.Core.Repositories
{

	public partial class TagRepository : ServiceLocator<ITagRepository, TagRepository>, ITagRepository
 {
        protected override Func<ITagRepository> GetFactory()
        {
            return () => new TagRepository();
        }
        public IEnumerable<Tag> GetTags()
        {
            using (var context = DataContext.Instance())
            {
                var rep = context.GetRepository<Tag>();
                return rep.Get();
            }
        }
        public IEnumerable<Tag> GetTagsByConference(int conferenceId)
        {
            using (var context = DataContext.Instance())
            {
                return context.ExecuteQuery<Tag>(System.Data.CommandType.Text,
                    "SELECT * FROM {databaseOwner}{objectQualifier}vw_Connect_Conference_Tags WHERE ConferenceId=@0",
                    conferenceId);
            }
        }
        public Tag GetTag(int tagId)
        {
            using (var context = DataContext.Instance())
            {
                var rep = context.GetRepository<Tag>();
                return rep.GetById(tagId);
            }
        }
        public int AddTag(ref TagBase tag, int userId)
        {
            Requires.NotNull(tag);
            tag.CreatedByUserID = userId;
            tag.CreatedOnDate = DateTime.Now;
            tag.LastModifiedByUserID = userId;
            tag.LastModifiedOnDate = DateTime.Now;
            using (var context = DataContext.Instance())
            {
                var rep = context.GetRepository<TagBase>();
                rep.Insert(tag);
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
        public void DeleteTag(int tagId)
        {
            using (var context = DataContext.Instance())
            {
                var rep = context.GetRepository<TagBase>();
                rep.Delete("WHERE TagId = @0", tagId);
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
    public partial interface ITagRepository
    {
        IEnumerable<Tag> GetTags();
        IEnumerable<Tag> GetTagsByConference(int conferenceId);
        Tag GetTag(int tagId);
        int AddTag(ref TagBase tag, int userId);
        void DeleteTag(TagBase tag);
        void DeleteTag(int tagId);
        void UpdateTag(TagBase tag, int userId);
    }
}

