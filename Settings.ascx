<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="Settings.ascx.cs" Inherits="Connect.DNN.Modules.Conference.Settings" %>
<%@ Register TagName="label" TagPrefix="dnn" Src="~/controls/labelcontrol.ascx" %>

<fieldset>
 <div class="dnnFormItem">
  <dnn:label id="lblView" runat="server" controlname="ddView" suffix=":" />
  <asp:DropDownList runat="server" ID="ddView" />
 </div>
 <div class="dnnFormItem">
  <dnn:label id="lblConference" runat="server" controlname="ddConference" suffix=":" />
  <asp:DropDownList runat="server" ID="ddConference" DataTextField="Name" DataValueField="ConferenceId" />
 </div>
</fieldset>

