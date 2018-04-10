import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import { Transition } from 'react-transition-group';
import SongsList from './SongsList';
import SongDetails from './SongDetails';

class SongCard extends Component{

    constructor(){
        super();
        this.state={
            play: false,
            pause: false,
            fade1: false,
            fade2: true,            
            display1: true,
            display2: false,            
            moveWidth: 0,
            moveHeight: 0,            
            totalDur: 0,
            curDur: 0
        }
    }

    // sets up event listeners to allow for duration of audio to be available
    // as well as sets up the variables for the animations        
    componentDidMount(){
        this.audio.addEventListener('loadedmetadata', ()=>{
            this.setState({
                totalDur: this.audio.duration
            });
        });
        this.audio.addEventListener('ended', ()=>{
            this.playButton();
        });
        this.setState({
            moveWidth: this.moveBox.clientWidth,
            moveHeight: this.moveBox.clientHeight            
        })
    }

    // used to correctly set total duration on load
    // kept resetting when i navigated before so the if statement was added
    componentWillReceiveProps(){
        if(!this.state.totalDur){
            this.audio.load();
        }
    }

    // handles play/stop
    playButton = ()=>{
        if(!this.state.play){
            this.audio.play();
            this.setState({play: true});
        }
        else{
            this.audio.pause();
            this.audio.currentTime = 0;
            this.setState({play: false});
        }
    }

    // handles soft pauses
    // don't need to check the state of play because button only shows while play is true
    pauseButton = ()=>{
        if(!this.state.pause){
            this.audio.pause();
            this.setState({pause: true});
        }
        else{
            this.audio.play();
            this.setState({pause: false});
        }
    };

    // the callback for setState to feed into next and last song functions in app
    // needs to be here because "this" needs to reference the SongCard
    changeCB = ()=>{
        this.audio.load();
        if(this.state.play){
            this.audio.play();
        }
    }

    setCB = ()=>{
        this.audio.load();
        this.setState({
            play: true
        });
        this.audio.play();

    }

    // calls the functions in app on click
    nextClick = ()=>{
        this.props.nextButton(this.changeCB);
    }
    lastClick = ()=>{
        this.props.lastButton(this.changeCB);        
    }

    // for the progress bar
    progressUpdt = ()=>{
        this.setState({
            curDur: this.audio.currentTime
        })
    }

    // progress bar click function
    progressSeek = (event)=>{
        this.audio.currentTime = (event.nativeEvent.offsetX / this.progBar.clientWidth) * this.state.totalDur;
    }

    // this is for the delayed effects
    fadeToggle1 = ()=>{
        setTimeout(() => {
            this.setState({
                fade1: !this.state.fade1
            });
        }, 350);
        setTimeout(() => {
            this.setState({
                display1: !this.state.display1,
                display2: !this.state.display2
            });
        }, 700);
        setTimeout(() => {
            this.setState({
                fade2: !this.state.fade2
            });
        }, 1050);
    }

    // this is for the delayed effects
    fadeToggle2 = ()=>{
        this.setState({
            fade2: !this.state.fade2
        });
        setTimeout(() => {
            this.setState({
                display1: !this.state.display1,
                display2: !this.state.display2
            });
        }, 350);
        setTimeout(() => {
            this.setState({
                fade1: !this.state.fade1
            });
        }, 700);
    }

