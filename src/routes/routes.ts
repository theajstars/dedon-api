import { Express } from "express";
import axios from "axios";

export default function (app: Express) {
  let defaultConfig = {
    method: "get",
    maxBodyLength: Infinity,
    headers: {},
  };
  app.get(`/`, async (req, res) => {
    res.json({
      status: "live",
      message: "This is for the record. History is written by the victor",
    });
  });
  app.post(`/url-history`, async (req, res) => {
    const { page } = req.body;
    let config = {
      ...defaultConfig,
      url: `https://www.ipqualityscore.com/api/json/requests/XWLVJZNqiRWZsHAmnq1GLOQl8DayorxU/list?type=url&start_date=2024-01-01&stop_date=2024-09-09&page=${
        page ?? 1
      }`,
    };
    let results = [];
    const rUrl = await axios(config);
    if (rUrl && rUrl.data && rUrl.data.success) {
      results = [...results, ...rUrl.data.requests];
    }

    res.json({
      status: rUrl && rUrl.data ? true : false,
      statusCode: rUrl && rUrl.data ? 200 : 500,
      data: results,
      length: results.length,

      totalPages: rUrl.data.total_pages,
    });
  });
  app.post(`/email-history`, async (req, res) => {
    const { page } = req.body;
    let config = {
      ...defaultConfig,
      url: `https://www.ipqualityscore.com/api/json/requests/XWLVJZNqiRWZsHAmnq1GLOQl8DayorxU/list?type=email&start_date=2024-01-01&stop_date=2024-09-09&page=${
        page ?? 1
      }`,
    };
    let results = [];
    const rEmail = await axios(config);
    if (rEmail && rEmail.data && rEmail.data.success) {
      results = [...results, ...rEmail.data.requests];
    }

    res.json({
      status: rEmail && rEmail.data ? true : false,
      statusCode: rEmail && rEmail.data ? 200 : 500,
      data: results,
      length: results.length,
      totalPages: rEmail.data.total_pages,
    });
  });

  app.post(`/email-scan`, async (req, res) => {
    const { email } = req.body;
    let config = {
      ...defaultConfig,
      url: `https://www.ipqualityscore.com/api/json/email/XWLVJZNqiRWZsHAmnq1GLOQl8DayorxU/${email}`,
    };
    const r = await axios(config);
    res.json({
      status: r && r.data ? true : false,
      statusCode: r && r.data ? 200 : 500,
      data: r.data,
    });
  });

  app.post("/leaked", async (req, res) => {
    const { email } = req.body;

    let config1 = {
      ...defaultConfig,
      url: `https://www.ipqualityscore.com/api/json/email/XWLVJZNqiRWZsHAmnq1GLOQl8DayorxU/${email}`,
    };
    const r1 = await axios(config1);
    let config2 = {
      ...defaultConfig,
      url: `https://www.ipqualityscore.com/api/json/leaked/email/XWLVJZNqiRWZsHAmnq1GLOQl8DayorxU/${email}`,
    };
    const r2 = await axios(config2);

    res.json({
      status: true,
      statusCode: 200,
      data: {
        email: r1.data,
        leaked: r2.data,
      },
    });
  });
  app.post(`/database-scan`, async (req, res) => {
    const { email } = req.body;

    let config = {
      ...defaultConfig,
      url: `https://www.ipqualityscore.com/api/json/leaked/email/XWLVJZNqiRWZsHAmnq1GLOQl8DayorxU/${email}`,
    };
    const r = await axios(config);
    res.json({
      status: r && r.data ? true : false,
      statusCode: r && r.data ? 200 : 500,
      data: r.data,
    });
  });

  app.post(`/scan-url`, async (req, res) => {
    const { url } = req.body;
    let config = {
      ...defaultConfig,
      url: `https://www.ipqualityscore.com/api/json/url/XWLVJZNqiRWZsHAmnq1GLOQl8DayorxU/${url}`,
    };
    const r = await axios(config);
    res.json({
      status: r && r.data ? true : false,
      statusCode: r && r.data ? 200 : 500,
      data: r.data,
    });
  });
}
