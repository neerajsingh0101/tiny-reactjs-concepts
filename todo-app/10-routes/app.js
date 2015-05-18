var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Route = Router.Route;
var Link = Router.Link;

var HelloMessage = require('./../01-minimal-reactjs-setup/app.js');

var App = React.createClass({
  render () {
    return (
      <div>
        <h1> Tiny steps in React using Routes </h1>
        <Link to="step-1"> Step 1 </Link>
        <RouteHandler/>
      </div>
    );
  }
});

var routes = (
  <Route>
    <Route name="app" path="/" handler={App} />
    <Route name="step-1" path="/step-1" handler={HelloMessage}/>
  </Route>
);

Router.run(routes, Router.HashLocation, (Root) => {
  React.render(<Root/>, document.body);
});
