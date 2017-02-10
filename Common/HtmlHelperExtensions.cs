using DotNetNuke.Web.Mvc.Helpers;
using QRCoder;
using System;
using System.Collections.Generic;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Connect.DNN.Modules.Conference.Common
{
    public static class HtmlHelperExtensions
    {
        public static IHtmlString GenerateRelayQrCode(this DnnHtmlHelper html, string content, int height = 250, int width = 250)
        {
            QRCodeGenerator qrGenerator = new QRCodeGenerator();
            QRCodeData qrCodeData = qrGenerator.CreateQrCode(content, QRCodeGenerator.ECCLevel.Q);
            QRCode qrCode = new QRCode(qrCodeData);
            using (var bitmap = qrCode.GetGraphic(20))
            using (var stream = new MemoryStream())
            {
                bitmap.Save(stream, ImageFormat.Gif);
                var img = new TagBuilder("img");
                img.MergeAttribute("alt", "App Link");
                img.Attributes.Add("src", String.Format("data:image/gif;base64,{0}",
                    Convert.ToBase64String(stream.ToArray())));
                img.Attributes.Add("width", width.ToString());
                img.Attributes.Add("height", height.ToString());
                return MvcHtmlString.Create(img.ToString(TagRenderMode.SelfClosing));
            }
        }
    }
}