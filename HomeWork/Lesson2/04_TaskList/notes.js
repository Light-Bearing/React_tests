
var FilterControls  = React.createClass({
    render: function() {
        return (
          <div>
            lists controls
          </div>
        );
    },
});

var List  = React.createClass({
    render: function() {
        return (
          <div>
            lists
          </div>
        );
    },
});
var AddTask = React.createClass({
    render: function() {
        return (
          <div>
            <input type="text" value={this.props.value} className="add-field" onChange={this.handleChange} placeholder="Что нужно сделать?"/>
          </div>
        );
    },
});

var TaskList = React.createClass({
    render: function() {
        return (
            <div className="tasklist-app">
                <AddTask value={this.state.searchQuery} onSearch={this.handleonSearchChanges}/>
                <List onNoteAdd={this.handleNoteAdd} />
                <FilterControls>
            </div>
        );
    },
});

ReactDOM.render(
    <TaskList />,
    document.getElementById('mount-point')
);
