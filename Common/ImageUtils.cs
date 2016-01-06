using System;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using System.IO;

namespace Connect.DNN.Modules.Conference.Common
{
    public class ImageUtils
    {
        public static MemoryStream CreateImage(Stream stream, float[] crop, string extension)
        {
            var original = new Bitmap(stream);
            PixelFormat format = original.PixelFormat;
            if (format.ToString().Contains("Indexed"))
            {
                format = PixelFormat.Format24bppRgb;
            }

            int newHeight = (int)(crop[3] - crop[1]);
            int newWidth = (int)(crop[2] - crop[0]);
            var newImg = new Bitmap(newWidth, newHeight, format);
            newImg.SetResolution(original.HorizontalResolution, original.VerticalResolution);
            Graphics canvas = Graphics.FromImage(newImg);
            canvas.SmoothingMode = SmoothingMode.None;
            canvas.InterpolationMode = InterpolationMode.HighQualityBicubic;
            canvas.PixelOffsetMode = PixelOffsetMode.HighQuality;

            if (extension.ToLowerInvariant() != ".png")
            {
                canvas.Clear(Color.White);
                canvas.FillRectangle(Brushes.White, 0, 0, newWidth, newHeight);
            }

            canvas.DrawImage(original, -crop[0], -crop[1], original.Width, original.Height);

            //newImg.Save
            var content = new MemoryStream();
            ImageFormat imgFormat = ImageFormat.Bmp;
            if (extension.ToLowerInvariant() == ".png")
            {
                imgFormat = ImageFormat.Png;
            }
            else if (extension.ToLowerInvariant() == ".gif")
            {
                imgFormat = ImageFormat.Gif;
            }
            else if (extension.ToLowerInvariant() == ".jpg")
            {
                imgFormat = ImageFormat.Jpeg;
            }

            newImg.Save(content, imgFormat);

            newImg.Dispose();
            original.Dispose();
            canvas.Dispose();

            return content;
        }
    }
}