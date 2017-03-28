using DotNetNuke.Data;
using DotNetNuke.Framework;
using System;
using System.Collections.Generic;

namespace Connect.DNN.Modules.Conference.Integration.NBright
{
    public class NBrightRepository : ServiceLocator<INBrightRepository, NBrightRepository>, INBrightRepository
    {
        protected override Func<INBrightRepository> GetFactory()
        {
            return () => new NBrightRepository();
        }
        public IEnumerable<NBrightOrder> GetOrders(int portalId)
        {
            using (var context = DataContext.Instance())
            {
                var sql = @"select
 nb.ItemId,
 u.DisplayName OrderedBy,
 nb.XMLData.value('genxml[1]/ordernumber[1]', 'varchar(50)') OrderNr,
 nb.XMLData.value('genxml[1]/createddate[1]', 'datetime') CreatedDate,
 nb.XMLData.value('genxml[1]/audit[1]/genxml[status][last()]/status[1]', 'int') OrderStatus,
 nb.XMLData.value('genxml[1]/appliedsubtotal[1]', 'float') SubTotal,
 nb.XMLData.value('genxml[1]/totalsalediscount[1]', 'float') Discount,
 nb.XMLData.value('genxml[1]/appliedtotal[1]', 'float') Total,
 nb.XMLData.value('count(genxml[1]/items[1]/genxml)', 'int') NrParticipants
from dbo.NBrightBuy nb
inner join dbo.Users u on u.UserID=nb.UserId
where nb.TypeCode='ORDER'
 and nb.PortalId=@0
";
                return context.ExecuteQuery<NBrightOrder>(System.Data.CommandType.Text,
                    sql, portalId);
            }
        }

        public IEnumerable<NBrightOrderItem> GetOrderItems(int conferenceId, int itemId)
        {
            using (var context = DataContext.Instance())
            {
                var sql = @"select
 nbdata.*,
 u.UserID,
 a.Status AttendeeStatus,
 a.UserId AttendeeUserId,
 (select top 1 u2.UserID from dbo.Users u2 where u2.FirstName=nbdata.FirstName AND u2.LastName=nbdata.LastName) AlternativeUserId
from
(select
 nb.ItemId,
 u.DisplayName OrderedBy,
 nb.XMLData.value('genxml[1]/ordernumber[1]', 'varchar(50)') OrderNr,
 nb.XMLData.value('genxml[1]/createddate[1]', 'datetime') CreatedDate,
 nb.XMLData.value('genxml[1]/audit[1]/genxml[status][last()]/status[1]', 'int') OrderStatus,
 nb.XMLData.value('genxml[1]/appliedsubtotal[1]', 'float') SubTotal,
 nb.XMLData.value('genxml[1]/totalsalediscount[1]', 'float') Discount,
 nb.XMLData.value('genxml[1]/appliedtotal[1]', 'float') Total,
 nb.XMLData.value('count(genxml[1]/items[1]/genxml)', 'int') NrParticipants,
 T2.prod.value('productname[1]', 'varchar(50)') ProductName,
 T2.prod.value('unitcost[1]', 'float') Cost,
 T2.prod.value('options[1]/option[optname=""Sharing preferences""][1]/optvalueid[1]', 'varchar(10)') Sharing,
 T2.prod.value('options[1]/option[optname=""Gender""][1]/optvaltext[1]', 'varchar(10)') Gender,
 ISNULL(T2.prod.value('options[1]/option[optname=""First Name""][1]/optvaltext[1]', 'varchar(50)'),
 T2.prod.value('options[1]/option[optname=""First name""][1]/optvaltext[1]', 'varchar(50)')) FirstName,
 T2.prod.value('options[1]/option[optname=""Last Name""][1]/optvaltext[1]', 'varchar(50)') LastName,
 T2.prod.value('options[1]/option[optname=""Company""][1]/optvaltext[1]', 'varchar(50)') Company,
 T2.prod.value('options[1]/option[optname=""email""][1]/optvaltext[1]', 'varchar(100)') Email,
 T2.prod.value('options[1]/option[optname=""Arrival Date""][1]/optvaltext[1]', 'date') Arrival,
 T2.prod.value('options[1]/option[optname=""Departure date""][1]/optvaltext[1]', 'date') Departure
from dbo.NBrightBuy nb
inner join dbo.Users u on u.UserID = nb.UserId
cross apply nb.XMLData.nodes('genxml[1]/items[1]/genxml') as T2(prod)
where nb.TypeCode = 'ORDER') nbdata
  left join dbo.Users u on u.Email = nbdata.Email
left join dbo.Connect_Conference_Attendees a on a.UserId = u.UserID and a.ConferenceId = @0
where nbdata.ItemId = @1
";
                return context.ExecuteQuery<NBrightOrderItem>(System.Data.CommandType.Text,
                    sql, conferenceId, itemId);
            }
        }

        public IEnumerable<NBrightAudit> GetOrderAudit(int itemId)
        {
            using (var context = DataContext.Instance())
            {
                var sql = @"select * from
(select
 nb.ItemId,
 T2.aud.value('date[1]', 'datetime') AuditDate,
 T2.aud.value('type[1]', 'varchar(50)') AuditType,
 T2.aud.value('username[1]', 'nvarchar(100)') Username,
 T2.aud.value('status[1]', 'int') OrderStatus,
 T2.aud.value('msg[1]', 'nvarchar(1000)') Message
from dbo.NBrightBuy nb
inner join dbo.Users u on u.UserID = nb.UserId
cross apply nb.XMLData.nodes('genxml[1]/audit[1]/genxml') as T2(aud)
where nb.TypeCode = 'ORDER'
 and nb.ItemId = @0) x
order by x.AuditDate
";
                return context.ExecuteQuery<NBrightAudit>(System.Data.CommandType.Text,
                    sql, itemId);
            }
        }

    }
    public interface INBrightRepository
    {
        IEnumerable<NBrightOrder> GetOrders(int portalId);
        IEnumerable<NBrightOrderItem> GetOrderItems(int conferenceId, int itemId);
        IEnumerable<NBrightAudit> GetOrderAudit(int itemId);
    }
}