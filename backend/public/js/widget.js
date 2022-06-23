var wrgsv = {
  // идентификатор HTML элемента в который будет размещен виджет
  idBox: "wrgsv",
  // путь до страницы возвращающей виджет
  url_wiget: "//5.161.56.222/api/feeds/widget",
  // путь до страницы стилей виджета
  url_style: "//5.161.56.222/css/widget.css",
  // метод инициализации виджета
  init: function (id) {
    // если идентификатор отсутствует, то будем использовать
    // идентификатор HTML элемента для размещения виджета по умолчанию (т.е. "wrgsv")
    if (!id) {
      id = this.idBox;
    }
    if (document.getElementById(id)) {
      // подключаем стили виджета
      this.addStyle();
      try {
        // для кросс-доменного запроса создаем один из ниже указанных объектов
        var XHR =
          "onload" in new XMLHttpRequest() ? XMLHttpRequest : XDomainRequest;
        // создаем экземпляр объекта
        var xhr = new XHR();
        // запрос на другой домен (асинхронный)
        xhr.open("GET", this.url_wiget, true);
        // событие отслеживает, что запрос был успешно завершён
        xhr.onload = function () {
          // если существует ответ
          if (this.response) {
            // добавляем полученный ответ в HTML элемент
            document.getElementById(id).innerHTML = this.response;
          }
        };
        xhr.onerror = function () {
          console.log("onerror " + this.status);
        };
        // отсылаем запрос
        xhr.send();
      } catch (e) {}
    }
    // если на странице не существует HTML элемента с указаным идентификатором
    // выводим сообщение: блок с идентификатором id="id" отсутствует
    else {
      console.log('The specified block id="' + id + '" is missing');
    }
  },
  // метод подключения стилей виджета
  addStyle: function () {
    style = document.createElement("link");
    style.rel = "stylesheet";
    style.type = "text/css";
    style.href = this.url_style;
    document.head.appendChild(style);
  },
};
