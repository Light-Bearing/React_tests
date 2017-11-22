var COLORS=["yellow","rgb(252, 104, 104)","rgb(118, 210, 110)","rgb(98, 135, 231)","rgb(236, 168, 87)","rgb(82, 159, 87)","rgb(143, 76, 147)"];

var Note = React.createClass({
    render: function() {
        var style = { backgroundColor: this.props.color };
        return (
            <div className="note" style={style}>
                <span className="delete-note" onClick={this.props.onDelete}> × </span>
                {this.props.children}
            </div>
        );
    }
});




var SelectColor=React.createClass({
  render: function(){
    var style = { backgroundColor: this.props.color };
    return(
      <div className="selector-color" style={style}>
        <label className="label-radio">
          <input
            id={this.props.id}
            type="radio"
            name="selcolor"
            value={this.props.color}
            defaultChecked={this.props.color===this.props.defCol}
            onChange={this.props.onChange} />
            <i></i>
        </label>
      </div>
    );
  }
});

var SelectorsColor=React.createClass({
  render: function(){
    return(
      <div className="selectors-color">
        <SelectColor
          id = {"color1"}
          color={COLORS[0]}
          onChange={this.props.onChange}
          defCol= {this.props.value} />
        <SelectColor
            id = {"color2"}
            color={COLORS[1]}
            onChange={this.props.onChange}
            defCol= {this.props.value} />
        <SelectColor
            id = {"color3"}
            color={COLORS[2]}
            onChange={this.props.onChange}
            defCol= {this.props.value} />
        <SelectColor
            id = {"color4"}
            color={COLORS[3]}
            onChange={this.props.onChange}
            defCol= {this.props.value} />
        <SelectColor
            id = {"color5"}
            color={COLORS[4]}
            onChange={this.props.onChange}
            defCol= {this.props.value} />
        <SelectColor
            id = {"color6"}
            color={COLORS[5]}
            onChange={this.props.onChange}
            defCol= {this.props.value} />
        <SelectColor
            id = {"color7"}
            color={COLORS[6]}
            onChange={this.props.onChange}
            defCol= {this.props.value} />
      </div>
    );
  }
});

var NoteEditor = React.createClass({
    getInitialState: function() {
        return {
            text: '',
            color:'yellow'
        };
    },

    handleTextChange: function(event) {
        this.setState({ text: event.target.value });
    },

    handleNoteAdd: function() {
        var newNote = {
            text: this.state.text,
            color: this.state.color1,
            //'yellow',
            id: Date.now()
        };

        this.props.onNoteAdd(newNote);
        this.setState({ text: '' ,color : 'yellow'});
    },
    handleColorChange: function(event){
      this.setState({ color1: event.currentTarget.value });
    },
    render: function() {
        return (
            <div className="note-editor">
                <textarea
                    placeholder="Enter your note here..."
                    rows={5}
                    className="textarea"
                    value={this.state.text}
                    onChange={this.handleTextChange}
                />
                <SelectorsColor
                  value={this.state.color}
                  onChange={this.handleColorChange}
                />

                <button className="add-button" onClick={this.handleNoteAdd}>Add</button>
            </div>
        );
    }
});

var NotesGrid = React.createClass({
    componentDidMount: function() {
        var grid = this.refs.grid;
        this.msnry = new Masonry( grid, {
            itemSelector: '.note',
            columnWidth: 200,
            gutter: 10,
            isFitWidth: true
        });
    },

    componentDidUpdate: function(prevProps) {
        if (this.props.notes.length !== prevProps.notes.length) {
            this.msnry.reloadItems();
            this.msnry.layout();
        }
    },

    render: function() {
        var onNoteDelete = this.props.onNoteDelete;

        return (
            <div className="notes-grid" ref="grid">
                {
                    this.props.notes.map(function(note){
                        return (
                            <Note
                                key={note.id}
                                onDelete={onNoteDelete.bind(null, note)}
                                color={note.color}>
                                {note.text}
                            </Note>
                        );
                    })
                }
            </div>
        );
    }
});

var NotesApp = React.createClass({
    getInitialState: function() {
        return {
            notes: []
        };
    },

    componentDidMount: function() {
        var localNotes = JSON.parse(localStorage.getItem('notes'));
        if (localNotes) {
            this.setState({ notes: localNotes });
        }
    },

    componentDidUpdate: function() {
        this._updateLocalStorage();
    },

    handleNoteDelete: function(note) {
        var noteId = note.id;
        var newNotes = this.state.notes.filter(function(note) {
            return note.id !== noteId;
        });
        this.setState({ notes: newNotes });
    },

    handleNoteAdd: function(newNote) {
        var newNotes = this.state.notes.slice();
        newNotes.unshift(newNote);
        this.setState({ notes: newNotes });
    },

    render: function() {
        return (
            <div className="notes-app">
                <h2 className="app-header">NotesApp</h2>
                <NoteEditor onNoteAdd={this.handleNoteAdd} />
                <NotesGrid notes={this.state.notes} onNoteDelete={this.handleNoteDelete} />
            </div>
        );
    },

    _updateLocalStorage: function() {
        var notes = JSON.stringify(this.state.notes);
        localStorage.setItem('notes', notes);
    }
});

ReactDOM.render(
    <NotesApp />,
    document.getElementById('mount-point')
);
