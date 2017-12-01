var FilterControls = React.createClass({
  handleOnChangeFilter: function(event) {
    this.props.onFiltred(event.target.value);
  },
  render: function() {
    return (
      <div className = "filter-controls" >
        <span createClass="filter-control"><input
              type = "radio"
              name = "filter"
              onChange = {this.handleOnChangeFilter}
              defaultChecked = {true}
              value = "all"
              id="all"
            /><label htmlFor="all" className = "label-radio" >Все</label></span>
        <span createClass="filter-control"><input
            type = "radio"
            name = "filter"
            onChange = {this.handleOnChangeFilter}
            value = "checked"
            id = "checked"
          /><label htmlFor="checked" className = "label-radio" >Завершенные</label></span>
          <span createClass="filter-control">
            <input
              type = "radio"
              name = "filter"
              onChange = {this.handleOnChangeFilter}
              value = "unchecked"
              id = "unchecked"
            />
          <label htmlFor="unchecked" className = "label-radio" >Не завершенные</label>
        </span>
      </div>
    );
  }
});

var Task = React.createClass({
  onChange: function(event) {

    var task = {
      id: this.props.id,
      checked: event.target.checked,
      text: this.props.children
    };
    this.props.onChecked(task);
  },

  render: function() {
    return (
      <div className = "task" >
        <input
            nums = {this.key}
            type = "checkbox"
            name = "task"
            className = {"inp" + this.props.id}
            defaultChecked = {this.props.defchecked}
            onClick = {this.onClick}
            onChange = {this.onChange}
          />
        <label htmlFor={"inp" + this.props.id}>
          {this.props.children}
        </label>
        <span className="delete-task" onClick={this.props.onDelete}>×</span>
      </div>
    );
  }
});

var TaskList = React.createClass({
      render: function() {
        var onTaskCheckeds = this.props.onChecked;
        var onTaskDelete = this.props.onTaskDelete;
        return ( <
          div className = "task-list" > {
            this.props.tasks.map(function(task) {
                var results;
                switch (this.props.filter) {
                  case "checked":
                    if (task.checked)
                    {
                      results =
                        <Task
                          key = {task.id}
                          id = {task.id}
                          defchecked = {task.checked}
                          onChecked = {this.props.onChecked}
                          onDelete={onTaskDelete.bind(null, task)}
                        >
                          {task.text}
                        </Task>;
                    }
                      break;
                      case "unchecked":
                        if (!task.checked) {
                          results =
                            <Task
                              key = {task.id}
                              id = {task.id}
                              defchecked = {task.checked}
                              onChecked = {this.props.onChecked}
                              onDelete={onTaskDelete.bind(null, task)}
                            >
                              {task.text}
                            </Task>;
                          }
                          break;
                          default: {
                            results =
                              <Task
                                key = {task.id}
                                id = {task.id}
                                defchecked = {task.checked}
                                onChecked = {this.props.onChecked}
                                onDelete={onTaskDelete.bind(null, task)}
                              >
                                {task.text}
                              </Task>;
                            }
                        }
                        return results;
                    }.bind(this))
              } <
              /div>
            );
          }
        });

      var TaskAdd = React.createClass({
        getInitialState: function() {
          return {
            text: ''
          };
        },

        handleKeyPress: function(target) {
          if (target.charCode == 13) {
            var newTask = {
              text: this.state.text,
              checked: false,
              id: Date.now()
            };
            this.props.onTaskAdd(newTask);
            this.setState({
              text: ''
            });
          }
        },

        handleOnChange: function(event) {
          this.setState({
            text: event.target.value
          })
        },

        render: function() {
          return (
            <div className = "task-add" >
              <input
                type = "text"
                placeholder = "Что сделать?"
                onKeyPress = {this.handleKeyPress}
                value = {this.state.text}
                onChange = {this.handleOnChange}
                className="input-add"
              />
            </div>
          );
        }
      });

      var TaskListApp = React.createClass({
        getInitialState: function() {
          return {
            tasks: [],
            filter: "all"
          };
        },
        componentDidMount: function() {
            var localtasks = JSON.parse(localStorage.getItem('tasks'));
            if (localtasks) {
                this.setState({ tasks: localtasks });
            }
        },
        componentDidUpdate: function() {
            this._updateLocalStorage();
        },
        handleTaskAdd: function(newTask) {
          var newTasks = this.state.tasks.slice();
          newTasks.unshift(newTask);
          this.setState({
            tasks: newTasks
          });
        },
        handleTaskDelete: function(task) {
            var taskId = task.id;
            var newTasks = this.state.tasks.filter(function(task) {
                return task.id !== taskId;
            });
            this.setState({ tasks: newTasks });
        },

        handleFiltred: function(filtred) {
          this.setState({
            filter: filtred
          });
        },

        handleTaskCheked: function(task) {
          console.log("task", task);
          for (var i = 0; i < this.state.tasks.length; i++) {
            if (this.state.tasks[i].id === task.id)
              var taskId = i;
          }
          var newTasks = this.state.tasks.slice();
          newTasks[taskId] = task;
          this.setState({tasks: newTasks});
        },

        render: function() {
          return (
            <div className = "task-app" >
              <h2 className = "app-header" >TaskList</h2>
              <TaskAdd onTaskAdd = {this.handleTaskAdd}/>
              <TaskList
                tasks = {this.state.tasks}
                filter = {this.state.filter}
                onChecked = {this.handleTaskCheked}
                onTaskDelete={this.handleTaskDelete}
              />
              <FilterControls onFiltred = {this.handleFiltred} />
            </div>
          );
        },
        _updateLocalStorage: function() {
            var tasks = JSON.stringify(this.state.tasks);
            localStorage.setItem('tasks', tasks);
        }
      });

      ReactDOM.render( <
        TaskListApp / > ,
        document.getElementById('mount-point')
      );
