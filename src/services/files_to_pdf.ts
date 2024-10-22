import * as ppt from "puppeteer";
import * as fs from "fs";
import * as path from "path";

async function convertToPDF(imgPath: string, outputPath: string) {
  const browser = await ppt.launch({
    args: ["--allow-file-access-from-files", "--enable-local-file-accesses"],
  });
  const page = await browser.newPage();
  const file_ext = path.extname(imgPath);

  let bitmap = fs.readFileSync(imgPath);
  let base64Encode = Buffer.from(bitmap).toString("base64");

  console.log(`Converting file: ${imgPath}\n`);
  if (fs.existsSync(imgPath)) {
    console.log(`Converting ${file_ext} to pdf`);
  } else {
    throw new Error("File does not exist");
  }

  // Load the image into the page
  const image = "data:image/png;base64," + base64Encode;
  await page.goto(image, { waitUntil: "networkidle2" });

  // Generate the PDF
  await page.pdf({ path: outputPath, format: "A4" });

  await browser.close();
}

convertToPDF("my_pic.jpg", "my_pic.pdf");
