var FilterControls = React.createClass({
  handleOnChangeFilter: function(event) {
    this.props.onFiltred(event.target.value);
  },
  render: function() {
    return (
      <div className = "filter-controls" >
        <label className = "label-radio" >
          < input
            type = "radio"
            name = "filter"
            onChange = {this.handleOnChangeFilter}
            defaultChecked = {true}
            value = "all"
          />Все
        </label>
        <label className = "label-radio" >
          <input
            type = "radio"
            name = "filter"
            onChange = {this.handleOnChangeFilter}
            value = "checked"
          />Завершенные
        </label>
        <label className = "label-radio" >
          <input
            type = "radio"
            name = "filter"
            onChange = {this.handleOnChangeFilter}
            value = "unchecked"
          />Не завершенные
        </label>
      </div>
    );
  }
});

var Task = React.createClass({
  getInitialState: function() {
    return {
      checked: false
    }
  },
  onChange: function(event) {

    var task = {
      id: this.props.id,
      checked: event.target.checked,
      text: this.props.children
    };
    console.log(event.target);
    this.props.onChecked(task);
  },
  /*  onClick:function(event){
      this.setState({checked:event.target.checked})
    },*/
  render: function() {

    return (

      <
      div className = "task" >
      <
      label >
      <
      input nums = {
        this.key
      }
      type = "checkbox"
      name = "task"
      ref = "input"
      defaultChecked = {
        this.props.defchecked
      }
      onClick = {
        this.onClick
      }
      onChange = {
        this.onChange
      }

      />{this.props.children} <
      /label> <
      /div>
    );
  }
});
// onClick={onNoteDelete.bind(null, note)}

var TaskList = React.createClass({
      render: function() {
        var onTaskCheckeds = this.props.onChecked;
        return ( <
          div className = "task-list" > {
            this.props.tasks.map(function(task) {
                var results;
                switch (this.props.filter) {
                  case "checked":
                    if (task.checked) {
                      results = < Task
                      key = {
                        task.id
                      }
                      id = {
                        task.id
                      }
                      defchecked = {
                        task.checked
                      }
                      onChecked = {
                          this.props.onChecked
                        } > {
                          task.text
                        } <
                        /Task>;}
                      break;
                      case "unchecked":
                        if (!task.checked) {
                          results = < Task
                          key = {
                            task.id
                          }
                          id = {
                            task.id
                          }
                          defchecked = {
                            task.checked
                          }
                          onChecked = {
                              this.props.onChecked
                            } > {
                              task.text
                            } <
                            /Task>;}
                          break;
                          default: {
                            results = < Task
                            key = {
                              task.id
                            }
                            id = {
                              task.id
                            }
                            defchecked = {
                              task.checked
                            }
                            onChecked = {
                              this.props.onChecked
                            } > {
                              task.text
                            } <
                            /Task>;
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
          return ( <
            div className = "task-add" >
            <
            input type = "text"
            placeholder = "Что сделать?"
            onKeyPress = {
              this.handleKeyPress
            }
            value = {
              this.state.text
            }
            onChange = {
              this.handleOnChange
            }
            /> <
            /div>
          );
        }
      });

      var TaskListApp = React.createClass({
        getInitialState: function() {
          return {
            tasks: [{
                id: 0,
                checked: true,
                text: "Выполнить ДЗ"
              },
              {
                id: 1,
                checked: false,
                text: "Послать всех нах"
              }
            ],
            filter: "all"
          };
        },

        handleTaskAdd: function(newTask) {
          var newTasks = this.state.tasks.slice();
          newTasks.unshift(newTask);
          this.setState({
            tasks: newTasks
          });
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
          this.setState({
            tasks: newTasks
          });
        },

        render: function() {
          return ( <
            div className = "task-app" >
            <
            h2 className = "app-header" > TaskList < /h2> <
            TaskAdd onTaskAdd = {
              this.handleTaskAdd
            }
            /> <
            TaskList tasks = {
              this.state.tasks
            }
            filter = {
              this.state.filter
            }
            onChecked = {
              this.handleTaskCheked
            }
            /> <
            FilterControls onFiltred = {
              this.handleFiltred
            }
            /> <
            /div>
          );
        },
      });

      ReactDOM.render( <
        TaskListApp / > ,
        document.getElementById('mount-point')
      );
