var wrgsv = {
  idBox: "wrgsv",
  url_wiget: "http://127.0.0.1:1337/api/feeds/widget",
  url_style: "http://127.0.0.1:1337/css/widget.css",
  init: function (id) {
    if (!id) {
      id = this.idBox;
    }
    if (document.getElementById(id)) {
      this.addStyle();
      try {
        var XHR =
          "onload" in new XMLHttpRequest() ? XMLHttpRequest : XDomainRequest;
        var xhr = new XHR();
        xhr.open("GET", this.url_wiget, true);
        xhr.onload = function () {
          if (this.response) {
            document.getElementById(id).innerHTML = this.response;
          }
        };
        xhr.onerror = function () {
          console.log("onerror " + this.status);
        };
        xhr.send();
      } catch (e) {
        console.log(e);
      }
    } else {
      console.log('The specified block id="' + id + '" is missing');
    }
  },
  addStyle: function () {
    const style = document.createElement("link");
    style.rel = "stylesheet";
    style.type = "text/css";
    style.href = this.url_style;
    document.head.appendChild(style);
  },
};
