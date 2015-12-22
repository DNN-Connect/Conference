using System.Web.Mvc;
using DotNetNuke.Web.Mvc.Helpers;
using DotNetNuke.Web.Mvc.Framework;

namespace Connect.DNN.Modules.Conference.Common
{
    public abstract class ConferenceWebPage : DnnWebViewPage
    {

        public ContextHelper ConferenceModuleContext { get; set; }

        public override void InitHelpers()
        {
            Ajax = new AjaxHelper<object>(ViewContext, this);
            Html = new DnnHtmlHelper<object>(ViewContext, this);
            Url = new DnnUrlHelper(ViewContext);
            Dnn = new DnnHelper<object>(ViewContext, this);
            ConferenceModuleContext = new ContextHelper(ViewContext);
        }
    
    }
}