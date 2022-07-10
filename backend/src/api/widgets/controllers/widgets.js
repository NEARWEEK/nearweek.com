module.exports = {
  async getNewsWidget() {
    try {
      const widget = `
                      <!doctype html>
                      <html>
                      <head>
                          <title>News widget</title>
                          <meta charset="utf-8">
                          <meta name="viewport" content="width=device-width">
                          <link
                            href="/js/widgets/news-widget/index.css" rel="stylesheet"/>
                      </head>
                      <body style="width:100%">
                          <div id="nearweek-news" class="nearweek-news-widget"></div>
                          <script src="/js/widgets/news-widget/index.js"></script>
                      </body>
                      </html>
          `;

      return widget;
    } catch (e) {
      return `<div>OOOps! Something went wrong...</div>`;
    }
  },
  async getChartWidget() {
    try {
      const widget = `
                      <!doctype html>
                      <html>
                      <head>
                          <title>News widget</title>
                          <meta charset="utf-8">
                          <meta name="viewport" content="width=device-width">
                          <link
                            href="/js/widgets/charts-widget/index.css" rel="stylesheet"/>
                      </head>
                      <body style="width:100%">
                          <div id="nearweek-news" class="nearweek-news-widget"></div>
                          <script src="/js/widgets/charts-widget/index.js"></script>
                      </body>
                      </html>
          `;

      return widget;
    } catch (e) {
      return `<div>OOOps! Something went wrong...</div>`;
    }
  },
};
