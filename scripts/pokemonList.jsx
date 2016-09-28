import React from 'react'

var PokemonList = React.createClass({
  handleClick: function(pokemon){
      this.props.click(pokemon);
  },
  render: function() {
    if (this.props.data.length === 0){
      return null;
    }

    var that = this;
    var pokemonNodes = this.props.data.map(function(pokemon, idx){
      return(
        <li
          onClick={that.handleClick.bind(that, pokemon)}
          className="list-group-item"
          key={idx}>
           {pokemon.name}
        </li>
      );
    });
    return (
        <ul className = "list-group pokemonList">
          {pokemonNodes}
        </ul>
    )
  }
})

module.exports = PokemonList