    render(){

        // variables declared for where to move the button
        let xMove = this.state.moveWidth / 2 - 22,
            yMove = - this.state.moveHeight / 2 - 40,
            btnMove = {
                entering: {right: 24, bottom: -20},
                entered: {right: xMove, bottom: yMove},
            };
        
        // progress bar varaible
        let progress = (this.state.curDur / this.state.totalDur) * 100;

        return (
            <div className="container">
                <div className="col s5">
                    <audio ref={(element)=>{ this.audio = element }} onTimeUpdate={this.progressUpdt} preload="metadata" >
                        <source src={this.props.song === undefined ? "" : this.props.song.source} />
                    </audio>
                    {/* this transition is all the way out here because i had wanted to layer animations
                        with transition group, but having to get my code to actually do stuff got in the way
                        leaving as is for future improvements */}
                    <Transition in={this.state.play} timeout={0} onEntered={this.fadeToggle1} onExited={this.fadeToggle2}>
                        {(status)=>(
                            <div className="card">
                                <div className="card-image">
                                    {/* album image and song title */}
                                    <img src={this.props.song === undefined ? "" : this.props.song.cover}
                                        alt={"album art"} />
                                    <span className="card-title" >{this.props.song === undefined ? "" : this.props.song.title}</span>
                                    {/* play button */}
                                    <a  className={"btn-floating halfway-fab waves-effect waves-light red" + 
                                                (this.state.fade1 ? " fade-in" : " fade-out") +
                                                (this.state.display1 ? "" : " rmv")} 
                                        style={{...btnMove[status]}} 
                                        onClick={this.playButton}>
                                        <i className="material-icons">play_arrow</i>
                                    </a>
                                </div>
                                <div className="card-content" style={{minHeight: this.state.moveHeight + 40}} ref={(element)=>{ this.moveBox = element }}>
                                    {/* artist and duration */}
                                    <div className={(this.state.play ? "fade-in" : "fade-out") +
                                                    (this.state.display1 ? "" : " rmv")}>
                                            <h5>{this.props.song === undefined ? "" : this.props.song.artist}</h5>
                                            <p>{Math.floor(this.state.totalDur / 60) + ":" + (Math.floor(this.state.totalDur % 60) < 10 ? "0" + Math.floor(this.state.totalDur % 60) : Math.floor(this.state.totalDur % 60))}</p>                                      
                                    </div>
                                    {/* progress bar */}
                                    <div className={"progress" + 
                                                    (this.state.fade2 ? " fade-in" : " fade-out") +
                                                    (this.state.display2 ? "" : " rmv")}
                                        ref={(element)=>{this.progBar = element}}
                                        onClick={this.progressSeek} >
                                        <div className="determinate" style={{width: progress + "%"}}></div>
                                    </div>
                                    {/* control buttons */}
                                    <a  className={"btn-floating waves-effect waves-light red" + 
                                                (this.state.fade2 ? " fade-in" : " fade-out") +
                                                (this.state.display2 ? "" : " rmv")} 
                                        onClick={this.lastClick}>
                                        <i className="material-icons">fast_rewind</i>
                                    </a>
                                    <a  className={"btn-floating waves-effect waves-light red" + 
                                                (this.state.fade2 ? " fade-in" : " fade-out") +
                                                (this.state.display2 ? "" : " rmv")} 
                                        onClick={this.pauseButton}>
                                        <i className="material-icons">{this.state.pause ? "play_arrow" : "pause"}</i>
                                    </a>
                                    <a  className={"btn-floating waves-effect waves-light red" + 
                                                (this.state.fade2 ? " fade-in" : " fade-out") +
                                                (this.state.display2 ? "" : " rmv")} 
                                        onClick={this.playButton}>
                                        <i className="material-icons">stop</i>
                                    </a>
                                    <a  className={"btn-floating waves-effect waves-light red" + 
                                                (this.state.fade2 ? " fade-in" : " fade-out") +
                                                (this.state.display2 ? "" : " rmv")} 
                                        onClick={this.nextClick}>
                                        <i className="material-icons">fast_forward</i>
                                    </a>
                                </div>
                            </div>
                        )}
                    </Transition>
                </div>
                <Switch>
                    <Route exact path="/" render={()=><SongsList songs={this.props.songs} setButton={this.props.setButton} setCB={this.setCB}/>}/>
                    <Route path='/:songId'render={(props)=><SongDetails match={props.match} songs={this.props.songs} setButton={this.props.setButton} setCB={this.setCB}/>}/>
                </Switch>
            </div>
        )
    }
}



export default SongCard;