import React from 'react'
import {Link} from 'react-router'

var PokemonList = React.createClass({
  render: function() {
    if (this.props.data.length === 0){
      return null;
    }

    var that = this;
    var pokemonNodes = this.props.data.map(function(pokemon, idx){
      return(
        <li
          className="list-group-item"
          key={idx}>
          <Link to={"/" + pokemon.name}>{pokemon.name}</Link>
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
