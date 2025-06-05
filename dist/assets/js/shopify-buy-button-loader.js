// shopify-buy-button-loader.js
(function () {
  const scriptURL = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';
  const shopDomain = '8x8rwz-gb.myshopify.com';
  const accessToken = '12346cc3e0994df08d5ea75dbc794fda';

  function loadShopifySDK(callback) {
    if (window.ShopifyBuy && window.ShopifyBuy.UI) {
      callback();
    } else {
      const script = document.createElement('script');
      script.async = true;
      script.src = scriptURL;
      script.onload = callback;
      document.head.appendChild(script);
    }
  }

  function createBuyButton(client, productId, container) {
    ShopifyBuy.UI.onReady(client).then(function (ui) {
      ui.createComponent('product', {
        id: productId,
        node: container,
        moneyFormat: '%24%7B%7Bamount%7D%7D',
        options: {
          product: {
            styles: {
              product: {
                "@media (min-width: 601px)": {
                  "max-width": "500px",
                  "margin-left": "0",
                  "margin-bottom": "50px"
                },
                "text-align": "left",
                "position": "relative",
                "margin": "0 auto"
              },
              title: { "font-size": "22px", "margin-bottom": "5px" },
              button: {
                "font-size": "13px",
                "padding-top": "14.5px",
                "padding-bottom": "14.5px",
                ":hover": { "background-color": "#000000" },
                "background-color": "#000000",
                ":focus": { "background-color": "#000000" },
                "border-radius": "10px",
                "padding-left": "60px",
                "padding-right": "60px"
              },
              quantityInput: { "font-size": "13px" },
              price: { "font-size": "18px" },
              compareAt: { "font-size": "15.3px" },
              unitPrice: { "font-size": "15.3px" }
            },
            layout: "vertical",
            contents: {
              imgWithCarousel: true,
              description: true,
              button: true
            },
            width: "100%",
            text: {
              button: "Add to cart",
              outOfStock: "Sold Out"
            },
            googleFonts: ["Helvetica Neue", "Arial"]
          },
          cart: {
            styles: {
              button: {
                "font-size": "13px",
                "padding-top": "14.5px",
                "padding-bottom": "14.5px",
                ":hover": { "background-color": "#000000" },
                "background-color": "#000000",
                ":focus": { "background-color": "#000000" },
                "border-radius": "10px"
              }
            },
            text: {
              total: "Subtotal",
              button: "Checkout"
            },
            popup: false
          },
          toggle: {
            styles: {
              toggle: {
                "background-color": "#000000",
                ":hover": { "background-color": "#000000" },
                ":focus": { "background-color": "#000000" }
              },
              count: { "font-size": "13px" }
            }
          }
        }
      });

      // OPTIONAL: You may later add badge support here again.
    });
  }

  function initBuyButtons() {
    const placeholders = document.querySelectorAll('.buy-button[data-id]');
    if (!placeholders.length) return;

    const client = ShopifyBuy.buildClient({
      domain: shopDomain,
      storefrontAccessToken: accessToken
    });

    placeholders.forEach(placeholder => {
      const productId = placeholder.getAttribute('data-id');
      if (productId) {
        createBuyButton(client, productId, placeholder);
      }
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    loadShopifySDK(initBuyButtons);
  });
})();
