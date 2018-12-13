import { ISessionResource, ISlot, INBrightOrderItem } from "Models";

export default class DataService {
    private moduleId: number = -1;
    private dnn: DnnServiceFramework = <DnnServiceFramework>$;
    public baseServicepath: string = this.dnn.dnnSF(this.moduleId).getServiceRoot('Connect/Conference');
    public tabId: string = this.dnn.dnnSF(this.moduleId).getTabId();
    constructor(mid: number) {
        this.moduleId = mid;
    };
    private ajaxCall(type: string, controller: string, action: string, conferenceId: number | null, id: any, data: any, success: Function, fail?: Function, isUploadForm?: boolean)
        : void {
        var path = this.baseServicepath;
        if (conferenceId != null) {
            path += 'Conference/' + conferenceId + '/'
        }
        path = path + controller + '/' + action;
        if (id != null) {
            path += '/' + id
        }
        var opts: JQuery.AjaxSettings = {
            type: type,
            url: path,
            beforeSend: this.dnn.dnnSF(this.moduleId).setModuleHeaders,
            data: data
        };
        if (isUploadForm) {
            opts.contentType = false;
            opts.processData = false;
        }
        $.ajax(opts)
            .done(function (retdata: any) {
                if (success != undefined) {
                    success(retdata);
                }
            })
            .fail(function (xhr: any, status: any) {
                if (fail != undefined) {
                    fail(xhr.responseText);
                }
            });
    };

