
using System;
using System.Text;
using DotNetNuke.Services.Scheduling;

namespace Connect.DNN.Modules.Conference.Common
{
    public class ConferenceService : SchedulerClient
    {

        private StringBuilder log = new StringBuilder();

        public ConferenceService(ScheduleHistoryItem historyItem)
        {
            ScheduleHistoryItem = historyItem;
        }

        public override void DoWork()
        {
            Progressing();

            try
            {
                log.AppendLine("Finished");
                ScheduleHistoryItem.AddLogNote(log.ToString());
                ScheduleHistoryItem.Succeeded = true;
            }
            catch (Exception ex)
            {
                ScheduleHistoryItem.AddLogNote(log.ToString() + "<br />Scheduled task failed: " + ex.Message + "(" + ex.StackTrace + ")<br />");
                ScheduleHistoryItem.Succeeded = false;
                Errored(ref ex);
                DotNetNuke.Services.Exceptions.Exceptions.LogException(ex);
            }
        }
    }
}