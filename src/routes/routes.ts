import { Express } from "express";
import axios from "axios";

export default function (app: Express) {
  let defaultConfig = {
    method: "get",
    maxBodyLength: Infinity,
    headers: {},
  };
  app.post(`/url-history`, async (req, res) => {
    let config = {
      ...defaultConfig,
      url: "https://www.ipqualityscore.com/api/json/requests/XWLVJZNqiRWZsHAmnq1GLOQl8DayorxU/list?type=url&start_date=2024-01-01&stop_date=2024-09-09",
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
    });
  });
  app.post(`/email-history`, async (req, res) => {
    let config = {
      ...defaultConfig,
      url: "https://www.ipqualityscore.com/api/json/requests/XWLVJZNqiRWZsHAmnq1GLOQl8DayorxU/list?type=email&start_date=2024-01-01&stop_date=2024-09-09",
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
