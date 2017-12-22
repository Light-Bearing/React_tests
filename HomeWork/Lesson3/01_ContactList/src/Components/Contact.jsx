var React = require('react');
//var NoteEditor = require('./NoteEditor.jsx');
//var NotesGrid = require('./NotesGrid.jsx');

require('./Contact.css');

var Contact = React.createClass({
  getInitialState: function() {
      return {
          isOpened: false
      };
  },
  handleOpened:function (){
    var opened = !this.state.isOpened;

    this.setState({isOpened : opened});
  },
  addons:function (){
    if (this.state.isOpened){

     return <div className="contact-addons">
              <div> e-mail: {this.props.email} </div>
              <div className="contact-adress"> adress: {this.props.adress} </div>
            </div>
    }
  },

    render: function() {
        return (
            <li
              className="contact"
              onClick={this.handleOpened}
            >

                <img className="contact-image" src={this.props.image} width="60px" height="60px"  />
                <div className="contact-info" >
                    <div className="contact-name"  > {this.props.name} </div>
                    <div className="contact-number" > {this.props.phoneNumber} </div>
                    {
                      this.addons()
                    }
                </div>
            </li>
        );
    }
});

module.exports = Contact;
