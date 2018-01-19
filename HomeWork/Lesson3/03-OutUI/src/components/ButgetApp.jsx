var React = require('react');
//var Article = require('./Butget.jsx');

require('./ButgetApp.css');

var ButgetApp=React.createClass({
/*  getInitialState: function() {
      return {
          budgetTable: []
    };
  },

/*  componentDidMount: function() {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', 'Butget.json', false);
      xhr.send();
      if (xhr.status != 200) {
        // обработать ошибку
        alert( xhr.status + ': ' + xhr.statusText ); // пример вывода: 404: Not Found
      } else {
        // вывести результат
        // alert( xhr.responseText ); // responseText -- текст ответа.

        var localButget = JSON.parse(xhr.responseText);
        console.log(localButget);
        if (localButget) {
            this.setState({ butgetTable: localButget });
        }
      }
  },*/
  render: function() {
      return (
          <div className="butgetapp">
            <h1>test</h1>
          </div>
      );
  }
});

module.exports = ButgetApp;
