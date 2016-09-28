import React from 'react'

var PokemonSearch = React.createClass({
  getInitialState: function() {
    return ({search: ''});
  },
  handleChange: function(e) {
    this.setState({search: e.target.value});
    this.props.search(e.target.value);
  },
  render: function() {
    return (
      <input className="form-control"
        type="text"
        placeholder="look up a pokemon"
        value={this.state.search}
        onChange={this.handleChange}
      />
    )
  }
})

module.exports = PokemonSearch
