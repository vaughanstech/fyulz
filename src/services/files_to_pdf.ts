import * as ppt from "puppeteer";
import * as fs from "fs";
import * as path from "path";
import * as sharp from "sharp";

async function convertImageFiles(
  imgPath: string,
  outputPath: string,
  fileType: string
) {
  const browser = await ppt.launch({
    args: ["--allow-file-access-from-files", "--enable-local-file-accesses"],
  });
  const page = await browser.newPage();
  const file_ext = path.extname(imgPath);

  console.log(`Converting file: ${imgPath}\n`);
  if (fs.existsSync(imgPath)) {
    console.log(`File ${imgPath} exists, converting`);
  } else {
    throw new Error(`File: ${imgPath} does not exist`);
  }

  try {
    switch (fileType) {
      case "pdf": {
        console.log("Converting file to pdf");
        // Load the image into the page
        const bitmap = fs.readFileSync(imgPath);
        const base64Encode = Buffer.from(bitmap).toString("base64");
        const image = "data:image/png;base64," + base64Encode;
        await page.goto(image, { waitUntil: "networkidle2" });

        // Generate the PDF
        await page.pdf({ path: outputPath, format: "A4" });
        await browser.close();
        break;
      }
      case "png":
      case "svg":
      case "webp": {
        console.log(`Converting file to ${file_ext}`);
        // Take a screenshot and save it as PNG
        sharp(imgPath).toFile(outputPath);
        await browser.close();
        break;
      }
    }
  } catch {
    await browser.close();
    throw new Error(`File: ${imgPath} could not be converted`);
  }
}

convertImageFiles("my_pic.jpg", "my_pic.svg", "svg");
