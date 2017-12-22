var React = require('react');
var Contact = require('./Contact.jsx');
var list = require('./list.jsx');

require('./ContactList.css');


var ContactList= React.createClass({
  getInitialState: function() {
      return {
          displayedContacts: list
      };
  },

  handleSearch: function(event) {
      var searchQuery = event.target.value.toLowerCase();
      var displayedContacts = list.filter(function(el) {
          var searchValue = el.name.toLowerCase();
          return searchValue.indexOf(searchQuery) !== -1;
      });

      this.setState({
          displayedContacts: displayedContacts
      });
  },

  render: function() {
      return (
          <div className="contacts">
              <input type="text" className="search-field" onChange={this.handleSearch} />
              <ul className="contacts-list">
                  {
                    this.state.displayedContacts.map(function(el){
                      return <Contact
                      key={el.id}
                      name={el.name}
                      phoneNumber={el.phoneNumber}
                      image={el.image}
                      email={el.email}
                      adress={el.adress} />;
                    })
                  }
              </ul>
          </div>
      );
  }
})

module.exports = ContactList;
