const fs = require("fs");
const { parse } = require("csv-parse");
const puppeteer = require('puppeteer');

fs.createReadStream("./pages.csv")
  .pipe(parse({ delimiter: ",", from_line: 2 }))
  .on("data", function (row) {
	var url = "https://www.gov.uk" + row[1]
    console.log(url);

	(async () => {
	  const browser = await puppeteer.launch();
	  const page = await browser.newPage();
      await page.goto(url);
	  await page.screenshot({path: "shots/" + row[0] + '.png', fullPage: true});

	  await browser.close();
	})();
})
