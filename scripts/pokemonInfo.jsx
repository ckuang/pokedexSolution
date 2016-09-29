import React from 'react'
import $ from 'jquery'

function Pokemon() {
  this.name = '';
  this.sprites = {front_default:  ''};
  this.abilites = [];
  this.types = [];
  this.stats = [];
}
var PokemonInfo = React.createClass({
  getInitialState: function() {
    var blankPoke = new Pokemon();
    return {pokemon: blankPoke};
  },
  componentWillReceiveProps: function(nextProps) {
    console.log("receiving props")
    this.whoIsThatPokemon(nextProps.params.facts)
  },
  whoIsThatPokemon: function(pokemon) {
    $.ajax({
      url: "http://pokeapi.co/api/v2/pokemon/" + pokemon,
      dataType: 'json',
      cache: true,
      success: function(data){
        // console.log("loaded pokemon details");
        console.log(data);
        this.setState({pokemon: data})
      }.bind(this),
      error: function(xhr, status, err) {
        console.log("error")
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  componentDidMount: function() {
    this.whoIsThatPokemon(this.props.params.facts)
  },
  render: function() {
    console.log(this.props.params)
    var pokemon;
    if (this.props.pokemon){
      pokemon = this.props.pokemon;
    } else {
      pokemon = this.state.pokemon;
    }

    var types = pokemon.types.map(function(obj, idx){
        return(
          <li key={idx}>
            {obj.type.name}
          </li>
        );
    });

   var stats = pokemon.stats.map(function(obj, index){
     return(
       <li  key = {index}>
            {obj.stat.name} : {obj.base_stat}
       </li>
     );
   });
    return (
      <div>
        <h2>{pokemon.name} </h2>
        <img src={pokemon.sprites.front_default} alt="Pokemon Image" />
        <h4> Type: </h4>
        <ul>
          {types}
        </ul>
        <h4> Stats: </h4>
        <ul>
          {stats}
        </ul>fault}
      </div>
    )
  }
})

module.exports = PokemonInfo
