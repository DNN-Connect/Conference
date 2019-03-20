import * as React from "react";
import * as ReactDOM from "react-dom";
import * as $ from "jquery";

import { AppManager } from "./AppManager";

import AttendeeTable from "./AttendeeTable/AttendeeTable";
import AttendanceButton from "./Attendance/AttendanceButton";
import TimesheetEditor from "./TimesheetEditor/TimesheetEditor";
import Comments from "./Comments/Comments";
import Tags from "./Tags/Tags";
import Speakers from "./Speakers/Speakers";
import TagVotes from "./TagVotes/TagVotes";
import SessionVotes from "./SessionVotes/SessionVotes";
import Scheduler from "./Scheduler/Scheduler";
import Resources from "./Resources/Resources";
import BulkAddUsers from "./BulkAddUsers/BulkAddUsers";
import SessionStatusButton from "./Buttons/SessionStatusButton";
import SessionManager from "./SessionManager/SessionManager";
import LiveTicker from "./LiveTicker/LiveTicker";
import NBrightOrders from "./NBright/OrderTable";
import SpeakerImage from "./Speakers/SpeakerImage";
import AttendeeImage from "./Attendance/AttendeeImage";

export class ComponentLoader {
  public static load(): void {
    $(".timesheetEditor").each(function(i, el) {
      var moduleId = $(el).data("moduleid");
      var slots = $(el).data("slots");
      var locations = $(el).data("locations");
      var conferenceId = $(el).data("conference");
      var nrDays = $(el).data("nrdays");
      ReactDOM.render(
        <TimesheetEditor
          module={AppManager.Modules.Item(moduleId.toString())}
          slots={slots}
          locations={locations}
          conferenceId={conferenceId}
          nrDays={nrDays}
        />,
        el
      );
    });
    $(".commentsComponent").each(function(i, el) {
      var moduleId = $(el).data("moduleid");
      var conferenceId = $(el).data("conference");
      var sessionId = $(el).data("session");
      var visibility = $(el).data("visibility");
      var pageSize = $(el).data("pagesize");
      var comments = $(el).data("comments");
      var appPath = $(el).data("apppath");
      var totalComments = $(el).data("totalcomments");
      var loggedIn = $(el).data("loggedin");
      var title = $(el).data("title");
      var help = $(el).data("help");
      ReactDOM.render(
        <Comments
          module={AppManager.Modules.Item(moduleId.toString())}
          conferenceId={conferenceId}
          sessionId={sessionId}
          appPath={appPath}
          totalComments={totalComments}
          loggedIn={loggedIn}
          title={title}
          help={help}
          visibility={visibility}
          pageSize={pageSize}
          comments={comments}
        />,
        el
      );
    });
    $(".tagsComponent").each(function(i, el) {
      var moduleId = $(el).data("moduleid");
      var fieldName = $(el).data("name");
      var placeholder = $(el).data("placeholder");
      var tags = $(el).data("tags");
      ReactDOM.render(
        <Tags
          module={AppManager.Modules.Item(moduleId.toString())}
          name={fieldName}
          tags={tags}
          placeholder={placeholder}
          conferenceId={$(el).data("conference")}
        />,
        el
      );
    });
    $(".speakersComponent").each(function(i, el) {
      var moduleId = $(el).data("moduleid");
      var conferenceId = $(el).data("conference");
      var sessionId = $(el).data("session");
      var speakers = $(el).data("speakers");
      ReactDOM.render(
        <Speakers
          module={AppManager.Modules.Item(moduleId.toString())}
          speakers={speakers}
          sessionId={sessionId}
          conferenceId={conferenceId}
        />,
        el
      );
    });
    $(".tagVoteComponent").each(function(i, el) {
      var moduleId = $(el).data("moduleid");
      var conferenceId = $(el).data("conference");
      var voteList = $(el).data("votelist");
      var allowVote = $(el).data("allowvote");
      var allowAdd = $(el).data("allowadd");
      ReactDOM.render(
        <TagVotes
          module={AppManager.Modules.Item(moduleId.toString())}
          voteList={voteList}
          allowVote={allowVote}
          allowAdd={allowAdd}
          conferenceId={conferenceId}
        />,
        el
      );
    });
    $(".sessionVoteComponent").each(function(i, el) {
      var moduleId = $(el).data("moduleid");
      var conferenceId = $(el).data("conference");
      var voteList = $(el).data("votelist");
      var allowVote = $(el).data("allowvote");
      ReactDOM.render(
        <SessionVotes
          module={AppManager.Modules.Item(moduleId.toString())}
          voteList={voteList}
          allowVote={allowVote}
          conferenceId={conferenceId}
        />,
        el
      );
    });
    $(".schedulerComponent").each(function(i, el) {
      var moduleId = $(el).data("moduleid");
      var conference = $(el).data("conference");
      var nrDays = $(el).data("nrdays");
      var slots = $(el).data("slots");
      var sessions = $(el).data("sessions");
      var gridHeight = $(el).data("gridheight");
      var locations = $(el).data("locations");
      ReactDOM.render(
        <Scheduler
          module={AppManager.Modules.Item(moduleId.toString())}
          conference={conference}
          locations={locations}
          nrDays={nrDays}
          slots={slots}
          sessions={sessions}
          gridHeight={gridHeight}
        />,
        el
      );
    });
    $(".resourcesComponent").each(function(i, el) {
      var moduleId = $(el).data("moduleid");
      var conferenceId = $(el).data("conferenceid");
      var sessionId = $(el).data("sessionid");
      var resources = $(el).data("resources");
      var canAdd = $(el).data("canadd");
      var resourceDir = $(el).data("resourcedir");
      ReactDOM.render(
        <Resources
          module={AppManager.Modules.Item(moduleId.toString())}
          conferenceId={conferenceId}
          resources={resources}
          canAdd={canAdd}
          sessionId={sessionId}
          resourceDir={resourceDir}
        />,
        el
      );
    });
    $(".bulkAddUsersComponent").each(function(i, el) {
      var moduleId = $(el).data("moduleid");
      var conferenceId = $(el).data("conferenceid");
      var type = $(el).data("type");
      ReactDOM.render(
        <BulkAddUsers
          module={AppManager.Modules.Item(moduleId.toString())}
          conferenceId={conferenceId}
          type={type}
        />,
        el
      );
    });
    $(".sessionStatusButton").each(function(i, el) {
      var moduleId = $(el).data("moduleid");
      ReactDOM.render(
        <SessionStatusButton
          module={AppManager.Modules.Item(moduleId.toString())}
          options={$(el).data("options")}
          selected={$(el).data("selected")}
          conferenceId={$(el).data("conferenceid")}
          sessionId={$(el).data("sessionid")}
        />,
        el
      );
    });
    $(".sessionManager").each(function(i, el) {
      var moduleId = $(el).data("moduleid");
      ReactDOM.render(
        <SessionManager
          module={AppManager.Modules.Item(moduleId.toString())}
          statusOptions={$(el).data("statusoptions")}
          tracks={$(el).data("tracks")}
          conferenceId={$(el).data("conferenceid")}
          sessions={$(el).data("sessions")}
        />,
        el
      );
    });
    $(".attendeeTable").each(function(i, el) {
      var moduleId = $(el).data("moduleid");
      ReactDOM.render(
        <AttendeeTable
          module={AppManager.Modules.Item(moduleId.toString())}
          conferenceId={$(el).data("conferenceid")}
          attendees={$(el).data("attendees")}
        />,
        el
      );
    });
    $(".liveTicker").each(function(i, el) {
      var moduleId = $(el).data("moduleid");
      ReactDOM.render(
        <LiveTicker
          module={AppManager.Modules.Item(moduleId.toString())}
          conferenceId={$(el).data("conferenceid")}
          locations={$(el).data("locations")}
          pollingSeconds={$(el).data("polling-seconds")}
        />,
        el
      );
    });
    $(".nbright").each(function(i, el) {
      var moduleId = $(el).data("moduleid");
      ReactDOM.render(
        <NBrightOrders
          module={AppManager.Modules.Item(moduleId.toString())}
          conferenceId={$(el).data("conferenceid")}
          orders={$(el).data("orders")}
        />,
        el
      );
    });
    $(".sessionAttendanceButton").each(function(i, el) {
      var moduleId = $(el).data("moduleid");
      ReactDOM.render(
        <AttendanceButton
          module={AppManager.Modules.Item(moduleId.toString())}
          session={$(el).data("session")}
        />,
        el
      );
    });
    $(".speakerImage").each((i, el) => {
      var moduleId = $(el).data("moduleid");
      ReactDOM.render(
        <SpeakerImage
          module={AppManager.Modules.Item(moduleId.toString())}
          speaker={$(el).data("speaker")}
          fieldName={$(el).data("field")}
          homeDir={$(el).data("homedir")}
        />,
        el
      );
    });
    $(".attendeeImage").each((i, el) => {
      var moduleId = $(el).data("moduleid");
      ReactDOM.render(
        <AttendeeImage
          module={AppManager.Modules.Item(moduleId.toString())}
          attendee={$(el).data("attendee")}
          fieldName={$(el).data("field")}
          homeDir={$(el).data("homedir")}
        />,
        el
      );
    });
  }
}
