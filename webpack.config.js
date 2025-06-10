// webpack.config.js
const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

// Read your shared menu files (ensure these exist in src/)
const firstMenu = fs.readFileSync(path.resolve(__dirname, 'src/menu.html'), 'utf8');
const secondMenu = fs.readFileSync(path.resolve(__dirname, 'src/nav.html'), 'utf8');
const promoBanner = fs.readFileSync(path.resolve(__dirname, 'src/promoBanner.html'), 'utf8');


// List of filenames (pages) that should include BOTH menus (double nav)
const pagesWithSecondMenu = [
  'all-designs.html',
  'energy-fuel.html',
  'skincare-rituals.html',
  'grounding.html',
  'emf-defence.html',
  'frequency-tools.html',
  'tuning-fork.html',
  'black-tourmaline.html',
  'raw-pendant.html',
  'mwo.html',
  'woodsleep.html',
  'adjustable-resonator.html',
  'blue-light-glasses.html',
  'shilajit.html',
  'collection-page-example.html',
  'manufactured-minds.html',
  'mens-classics.html',
  'mens-tanktops.html',
  'new-arrivals.html',
  'normie-land.html',
  'premium-backprints.html',
  'premium-frontprints.html',
  'tallow-honey.html',
  'grounding-shoes.html',
  'zipup-hoodies.html',
  'size-guide.html',
  'grounding-bed.html',
  'grounding-mat.html',
  'shop-page-example.html',
  'they-lie-news2.html',
  'they-lie-news-network.html',
  'they-lie-vision.html',
  'they-live-collection.html',
  'thought-police-files.html',
  'turn-off-vision.html',
  'womens-tanktops.html',
  'womens-tshirts.html',
  'you-are-here.html'
];

// List of filenames (pages) that should include ONLY the main menu (single nav)
const pagesWithSingleMenu = [
  'voice.html',
  'contact.html',
  'enlighten.html',
  'entertainment.html',
  'faq.html',
  'home.html',
  'payment-policy.html',
  'privacy-policy.html',
  'projects.html',
  'returnrefund-policy.html',
  'shipping-policy.html',
  'terms-service.html'
];

// Create page objects for pages with double nav
const pagesDouble = pagesWithSecondMenu.map(file => {
  const title = file
    .replace('.html', '')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, char => char.toUpperCase());
  return {
    filename: file,
    title: title,
    content: `<h1>${title}</h1><p>Content for ${title} page.</p>`,
    hasSecondMenu: true
  };
});

// Create page objects for pages with single nav
const pagesSingle = pagesWithSingleMenu.map(file => {
  const title = file
    .replace('.html', '')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, char => char.toUpperCase());
  return {
    filename: file,
    title: title,
    content: `<h1>${title}</h1><p>Content for ${title} page.</p>`,
    hasSecondMenu: false
  };
});

// Optionally add index.html if not included in the above lists
const indexPage = {
  filename: 'index.html',
  title: 'Home Page',
  content: '<h1>Welcome to the Home Page!</h1><p>Home page content here.</p>',
  hasSecondMenu: true, // Set to false if index should not have the second menu
};

// Optionally add about-us.html (if not already in any list)
const aboutPage = {
  filename: 'about-us.html',
  title: 'About Us',
  content: '<h1>About Us</h1><p>About page content here.</p>',
  hasSecondMenu: false
};

// Combine all pages
const pages = [indexPage, ...pagesDouble, ...pagesSingle, aboutPage];

module.exports = {
  entry: './src/index.js', // Your JavaScript entry point
  output: {
    filename: 'bundle.js', // Output JS bundle
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'development', // Use 'production' for production builds
  plugins: [
    ...pages.map(page => {
      // Derive the template path from the page filename:
      // e.g., "all-designs.html" -> "./src/all-designs.template.html"
      const templatePath = `./src/${page.filename.replace('.html', '.template.html')}`;
      const templateParameters = {
        title: page.title,
        mainMenu: firstMenu, // In your templates, use <%= mainMenu %>
        content: page.content,
        promoBanner: promoBanner,

      };
      // If this page should include the second menu, add it
      if (page.hasSecondMenu) {
        templateParameters.secondMenu = secondMenu;
      }
      return new HtmlWebpackPlugin({
        filename: page.filename,
        template: templatePath,
        templateParameters,
      });
    }),
    // Copy static assets (CSS, images, components, etc.) from the project root to the dist folder
    new CopyWebpackPlugin({
      patterns: [
        { from: 'assets', to: 'assets' },
        { from: 'images', to: 'images' },
        { from: 'components', to: 'components' },
      ],
    }),
  ],
};
