import * as React from "react";
import * as Models from "../Models/";
import * as moment from "moment";
import * as interact from "interactjs";
import SchedulerUnscheduledSession from "./SchedulerUnscheduledSession";
import SchedulerDay from "./SchedulerDay";
import { moveObject } from "../Common";

interface ISchedulerProps {
  module: Models.IAppModule;
  conference: Models.IConference;
  nrDays: number;
  slots: Models.ISlot[];
  sessions: Models.ISession[];
  locations: Models.ILocation[];
  gridHeight: number;
}

interface ISchedulerState {
  sessionList: Models.ISession[];
  locationList: object;
  selectedTab: number;
}

export default class Scheduler extends React.Component<
  ISchedulerProps,
  ISchedulerState
> {
  refs: {
    unscheduledColumn: HTMLDivElement;
    schedulerColumn: HTMLDivElement;
  };

  constructor(props: ISchedulerProps) {
    super(props);
    var locationList = {};
    for (var i = 0; i < props.locations.length; i++) {
      locationList[props.locations[i].LocationId] = i;
    }
    this.state = {
      sessionList: props.sessions,
      locationList: locationList,
      selectedTab: 1
    };
  }

  hasReset = true;

  render() {
    var unscheduledSessions = this.state.sessionList.map(item => {
      if (item.SlotId == 0) {
        return (
          <SchedulerUnscheduledSession
            {...this.props}
            session={item}
            key={item.SessionId}
          />
        );
      } else {
        return null;
      }
    });
    var scheduleTabs: JSX.Element[] = [];
    var scheduleDays: JSX.Element[] = [];
    for (var i = 1; i <= this.props.nrDays; i++) {
      var daySlots: Models.ISlot[] = [];
      for (var j = 0; j < this.props.slots.length; j++) {
        var slot = this.props.slots[j];
        if (slot.DayNr === undefined || slot.DayNr === i) {
          daySlots.push(slot);
        }
      }
      var tabClass = i == this.state.selectedTab ? "active" : "";
      var date = new Date(this.props.conference.StartDate || new Date());
      date = date.addDays(i - 1);
      var dateString = moment(date).format("dddd MMM Do");
      scheduleTabs.push(
        <li role="presentation" className={tabClass}>
          <a
            href="#"
            onClick={e => {
              e.preventDefault();
              this.setState({
                selectedTab: i
              });
            }}
          >
            {dateString}
          </a>
        </li>
      );
      scheduleDays.push(
        <SchedulerDay
          day={i}
          slots={daySlots}
          start={Math.floor(daySlots[0].StartMinutes / 60) * 60 - 60}
          finish={
            120 +
            Math.floor(daySlots[daySlots.length - 1].StartMinutes / 60) * 60
          }
          locationList={this.state.locationList}
          leftMargin={50}
          sessionList={this.state.sessionList}
          locations={this.props.locations}
          sessionPlace={this.sessionPlace}
          selectedTab={this.state.selectedTab}
        />
      );
    }
    return (
      <div className="row Scheduler">
        <div
          className="col-xs-12 col-md-2 unscheduled canDrop"
          ref="unscheduledColumn"
        >
          {unscheduledSessions}
        </div>
        <div className="col-xs-12 col-md-10" ref="schedulerColumn">
          <ul className="nav nav-tabs" role="tablist" id="scheduleTabs">
            {scheduleTabs}
          </ul>
          <div className="tab-content">{scheduleDays}</div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    $(document).ready(() => {
      var that = this;
      interact(".session")
        .draggable({
          inertia: false,
          restrict: {
            endOnly: true
          },
          autoScroll: true,
          onend(event) {}
        })
        .on("dragmove", event => {
          moveObject(event.target, event.dx, event.dy);
        });
      interact(".canDrop").dropzone({
        accept: ".session",
        overlap: 0.5,
        ondropactivate(event) {
          that.hasReset = false;
          $(event.relatedTarget).width(100);
        },
        ondragenter(event) {
          var dropzoneElement = event.target;
          dropzoneElement.classList.add("drop-target");
        },
        ondragleave(event) {
          event.target.classList.remove("drop-target");
        },
        ondrop(event) {
          that.hasReset = true;
          if (event.target === that.refs.unscheduledColumn) {
            that.tryRemoveSession(event.relatedTarget);
          } else {
            that.tryMoveSession(event.relatedTarget, event.target);
          }
        },
        ondropdeactivate(event) {
          if (!that.hasReset) {
            that.sessionPlace(event.relatedTarget);
            that.hasReset = true;
          }
          event.target.classList.remove("drop-target");
        }
      });
      $(this.refs.unscheduledColumn).height(
        this.refs.schedulerColumn.getBoundingClientRect().height
      );
    });
  }

  sessionPlace(session) {
    var jqSession = $(session);
    var sessionBox = session.getBoundingClientRect();
    var key =
      "slot" +
      session.getAttribute("data-day") +
      "x" +
      session.getAttribute("data-slotid");
    if (session.getAttribute("data-plenary") != "true") {
      key += "x" + session.getAttribute("data-locationid");
    }
    var slot = document.getElementById(key);
    if (slot != null) {
      var slotBox = slot.getBoundingClientRect();
      jqSession.width(slotBox.width - 12);
      jqSession.height(slotBox.height - 12);
      moveObject(
        session,
        slotBox.left - sessionBox.left + 4,
        slotBox.top - sessionBox.top + 4
      );
      session.setAttribute("data-orig-x", slotBox.left - sessionBox.left + 4);
      session.setAttribute("data-orig-y", slotBox.top - sessionBox.top + 4);
      session.setAttribute("data-slotkey", slot.getAttribute("data-reactid"));
      slot.classList.remove("canDrop");
    } else {
      session.setAttribute("data-orig-x", "");
      session.setAttribute("data-orig-y", "");
      session.setAttribute("data-slotkey", "");
      session.style.webkitTransform = session.style.transform = "";
      session.setAttribute("data-x", "");
      session.setAttribute("data-y", "");
    }
  }

  tryRemoveSession(session) {
    var sessionId = session.getAttribute("data-sessionid");
    this.props.module.service.tryRemoveSession(
      this.props.conference.ConferenceId,
      sessionId,
      data => {
        this.hasReset = true;
        this.setState({
          sessionList: data
        });
      },
      data => {
        alert(data);
        $(session).css("width", "auto");
        this.sessionPlace(session);
      }
    );
    if (session.getAttribute("data-slotkey") != "") {
      $('[data-reactid="' + session.getAttribute("data-slotkey") + '"]').attr(
        "class",
        "sessionSlot canDrop"
      );
    }
  }

  tryMoveSession(session, slot) {
    var jqSession = $(session);
    var jqSlot = $(slot);
    var sessionId = jqSession.data("sessionid");
    var slotId = jqSlot.data("slotid");
    var locationId = jqSlot.data("locationid");
    var day = jqSlot.data("day");
    this.props.module.service.tryMoveSession(
      this.props.conference.ConferenceId,
      sessionId,
      day,
      slotId,
      locationId,
      false,
      data => {
        this.hasReset = true;
        this.setState({
          sessionList: data
        });
      },
      data => {
        alert(data);
        $(session).css("width", "auto");
        this.sessionPlace(session);
      }
    );
    if (jqSession.data("slotkey") != "") {
      $('[data-reactid="' + jqSession.data("slotkey") + '"]').attr(
        "class",
        "sessionSlot canDrop"
      );
    }
  }
}
