const functions = require('firebase-functions');
const admin = require('firebase-admin');
const fetch = require('node-fetch');
const cors = require('cors');
const crypto = require('crypto');

admin.initializeApp();

const corsHandler = cors({ origin: true });

exports.getHotProducts = functions.https.onRequest((req, res) => {
  corsHandler(req, res, async () => {
    const apiUrl = 'https://aliexpress.affiliate.hotproduct.query';

    const {
      app_signature,
      category_ids = '',
      keywords = '',
      max_sale_price = 0,
      min_sale_price = 0,
      page_no = 1,
      page_size = 10,
      platform_product_type = '',
      sort = 'SALE_PRICE_DESC',
      target_currency = 'USD',
      target_language = 'EN',
      tracking_id = '',
      delivery_days = '',
      ship_to_country = '',
    } = req.query;

    // Accéder aux variables d'environnement
    const appKey = process.env.NEXT_PUBLIC_ALILEXPRESS_APP_KEY;
    const appSecret = process.env.NEXT_PUBLIC_ALILEXPRESS_APP_SECRET;
    console.log('appKey:', appKey);
    console.log('appSecret:', appSecret);

    if (!appKey || !appSecret) {
      return res.status(500).send({ message: 'Les variables d\'environnement APP_KEY ou APP_SECRET sont manquantes.' });
    }

    try {
      let paramsString = `app_key=${appKey}&category_ids=${category_ids}&keywords=${keywords}&max_sale_price=${max_sale_price}&min_sale_price=${min_sale_price}&page_no=${page_no}&page_size=${page_size}&platform_product_type=${platform_product_type}&sort=${sort}&target_currency=${target_currency}&target_language=${target_language}&tracking_id=${tracking_id}&delivery_days=${delivery_days}&ship_to_country=${ship_to_country}`;

      const signature = crypto
        .createHmac('sha256', appSecret)
        .update(paramsString)
        .digest('hex');

      const url = new URL(apiUrl);
      url.searchParams.append('app_signature', signature);
      url.searchParams.append('category_ids', category_ids);
      url.searchParams.append('keywords', keywords);
      url.searchParams.append('max_sale_price', max_sale_price);
      url.searchParams.append('min_sale_price', min_sale_price);
      url.searchParams.append('page_no', page_no);
      url.searchParams.append('page_size', page_size);
      url.searchParams.append('platform_product_type', platform_product_type);
      url.searchParams.append('sort', sort);
      url.searchParams.append('target_currency', target_currency);
      url.searchParams.append('target_language', target_language);
      url.searchParams.append('tracking_id', tracking_id);
      url.searchParams.append('delivery_days', delivery_days);
      url.searchParams.append('ship_to_country', ship_to_country);

      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Erreur dans la réponse de l\'API');
      }

      const products = await response.json();

      res.status(200).send({ products });
    } catch (error) {
      console.error('Erreur lors de la récupération des produits:', error);
      res.status(500).send({ message: 'Erreur lors de la récupération des produits', error: error.message });
    }
  });
});


// Fonction de rappel API
exports.apiCallback = functions.https.onRequest((req, res) => {
  if (req.method === 'POST') {
    const callbackData = req.body;
    console.log('Callback reçu :', callbackData);

    const db = admin.firestore();
    db.collection('callbacks').add({
      data: callbackData,
      receivedAt: admin.firestore.FieldValue.serverTimestamp(),
    })
    .then(() => {
      res.status(200).send({ message: 'Callback traité avec succès' });
    })
    .catch((error) => {
      res.status(500).send({ message: 'Erreur lors du traitement du callback', error });
    });
  } else {
    res.status(405).send({ message: 'Méthode non autorisée' });
  }
});