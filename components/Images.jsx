var React = require("react");
var mui = require("material-ui");
var TextField = mui.TextField;
var FlatButton = mui.FlatButton;

var ImageForm = React.createClass({
  propTypes: {
    onAddUrl: React.PropTypes.func.isRequired
  },

  getInitialState: function() {
    return { url: '' };
  },

  render: function() {
    var divStyle = {
      marginTop: 10,
      marginLeft: 200
    };

    return (
      <form onSubmit={this.onSubmit} style={divStyle}>
        <TextField defaultValue={this.state.url} onChange={this.handleChange} />
        <FlatButton label="ADD IMAGE URL" primary={true}/>
      </form>
    );
  },

  handleChange: function(e) {
    this.setState({url: e.target.value});
  },

  onSubmit: function(e) {
    e.preventDefault();
    this.props.onAddUrl(this.state.url);
    this.setState({url: ''});
  }
});

module.exports = ImageForm;
