const axios = require("axios");
const fs = require("fs");

const noCorsConfig = {
  method: "GET",
  mode: "no-cors",
  headers: {
    "Access-Control-Allow-Origin": "*",
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  withCredentials: true,
  credentials: "same-origin",
  crossdomain: true,
};

const getTokenLogoURL = async (id) =>
  axios(
    `https://r.wavesexplorer.com/assets/site/img/assets_logo/${id}.svg`,
    noCorsConfig
  )
    .then(
      () => `https://r.wavesexplorer.com/assets/site/img/assets_logo/${id}.svg`
    )
    .catch(() =>
      axios(
        `https://waves.exchange/static/icons/assets/${id}.svg`,
        noCorsConfig
      ).then(() => `https://waves.exchange/static/icons/assets/${id}.svg`)
    )
    .catch(() =>
      axios(
        `https://wavescap.com/wp-content/uploads/asset-logo/${id}.svg`,
        noCorsConfig
      ).then(
        () => `https://wavescap.com/wp-content/uploads/asset-logo/${id}.svg`
      )
    )
    .catch(() =>
      axios(
        `https://wavescap.com/wp-content/uploads/asset-logo/${id}.png`,
        noCorsConfig
      ).then(
        () => `https://wavescap.com/wp-content/uploads/asset-logo/${id}.png`
      )
    )
    .catch(() => null);

(async () => {
  const rec = await axios
    .get("https://wavescap.com/api/assets.json")
    .then(({ data }) =>
      Promise.all(
        data.map((v) =>
          getTokenLogoURL(v.id)
            .then((url) => ({ id: v.id, url: url }))
            .catch(() => null)
        )
      )
    );
  const result = rec.reduce((acc, v) => ({ ...acc, [v.id]: v.url }), {});
  fs.writeFileSync(
    "./src/constants/tokenLogos.json",
    JSON.stringify(result, null, 4)
  );
})();
