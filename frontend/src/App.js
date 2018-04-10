import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SongCard from './components/SongCard';
import axios from 'axios';


class App extends Component {
  constructor(){
    super();
    this.state = {
      songs: [],
      songIndex: 0
    };
  };

  componentWillMount(){
    axios.get('http://localhost:8080/songs')
      .then(result=>{
        this.setState({
          songs: result.data
        });
      })
      .catch(error=>{
        console.log(error);
      });
  };

  setButton = (newIndex, callback)=>{
    this.setState({songIndex: newIndex}, callback);    
  }

  // moves to next song
  nextButton = (callback)=>{
    let newIndex = this.state.songIndex;
    if (newIndex === this.state.songs.length - 1){
      newIndex = 0;
    }
    else{
      newIndex += 1;
    }
    this.setState({songIndex: newIndex}, callback);
  }

  // moves to previous song
  lastButton = (callback)=>{
    let newIndex = this.state.songIndex;
    if (newIndex === 0){
      newIndex = this.state.songs.length - 1;
    }
    else{
      newIndex -= 1;
    }
    this.setState({songIndex: newIndex}, callback);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header" style={{height: 120}}>
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <div className="row">
          <SongCard song={this.state.songs.length === 0 ? undefined : this.state.songs[this.state.songIndex]} 
                    songs={this.state.songs}
                    setButton={this.setButton}
                    nextButton={this.nextButton} 
                    lastButton={this.lastButton} 
                    songIndex={this.state.songIndex} />
        </div>
      </div>
    );
  };
};

export default App;
