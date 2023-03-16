const puppeteer = require("puppeteer-extra");
const Stealth = require("puppeteer-extra-plugin-stealth");

module.exports = async (what, city, state, numJobs) => {
  puppeteer.use(Stealth());

  return await puppeteer.launch({ headless: false }).then(async (browser) => {
    const page = (await browser.pages())[0];

    // store in json file
    const types = {
      frontend: "frontend",
      backend: "backend",
      both: "frontend/backend",
      other: "other",
    };

    const tools = {
      JavaScript: {
        count: 0,
        type: types.both,
      },
      TypeScript: {
        count: 0,
        type: types.both,
      },
      React: {
        count: 0,
        type: types.frontend,
      },
      Vue: {
        count: 0,
        type: types.frontend,
      },
      Angular: {
        count: 0,
        type: types.frontend,
      },
      Node: {
        count: 0,
        type: types.backend,
      },
      "express.js": {
        count: 0,
        type: types.backend,
      },
      SQL: {
        count: 0,
        type: types.backend,
      },
      NOSQL: {
        count: 0,
        type: types.backend,
      },
      mongodb: {
        count: 0,
        type: types.backend,
      },
      Java: {
        count: 0,
        type: types.backend,
      },
      "C#": {
        count: 0,
        type: types.backend,
      },
      "C++": {
        count: 0,
        type: types.backend,
      },
      Python: {
        count: 0,
        type: types.backend,
      },
      PHP: {
        count: 0,
        type: types.backend,
      },
      Ruby: {
        count: 0,
        type: types.backend,
      },
      Golang: {
        count: 0,
        type: types.backend,
      },
      Git: {
        count: 0,
        type: types.other,
      },
    };

    const getJobIds = async (what, city, state, numJobs) => {
      let baseurl = `https://www.indeed.com/jobs?q=${what}&l=${city}%2C+${state}&radius=50&sc=0kf%3Aexplvl%28ENTRY_LEVEL%29%3B`;
      await page.goto(baseurl);

      const jobCount = await getJobCount();
      if (numJobs > jobCount) numJobs = jobCount;
      let jobIds = [];
      let pageNum = 0;
      let returnNumJobs = numJobs;

      while (numJobs > 0) {
        // get job ids of current page
        const ids = await page.$$eval(".cardOutline", (divs) => {
          const ids = [];
          for (const div of divs) {
            let id = div.getAttribute("class");
            let regex = /job_[^ ]*/;
            ids.push(id.match(regex)[0].replace(/job_/, ""));
          }
          return ids;
        });

        numJobs -= ids.length;
        jobIds = jobIds.concat(ids);

        // wait random time 1-6 sec
        await new Promise((r) =>
          setTimeout(r, (Math.floor(Math.random() * 6) + 1) * 1000)
        );

        if (numJobs > 0) {
          pageNum += 10;
          // get new page
          await page.goto(baseurl + "&start=" + pageNum);
        }
      }

      return [jobIds.slice(0, returnNumJobs), baseurl];
    };

    const getJobCount = async () => {
      const jobCountDiv = await page.waitForSelector(
        ".jobsearch-JobCountAndSortPane-jobCount"
      );
      let jobCount = await jobCountDiv.evaluate((el) => el.textContent);
      jobCount = jobCount.replace(/,/, "");
      jobCount = jobCount.replace(/ jobs/, "");
      return jobCount;
    };

    const getJobDesc = async (ids, url) => {
      const descriptions = [];
      for (const id of ids) {
        const joburl = url + "&vjk=" + id;
        await page.goto(joburl);
        const jobDescDiv = await page.waitForSelector("#jobDescriptionText");

        let jobDescText = await jobDescDiv.evaluate((el) => el.textContent);
        descriptions.push(jobDescText);

        // wait random time 1-6 sec
        await new Promise((r) =>
          setTimeout(r, (Math.floor(Math.random() * 6) + 1) * 1000)
        );
      }
      return descriptions;
    };

    const getTools = async (descs) => {
      for (const desc of descs) {
        for (const tool in tools) {
          if (tool != "C++") {
            const regex = new RegExp(tool, "i");
            regex.test(desc) ? tools[tool].count++ : undefined;
          }
        }
      }
      return tools;
    };

    //TODO
    const getJobTitles = () => {};

    return await getJobIds(what, city, state, numJobs).then(async (res) => {
      let [jobids, url] = res;
      return await getJobDesc(jobids, url).then(async (res) => {
        return await getTools(res).then(async (res) => {
          await browser.close();
          return res;
        });
      });
    });
  });
};
