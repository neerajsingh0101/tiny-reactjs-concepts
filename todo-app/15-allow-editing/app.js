var React = require('react');
var rand = require("random-key");
var Firebase = require('firebase');

var DisplayItem = React.createClass({

  propTypes: {
      handleDelete: React.PropTypes.func.isRequired,
      handleDone: React.PropTypes.func.isRequired,
      handleEditedContent: React.PropTypes.func.isRequired,
      item: React.PropTypes.object.isRequired
  },

  getInitialState () {
    return { editing: false, _text: this.props.item.text };
  },

  handleEditing () {
    this.setState({ editing: true });
  },

  handleEditKeyPress (event) {
    if (event.keyCode === 13) {
      this.setState({ editing: false });
      this.props.handleEditedContent(this.props.item.id, this.state._text);
    }
  },

  handleEditChange (event) {
    var text = event.target.value;
    this.setState({ _text: text });
  },

  render () {
    var item = this.props.item;
    var viewStyle = {};
    var editStyle = {};

    if (this.state.editing) {
      viewStyle.display = "none";
    } else {
      editStyle.display = "none";
    }

    return (
      <li key={item.id} className={item.done ? "done" : ""}>
        <div onDoubleClick={this.handleEditing} style={viewStyle}>
          <input  type="checkbox"
                  checked={item.done}
                  onChange={this.props.handleDone.bind(null, item.id)} />

          <label>{ this.state._text }</label>

          <a href='#' className="destroy"
                      onClick={this.props.handleDelete.bind(null, item.id)}>
            [x]
          </a>
        </div>
        <input  type="text"
                value={this.state._text}
                onKeyDown={this.handleEditKeyPress}
                onChange={this.handleEditChange}
                style={editStyle} />
      </li>
    );
  }

});

var DisplayList = React.createClass({

  propTypes: {
      handleDelete: React.PropTypes.func.isRequired,
      handleEditedContent: React.PropTypes.func.isRequired,
      handleDone: React.PropTypes.func.isRequired
  },

  displayItem (item) {
    return (
      <section id="main">
        <DisplayItem  key={item.id}
                      item={item}
                      handleDelete={this.props.handleDelete}
                     handleEditedContent={this.props.handleEditedContent}
                      handleDone={this.props.handleDone} />
      </section>
    );
  },

  render () {
    return (
      <ul id="todo-list">
        { this.props.items.map(this.displayItem) }
      </ul>
    );
  }

});

var App = React.createClass({

  componentWillMount () {
    this.firebase = new Firebase("https://test251.firebaseio.com/");

    this.firebase.on("value", function (data) {
                                        var obj = data.val();
                                        console.log(obj);
                                        if ( obj ) {
                                          var ids = Object.keys(obj);
                                          var items = [];
                                          ids.forEach(function(id) {
                                              var item = obj[id];
                                              item.id = id;
                                              items.push(item);
                                          });

                                          this.setState({ items: items });
                                        }
    }.bind(this)
                    );
  },

  getInitialState () {
    return { text: '', items: [] };
  },

  handleDone (taskId) {
    var _items = this.state.items;
    var item = _items.filter((item) => { return (item.id === taskId); } )[0];
    item.done = !item.done;

    this.firebase.child(item.id).update({ done: item.done });

    this.setState({ items: _items });
  },

  handleDelete (taskId) {
    var newItems = this.state.items.filter((item) => { return (item.id !== taskId); } );
    this.firebase.child(taskId).remove();
    this.setState({ items: newItems });
  },

  handleSubmit (event) {
    event.preventDefault();

    var text = this.state.text;
    var id = rand.generate();
    var newData = { text: text, done: false };

    this.firebase.child(id).set(newData);

    newData.id = id;
    var newItems = this.state.items.concat(newData);
    this.setState({ text: '', items: newItems });

  },

  handleEditedContent (taskId, newText) {
    var _items = this.state.items;
    var item = _items.filter((item) => { return (item.id === taskId); } )[0];
    item.text = newText;

    this.firebase.child(item.id).update({ text: item.text });

    this.setState({ items: _items });
  },

  handleChange (event) {
    var text = event.target.value;
    this.setState({ text: text });
  },

  handleClearCompleted () {
    var newItems = this.state.items.filter((item) => { return !item.done; } );
    this.setState({ items: newItems });
  },

  render () {
    return (
      <div>
        <h1> TODO </h1>
        <form onSubmit={this.handleSubmit}>
          <input type="text" onChange={this.handleChange} value={this.state.text} />
        </form>

        <DisplayList items={this.state.items}
                     handleDone={this.handleDone}
                     handleEditedContent={this.handleEditedContent}
                     handleDelete={this.handleDelete} />
        <footer>
          All({ this.state.items.length }) |
          Completed({ this.state.items.filter((item) => { return item.done; }).length })
          Pending({ this.state.items.filter((item) => { return !item.done; }).length }) |
          <a href='#' onClick={this.handleClearCompleted}>Clear Completed</a>
        </footer>
      </div>
    );
  }

});

React.render(<App />, document.getElementById("todoapp"));
