import React from 'react';
import {Link} from 'react-router-dom';




function Song(props){
    let handleClick = (event)=>{
        props.setButton(props.song.id, props.setCB);
    }
    return (
        <div className="card-image" style={{flexBasis: 50 + "%", paddingTop: 6, paddingLeft: 6, paddingRight: 6}} >
            <Link to={'/' + props.song.id} >
                <img src={props.song === undefined ? "" : props.song.cover}
                    alt={"album art"}
                    style={{width: 100 + "%"}} />
            </Link>
            <button className="btn waves-effect waves-light" style={{width: 100 + "%", fontSize: 13}} onClick={handleClick} >{props.song === undefined ? "" : props.song.title}
                <i className="material-icons right">send</i>
            </button>
        </div>
    )
}

export default Song;