var React = require('react');


var Article=React.createClass({
  render: function() {
      return (
          <div className="article">
          <h1>{this.props.title}</h1>
          <h4>{this.props.date}</h4>
          <h4>{this.props.autor}</h4>
          {this.props.texts}
          </div>
      );
  }
});

module.exports = Article;
