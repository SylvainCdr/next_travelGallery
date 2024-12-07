const functions = require("firebase-functions");
const admin = require("firebase-admin");
const fetch = require("node-fetch");
const crypto = require("crypto");

admin.initializeApp();

exports.getHotProducts = functions.https.onRequest((req, res) => {
  const appKey = process.env.NEXT_PUBLIC_ALIEXPRESS_APP_KEY;
  const appSecret = process.env.NEXT_PUBLIC_ALIEXPRESS_APP_SECRET;

  if (!appKey || !appSecret) {
    return res.status(500).send({
      message: "APP_KEY ou APP_SECRET manquants dans les variables d'environnement.",
    });
  }

  const {
    category_ids = "",
    keywords = "plant",
    max_sale_price = 0,
    min_sale_price = 0,
    page_no = 1,
    page_size = 10,
    platform_product_type = "ALL",
    sort = "SALE_PRICE_DESC",
    target_currency = "USD",
    target_language = "EN",
    tracking_id = "",
    delivery_days = "",
    ship_to_country = "",
  } = req.query;

  const params = {
    app_key: appKey,
    page_no,
    page_size,
    sort,
    timestamp: new Date().toISOString(),
    category_ids,
    keywords,
    max_sale_price,
    min_sale_price,
    platform_product_type,
    target_currency,
    target_language,
    tracking_id,
    delivery_days,
    ship_to_country,
    sign_method: "HMAC-SHA256",
    fields: "commission_rate,sale_price",  // Specifying fields you want in the response
  };

  const sortedParams = Object.keys(params)
    .sort()
    .map((key) => `${key}=${params[key]}`)
    .join("&");

  const signature = crypto
    .createHmac("sha256", appSecret)
    .update(sortedParams)
    .digest("hex");

  const query = new URLSearchParams({
    ...params,
    app_signature: signature,
  }).toString();

  const apiUrl = `https://api-sg.aliexpress.com/sync?method=aliexpress.affiliate.product.query&${query}`;

  fetch(apiUrl, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.resp_code !== "200") {
        throw new Error(`Erreur API : ${data.resp_msg}`);
      }
      res.status(200).send({ products: data.resp_result.result.products });
    })
    .catch((error) => {
      console.error("Erreur lors de la récupération des produits :", error);
      res.status(500).send({
        message: "Erreur lors de la récupération des produits",
        error: error.message,
      });
    });
});
