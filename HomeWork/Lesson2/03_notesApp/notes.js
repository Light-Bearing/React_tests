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
  getInitialState: function() {
      return {
          displayedColors: COLORS
      };
  },

  render: function(){
    return(
      <div className="selectors-color">

      {
        this.state.displayedColors.map(function(el){
          return <SelectColor
                    key={el}
                    color={el}
                    onChange={this.props.onChange}
                    defCol= {this.props.value}
                   />;
        }.bind(this))
      }
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
                    placeholder="Введите текст заметки здесь..."
                    rows={5}
                    className="textarea"
                    value={this.state.text}
                    onChange={this.handleTextChange}
                />
                <SelectorsColor
                  value={this.state.color}
                  onChange={this.handleColorChange}
                />

                <button className="add-button" onClick={this.handleNoteAdd}>Добавить</button>
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

var SearchNote=React.createClass({
  handleChange:function(event){

    this.props.onSearch(event.target.value.toLowerCase());
  },
  render:function(){
  return (<div className="note-search">
              <input type="text" value={this.props.value} className="search-field" onChange={this.handleChange} placeholder="Поиск заметки..."/>
          </div>
        );
  }
});

var NotesApp = React.createClass({
    getInitialState: function() {
        return {
            notes: [],
            filteredNotes:[],
            searchQuery:''
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
        var searchQuery=this.state.searchQuery;
        var newNotes = this.state.notes.filter(function(note) {
            return note.id !== noteId;
        });
        this.setState({ notes: newNotes });
        newNotes=this.state.filteredNotes.filter(function(note){ return note.id !==noteId});
        this.setState({ filteredNotes: newNotes });
    },

    handleNoteAdd: function(newNote) {
        var newNotes = this.state.notes.slice();
        newNotes.unshift(newNote);
        if (this.state.searchQuery === ''){
          this.setState({ notes: newNotes});}
        else {
          var searchValue= newNote.text.toLowerCase();
          if (searchValue.indexOf(this.state.searchQuery) !==-1){
            var newFiltredNotes = this.state.filteredNotes.slice();
            newFiltredNotes.unshift(newNote);
            this.setState({ notes: newNotes,filteredNotes: newFiltredNotes});
          }else{
            this.setState({ notes: newNotes});}
        };
    },
    handleonSearchChanges:function(query){
        var searchQuery =  query;
        var localNotes = this.state.notes;
        var notes = localNotes.filter(function(el){
            var searchValue = el.text.toLowerCase();
            return searchValue.indexOf(searchQuery) !== -1;
        });
        if (notes) {
            this.setState({ filteredNotes: notes,searchQuery:query});
        }
    },

    printGrid:
      function(){
      if(this.state.searchQuery===''){
        return <NotesGrid
                  notes={this.state.notes}
                  onNoteDelete={this.handleNoteDelete}
                />
      } else{
        if (this.state.filteredNotes.length === 0){
            return <div className="notes-grid" >
              <label> Ничего не найдено...</label>
            </div>
          }else{
        return <NotesGrid notes={this.state.filteredNotes} onNoteDelete={this.handleNoteDelete} />
      }}
    },

    render: function() {
        return (
            <div className="notes-app">
                <h2 className="app-header">NotesApp</h2>
                <SearchNote value={this.state.searchQuery} onSearch={this.handleonSearchChanges}/>
                <NoteEditor onNoteAdd={this.handleNoteAdd} />
                {this.printGrid()}
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
