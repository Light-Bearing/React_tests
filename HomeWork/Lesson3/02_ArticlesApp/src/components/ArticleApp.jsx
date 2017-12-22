var React = require('react');
var Article = require('./Article.jsx');

require('./ArticleApp.css');

var ArticleApp=React.createClass({
  getInitialState: function() {
      return {
          articles: []
      };
  },

  componentDidMount: function() {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', 'articles.json', false);
      xhr.send();
      if (xhr.status != 200) {
        // обработать ошибку
        alert( xhr.status + ': ' + xhr.statusText ); // пример вывода: 404: Not Found
      } else {
        // вывести результат
    //    alert( xhr.responseText ); // responseText -- текст ответа.

        var localArticles = JSON.parse(xhr.responseText);
        console.log(localArticles);
        if (localArticles) {
            this.setState({ articles: localArticles });
        }
      }
  },
  render: function() {
      return (
          <div className="articleapp">
            <ul className="artice-list">
                {
                  this.state.articles.map(function(el){
                    return <Article
                    key={el.id}
                    title={el.title}
                    date={el.date}
                    autor={el.autor}
                    texts={el.texts} />;
                  })
                }
            </ul>
          </div>
      );
  }
});

module.exports = ArticleApp;
