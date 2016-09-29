import PokemonInfo from './pokemonInfo.jsx'
import PokemonList from './pokemonList.jsx'
import PokemonSearch from './pokemonSearch.jsx'
import React from 'react'
import {Router, Route, Link, hashHistory} from 'react-router'
import ReactDOM from 'react-dom'
import $ from 'jquery'

var Pokedex = React.createClass({
  getInitialState: function() {
    return {originalList: [], filteredList: []};
  },
  componentWillMount: function() {
    this.loadPokemonList();
  },
  loadPokemonList: function(){
    console.log('loading pokemon list');
    $.ajax({
        url: "http://pokeapi.co/api/v2/pokemon/" + "?limit=150",
        dataType: 'json',
        cache: true,
        success: function(data){
          this.setState({originalList: data.results, filteredList: data.results})
        }.bind(this),
        error: function(xhr, status, err) {
           console.log("error")
           console.error(this.props.url, status, err.toString());
        }.bind(this),
	       timeout:10000
    });
  },
  handlePokemonSearch: function(name){
     if (name === ""){
       this.setState({list: this.state.data.results})
       return;
     }
     var filteredList = this.state.originalList.filter(function(pokemon){
         return (pokemon.name.indexOf(name) !== -1);
     })
     this.setState({filteredList: filteredList});
  },
  render: function(){
    return (
      <div className = "pokedex">
        <h1> ReactJS Pokedex </h1>
          <div className="col-md-4">
           <PokemonSearch search={this.handlePokemonSearch} />
           <PokemonList data={this.state.filteredList} />
          </div>

          <div className="col-md-offset-1 col-md-6">
          {this.props.children}
          </div>
      </div>
    );
  }
});


ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={Pokedex}>
      <Route path=":facts" component={PokemonInfo}></Route>
    </Route>
  </Router>,
  document.getElementById('root')
);
