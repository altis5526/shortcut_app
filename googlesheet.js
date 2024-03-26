const { google } = require("googleapis");
const express = require("express");
 
const app = express();
 
const SHEET_ID = "1neMHoA6yfzjek1T6gd7L5-bFn6BbPjATiUAKjIDckj8";
const RANGE = "A1:B2";
const SERVICE_ACCOUNT = "shortcut@oval-compass-247807.iam.gserviceaccount.com";
// 如果是部署到 Vercel 並透過 env 設置，金鑰字串需要使用 `replace(/\\n/g, "\n")` 處理，否則會無法正常運作。
// 相關 issue：https://github.com/vercel/next.js/discussions/38430
const PRIVATE_KEY = "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCOx8q7FftN4K5X\nH+m2rpZqRhzr9g4r/9fMX5db5392pnJpv5GS1BDidlIEePjTYdQVjqBTiSE2U3mu\nCnQnlEU6vWEKGgZ62HP3GOwUhyovgfpyPZVuOO/cx1MisBqwMwJ/MkfxoDr3ax4h\niyibRknncdEvJD2d42/9Bg/DU+ktOUGBIpIc1sdwIheyErw9rN8Xcu7NTENaws+3\ng/abWE2/SyULAjn/LBj2lsoRbVGRUUG7ntITwpQPS8sx8GHNJiD/FipWVYhEe73a\nPhlVA8GRSqDJ4VTQsB7hOIucFHWW8tGrjXJLBpVpZsQHcs5R00LRSO7Ee+UwfX57\nBXHojXPNAgMBAAECggEABK+LlaSp5fnL5jBY+MckGkrX8McFrFCfRlpCY7Hgc68Q\ncKB0VCqPxO4dln7874KeWIQJzEzAG5lDzm6eB+MJksXKMkFx8Lj1hmiWvzEsNQUz\nH4EeV9DScl8YysWAH8+R1hbjwOg12hpeV3UzW+hyNdHC6QIaJe6SX7PkuSzQeuQB\noqJjeeaMk02k5une519MSY99FDwIAK6JN8D2I3s25PBoHIGtxwip77BYaaZlu/bK\nko2hwlowjlb/XDaj0Fzp7WTuoApFMDNOSRPXisCW3zik7EJYdK39RNg7dky1jjw7\nrC+WoeFRnuVjMpWgaNXtCcAkbdKrD26Ta95fjIq6AwKBgQDDxyMyqQCbDBl7pgNz\nSddS8/hnqzowR9SeUo7463WZAF3LvXd9/i+IkxvsUfuhYEmvVwCej4tc6l4Tzg6W\n4O/bnQ5u0LaNSuoocAieaqMh3DgI/jl8U13PAQVKNRzxLCITzbOKQouhbenwp/uZ\nhlCgxeNX6uRrlljR79mEtva+GwKBgQC6s0fPLHBluaiCOkTsRvujgaDrShU/yrsF\n9rYU78Q2SdVsf4rBMxJLn/BuXyALSmwtglWL+L0GAngkgIILA1MnlYgRfsXvPOwk\nqrvBYnA6iQfdBW7VTMPaiPFFyUNEot6q/+kZOjvlTNz7oQb0JAgnK+LOULW87VDr\nuf1oWRmUNwKBgQCBWwRwpqXVzCrSPiCtfi6disGojcRGvk9HxLje04TB8TIIOknH\nn7l8febHQGwIdnx5M/0exy2H2PsMDuwo2Lri2mT85z6XINaSnWO0eDUNXFpR5tfI\nw7SJ39zE6U8UMtrZRuLICawEn4EhF3zwNYT0lYvfPT5rr81D+Tw5qkJh3QKBgFqz\nCemtrxTcMu7BHAalHU57hQ+JN/V7qYvmJOLa8DlneRVyiJf/FZ5DnuwfrlON3ivl\nq2WKe1nWDUO+Ym6zOMx8KlRFgCcPM7FEeF4kUl09gOJw5z0cQ/GAoaXDdrh7Xy03\nkag90Cc/RgPAYL5uWr+c5FxSfVfA+pTqEB+HWZPVAoGAUfu//t0cBQTpIeIXSNs8\n6skQvc5zb4xywBKqCQ2gO/dLUn0BpL2wjtbEWa7uI7U4zR2qalVnvw9yOP3wZ14R\nB16cbFYdnOJQeLPqxlFdl5n/mX41099oqvFcll6aqlTJ5+e6+VVg1llVXeABpzO2\nJLV7QVkoxtH2SB4CUzXteU8=\n-----END PRIVATE KEY-----\n";
 
const jwtClient = new google.auth.JWT(SERVICE_ACCOUNT, null, PRIVATE_KEY, [
  "https://www.googleapis.com/auth/spreadsheets",
]);
 
jwtClient.authorize(function (err) {
  if (err) {
    console.log(err);
    return;
  }
});
 
app.get("/sheet-data", (req, res) => {
  const sheets = google.sheets({ version: "v4", auth: jwtClient });
  sheets.spreadsheets.values.get(
    {
      spreadsheetId: SHEET_ID,
      range: RANGE,
    },
    (err, response) => {
      if (err) {
        console.error("The API returned an error: " + err);
        res.status(500).send("Error");
        return;
      }
      res.send(response.data.values);
    }
  );
});
 
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});