    public addAttendee(conferenceId: number, email: string, firstName: string, lastName: string, displayName: string, company: string, success: Function, fail?: Function): void {
        this.ajaxCall('POST', 'Attendees', 'Add', conferenceId, null, {
            Email: email,
            FirstName: firstName,
            LastName: lastName,
            DisplayName: displayName,
            Company: company
        }, success, fail);
    }
    public addComment(conferenceId: number, sessionId: number, visibility: number, comment: string, success: Function, fail?: Function) {
        this.ajaxCall('POST', 'Comments', 'Add', conferenceId, null, {
            SessionId: sessionId,
            Visibility: visibility,
            Remarks: comment
        }, success, fail);
    }
    public addOrderAudit(itemId, message: string, success: Function, fail?: Function) {
        this.ajaxCall('POST', 'NBright', 'AddAudit', null, itemId, { Message: message }, success, fail);
    }
    public addSessionSpeaker(conferenceId: number, sessionId, userId: number, success: Function, fail?: Function) {
        this.ajaxCall('POST', 'SessionSpeakers', 'Add', conferenceId, sessionId, {
            UserId: userId
        }, success, fail);
    }
    public addSpeaker(conferenceId: number, email: string, firstName: string, lastName: string, displayName: string, company: string, success: Function, fail?: Function) {
        this.ajaxCall('POST', 'Speakers', 'Add', conferenceId, null, {
            Email: email,
            FirstName: firstName,
            LastName: lastName,
            DisplayName: displayName,
            Company: company
        }, success, fail);
    }
    public addTag(conferenceId: number, tagName: string, success: Function, fail?: Function) {
        this.ajaxCall('POST', 'Tags', 'Add', conferenceId, null, {
            tagName: tagName
        }, success, fail);
    }
    public addUrl(conferenceId: number, sessionId: number, url: string, success: Function, fail?: Function) {
        this.ajaxCall('POST', 'SessionResources', 'Add', conferenceId, sessionId, { url: url }, success, fail);
    }
    public attendSession(conferenceId: number, sessionId: number, codes: string, success: Function, fail?: Function) {
        this.ajaxCall('POST', 'SessionAttendees', 'AttendByCode', conferenceId, null, { SessionId: sessionId, Codes: codes }, success, fail);
    }
    public approveResource(conferenceId: number, sessionId: number, sessionResource: ISessionResource, success: Function, fail?: Function) {
        this.ajaxCall('POST', 'SessionResources', 'Approve', conferenceId, sessionId, { SessionResource: sessionResource }, success, fail);
    }
    public changeAttendeeStatus(conferenceId: number, userId: number, newStatus: number, success: Function, fail?: Function) {
        this.ajaxCall('POST', 'Attendees', 'ChangeStatus', conferenceId, null, {
            UserId: userId,
            Status: newStatus
        }, success, fail);
    }
    public changeSessionStatus(conferenceId: number, sessionId: number, newStatus: number, success: Function, fail?: Function) {
        this.ajaxCall('POST', 'Sessions', 'ChangeStatus', conferenceId, sessionId, { newStatus: newStatus }, success, fail);
    }
    public changeSessionTrack(conferenceId: number, sessionId: number, newTrack: number, success: Function, fail?: Function) {
        this.ajaxCall('POST', 'Sessions', 'ChangeTrack', conferenceId, sessionId, { newTrack: newTrack }, success, fail);
    }
    public checkNewComments(conferenceId: number, sessionId: number, visibility: number, lastCheck: Date, success: Function, fail?: Function) {
        this.ajaxCall('GET', 'Comments', 'Poll', conferenceId, null, { SessionId: sessionId, Visibility: visibility, LastCheck: lastCheck.toUTCDateTimeDigits() }, success, fail);
    }
    public deleteComment(conferenceId: number, commentId: number, success: Function, fail?: Function) {
        this.ajaxCall('POST', 'Comments', 'Delete', conferenceId, commentId, null, success, fail);
    }
    public deleteLocation(conferenceId: number, locationId: number, success: Function, fail?: Function) {
        this.ajaxCall('POST', 'Locations', 'Delete', conferenceId, locationId, null, success, fail);
    }
    public deleteResource(conferenceId: number, sessionId: number, sessionResource: ISessionResource, success: Function, fail?: Function) {
        this.ajaxCall('POST', 'SessionResources', 'Delete', conferenceId, sessionId, { SessionResource: sessionResource }, success, fail);
    }
    public deleteSession(conferenceId: number, sessionId: number, success: Function, fail?: Function) {
        this.ajaxCall('POST', 'Sessions', 'Delete', conferenceId, sessionId, null, success, fail);
    }
    public deleteSessionSpeaker(conferenceId: number, sessionId: number, userId: number, success: Function, fail?: Function) {
        this.ajaxCall('POST', 'SessionSpeakers', 'Delete', conferenceId, sessionId, {
            UserId: userId
        }, success, fail);
    }
    public deleteSlot(conferenceId: number, slotId: number, success: Function, fail?: Function) {
        this.ajaxCall('POST', 'Slots', 'Delete', conferenceId, slotId, null, success, fail);
    }
    public deleteTag(conferenceId: number, tagId: number, success: Function, fail?: Function) {
        this.ajaxCall('POST', 'Tags', 'Delete', conferenceId, tagId, null, success, fail);
    }
    public deleteTrack(conferenceId: number, trackId: number, success: Function, fail?: Function) {
        this.ajaxCall('POST', 'Tracks', 'Delete', conferenceId, trackId, null, success, fail);
    }
    public editAttendee(conferenceId: number, attendee, success: Function, fail?: Function) {
        this.ajaxCall('POST', 'Attendees', 'Edit', conferenceId, attendee.UserId, {
            Company: attendee.Company,
            AttCode: attendee.AttCode,
            ReceiveNotifications: attendee.ReceiveNotifications
        }, success, fail);
    }
    public editResource(conferenceId: number, sessionId: number, sessionResource: ISessionResource, success: Function, fail?: Function) {
        this.ajaxCall('POST', 'SessionResources', 'Edit', conferenceId, sessionId, { SessionResource: sessionResource }, success, fail);
    }
    public editTag(conferenceId: number, tagId: number, tagName: string, success: Function, fail?: Function) {
        this.ajaxCall('POST', 'Tags', 'Edit', conferenceId, tagId, {
            tagName: tagName
        }, success, fail);
    }
    public getConferenceSlots(conferenceId: number, success: Function, fail?: Function) {
        this.ajaxCall('POST', 'Slots', 'List', conferenceId, null, null, success, fail);
    }
    public getLocations(conferenceId: number, success: Function, fail?: Function) {
        this.ajaxCall('GET', 'Locations', 'List', conferenceId, null, null, success, fail);
    }
    public getNextSessions(conferenceId: number, success: Function, fail?: Function) {
        this.ajaxCall('GET', 'Sessions', 'Next', conferenceId, null, null, success, fail);
    }
    public getSessionAttendees(conferenceId: number, sessionId: number, success: Function, fail?: Function) {
        this.ajaxCall('GET', 'SessionAttendees', 'SessionAttendees', conferenceId, sessionId, null, success, fail);
    }
    public getOrderDetails(conferenceId: number, itemId: number, success: Function, fail?: Function) {
        this.ajaxCall('GET', 'NBright', 'Details', conferenceId, itemId, null, success, fail);
    }
    public getOrderAudit(conferenceId: number, itemId: number, success: Function, fail?: Function) {
        this.ajaxCall('GET', 'NBright', 'Audit', null, itemId, null, success, fail);
    }
    public loadComments(conferenceId: number, sessionId: number, visibility: number, pageIndex: number, pageSize: number, success: Function, fail?: Function) {
        this.ajaxCall('GET', 'Comments', 'List', conferenceId, null, {
            SessionId: sessionId,
            Visibility: visibility,
            PageIndex: pageIndex,
            PageSize: pageSize
        }, success, fail);
    }
    public orderLocations(conferenceId: number, newOrder: any, success: Function, fail?: Function) {
        this.ajaxCall('POST', 'Locations', 'Reorder', conferenceId, null, JSON.stringify(newOrder), success, fail);
    }
    public orderSessions(conferenceId: number, newOrder: any, success: Function, fail?: Function) {
        this.ajaxCall('POST', 'Sessions', 'Reorder', conferenceId, null, JSON.stringify(newOrder), success, fail);
    }
    public orderSessionSpeakers(conferenceId: number, sessionId: number, newOrder: any, success: Function, fail?: Function) {
        this.ajaxCall('POST', 'SessionSpeakers', 'Reorder', conferenceId, sessionId, JSON.stringify(newOrder), success, fail);
    }
    public orderSpeakers(conferenceId: number, newOrder: any, success: Function, fail?: Function) {
        this.ajaxCall('POST', 'Speakers', 'Reorder', conferenceId, null, JSON.stringify(newOrder), success, fail);
    }
    public orderTracks(conferenceId: number, newOrder: any, success: Function, fail?: Function) {
        this.ajaxCall('POST', 'Tracks', 'Reorder', conferenceId, null, JSON.stringify(newOrder), success, fail);
    }
    public searchUsers(conferenceId: number, search: string, success: Function, fail?: Function) {
        this.ajaxCall('GET', 'Speakers', 'SearchUsers', conferenceId, null, {
            search: search
        }, success, fail);
    }
    public searchUsersByEmail(conferenceId: number, searchTerm: string, success: Function, fail?: Function) {
        this.ajaxCall('GET', 'Module', 'SearchUsers', conferenceId, null, {
            field: 'email',
            search: searchTerm
        }, success, fail);
    }
    public searchTags(conferenceId: number, searchTerm: string, success: Function, fail?: Function) {
        this.ajaxCall('GET', 'Tags', 'Search', conferenceId, null, {
            search: searchTerm
        }, success, fail);
    }
    public searchTracks(conferenceId: number, searchTerm: string, success: Function, fail?: Function) {
        this.ajaxCall('GET', 'Tracks', 'Search', conferenceId, null, {
            search: searchTerm
        }, success, fail);
    }
    public sessionVote(conferenceId: number, sessionId: number, vote: number, success: Function, fail?: Function) {
        this.ajaxCall('POST', 'Sessions', 'Vote', conferenceId, sessionId, {
            vote: vote
        }, success, fail);
    }
    public tagVote(conferenceId: number, tagId: number, vote: number, success: Function, fail?: Function) {
        this.ajaxCall('POST', 'Tags', 'Vote', conferenceId, tagId, {
            vote: vote
        }, success, fail);
    }
    public toggleParticipant(conferenceId: number, itemId: number, participant: INBrightOrderItem, success: Function, fail?: Function) {
        this.ajaxCall('POST', 'NBright', 'Participant', conferenceId, itemId, participant, success, fail);
    }
    public tryMoveSession(conferenceId: number, sessionId: number, day, slotId: number, locationId: number, displaceOthers, success: Function, fail?: Function) {
        this.ajaxCall('POST', 'Sessions', 'Move', conferenceId, sessionId, {
            Day: day,
            SlotId: slotId,
            LocationId: locationId,
            DisplaceOthers: displaceOthers
        }, success, fail);
    }
    public tryRemoveSession(conferenceId: number, sessionId: number, success: Function, fail?: Function) {
        this.ajaxCall('POST', 'Sessions', 'Remove', conferenceId, sessionId, null, success, fail);
    }
    public updateOrderStatus(itemId: number, newStatus: number, success: Function, fail?: Function) {
        this.ajaxCall('POST', 'NBright', 'OrderStatus', null, null, { ItemId: itemId, Status: newStatus }, success, fail);
    }
    public updateSlot(conferenceId: number, slot: ISlot, success: Function, fail?: Function) {
        this.ajaxCall('POST', 'Slots', 'Update', conferenceId, slot.SlotId, slot, success, fail);
    }
}