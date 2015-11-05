using System.Web.Mvc;
using DotNetNuke.Web.Mvc.Helpers;
using DotNetNuke.Web.Mvc.Framework;

namespace Connect.DNN.Modules.Conference.Common
{
    public abstract class ConferenceWebPage<TModel> : DnnWebViewPage<TModel>
    {

        public ContextHelper ModuleContext { get; set; }

        public override void InitHelpers()
        {
            Ajax = new AjaxHelper<TModel>(ViewContext, this);
            Html = new DnnHtmlHelper<TModel>(ViewContext, this);
            Url = new DnnUrlHelper(ViewContext);
            Dnn = new DnnHelper<TModel>(ViewContext, this);
            ModuleContext = new ContextHelper(ViewContext);
        }
    
    }
}