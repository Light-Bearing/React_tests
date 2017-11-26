var FilterControls =React.createClass({
  handleOnChangeFilter:function (event) {
    this.props.onFiltred(event.target.value);
  },
  render:function () {
    return (
      <div className="filter-controls">
        <label><input type="radio" name="filter" onChange={this.handleOnChangeFilter} defaultChecked={true} value="all"/>Все</label>
        <label><input type="radio" name="filter" onChange={this.handleOnChangeFilter} value="checked"/>Завершенные</label>
        <label><input type="radio" name="filter" onChange={this.handleOnChangeFilter} value="unchecked"/>Не завершенные</label>
      </div>
    );
  }
});

var Task =React.createClass({
  render:function(){
    return(
      <div className="task">
        <input type="checkbox" name="task" defaultChecked={this.props.checked}/>{this.props.children}
      </div>
    );
  }
});
// onClick={onNoteDelete.bind(null, note)}

var TaskList =React.createClass({
  render:function () {
    return (
      <div className="task-list">
        {
              this.props.tasks.map(function(task){
              var results;
              switch (this.props.filter) {
                case "checked":
                if (task.checked)
                  {results = <Task
                      key={task.id}
                      checked={task.checked}>
                      {task.text}
                  </Task>;}
                  break;
                case "unchecked":
                if (!task.checked)
                  {results = <Task
                      key={task.id}
                      checked={task.checked}>
                      {task.text}
                  </Task>;}
                  break;
                default:{
               results = <Task
                   key={task.id}
                   checked={task.checked}>
                   {task.text}
               </Task>;
             }}
                return                  results;
            }.bind(this))
        }
      </div>
    );
  }
});

var TaskAdd = React.createClass({
  getInitialState:function () {
    return{
      text:''
    };
  },
  handleKeyPress: function (target) {
    if(target.charCode==13){
      var newTask={
        text:this.state.text,
        checked:false,
        id: Date.now()
      };
      this.props.onTaskAdd(newTask);
      this.setState({text:''});
   }
  },

  handleOnChange:function (event) {
    this.setState({text:event.target.value})
  },

  render: function () {
    return(
      <div className="task-add">
        <input
          type="text"
          placeholder="Что сделать?"
          onKeyPress={this.handleKeyPress}
          value={this.state.text}
          onChange={this.handleOnChange}
        />
      </div>
      );
  }
});

var TaskListApp = React.createClass({
  getInitialState: function () {
    return{
      tasks:[
        {
          id:1,
          checked:true,
          text:";askldjf"
      },
      {
        id:2,
        checked:false,
        text:"asdfasdf"
      }
    ],
    filter:"all"
    };
  },

  componentDidMount:function () {
    /*var localTasks = JSON.parse(localStorage.getItem('tasks'));
    if(localTasks){
      this.setState({tasks:localTasks});
    }*/
  },

    handleTaskAdd: function (newTask) {
      var newTasks = this.state.tasks.slice();
      newTasks.unshift(newTask);
      this.setState({tasks:newTasks});
    },
    handleFiltred:function (filtred) {
      this.setState({filter:filtred});
    },
    render: function() {
        return (
            <div className="tasks-app">
                <h2 className="app-header">TaskList</h2>
                <TaskAdd onTaskAdd={this.handleTaskAdd} />
                <TaskList tasks={this.state.tasks} filter={this.state.filter}/>
                <FilterControls onFiltred={this.handleFiltred}/>
            </div>
        );
    },
});

ReactDOM.render(
    <TaskListApp />,
    document.getElementById('mount-point')
);
