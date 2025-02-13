// webpack.config.js
const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Read your shared menu files (ensure these files exist in src/)
const firstMenu = fs.readFileSync(path.resolve(__dirname, 'src/menu.html'), 'utf8');
const secondMenu = fs.readFileSync(path.resolve(__dirname, 'src/nav.html'), 'utf8');

// List of filenames (pages) that should include BOTH menus
const pagesWithSecondMenu = [
  'all-designs.html',
  'all-hoodies.html',
  'backprint-tshirts.html',
  'bluebeam-iq-test.html',
  'collection-4biddenprod.html',
  'collection-shop.html',
  'cotton-100.html',
  'cropped-hoodies.html',
  'design-4biddenprod-nada.html',
  'dystopia-nexus.html',
  'false-flags-files.html',
  'forg3t.html',
  'his-story.html',
  'hive-mind-chronicles.html',
  'indoctrination.html',
  'long-sleeves.html',
  'manufactured-minds.html',
  'mens-classics.html',
  'mens-tanktops.html',
  'new-arrivals.html',
  'normie-land.html',
  'premium-backprints.html',
  'premium-frontprints.html',
  'propaganda-missile.html',
  'pullover-hoodies.html',
  'zipup-hoodies.html',
  'size-guide.html',
  'stolen-history.html',
  'support-current-thing.html',
  'sweatshirts.html',
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

// Generate an array of page objects for those pages that get BOTH menus.
// For each page, we create a default title and placeholder content.
// (You can modify the title and content as needed.)
const pages = pagesWithSecondMenu.map(file => {
  // Create a simple title by removing ".html", replacing hyphens with spaces,
  // and capitalizing each word.
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

// (Optional) Add pages that should only have the first menu.
// For example, an About page without the second menu:
pages.push({
  filename: 'about.html',
  title: 'About Us',
  content: '<h1>About Us</h1><p>About page content here.</p>',
  hasSecondMenu: false
});

module.exports = {
  entry: './src/index.js',  // Your JavaScript entry point
  output: {
    filename: 'bundle.js',  // Output JS bundle
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'development', // Use 'production' for production builds
  plugins: pages.map(page => {
    // Build the parameters for the template:
    const templateParameters = {
      title: page.title,
      firstMenu: firstMenu,
      content: page.content,
    };

    // If this page should include the second menu, add it:
    if (page.hasSecondMenu) {
      templateParameters.secondMenu = secondMenu;
    }

    return new HtmlWebpackPlugin({
      filename: page.filename,           // e.g., "all-designs.html"
      template: './src/template.html',     // Our template file
      templateParameters,                  // Pass in the parameters
    });
  }),
};
