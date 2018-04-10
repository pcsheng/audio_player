import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class SongDetails extends Component {

    handleClick = (event)=>{
        this.props.setButton(this.props.match.params.songId * 1, this.props.setCB);
    }

    render() {
        let theSong = this.props.songs.filter((curr)=>{
            return curr.id === this.props.match.params.songId * 1;
        });

        return (
            <div className="col s7" >
                <div className="card-panel">
                    <ul className="collection">
                        <li className="collection-item">
                            <h5>{theSong.length === 1 ? theSong[0].title : ""}</h5>
                            <p>{theSong.length === 1 ? theSong[0].artist : ""}</p>
                            <p>{theSong.length === 1 ? theSong[0].duration : ""}</p>                    
                            <button class="btn waves-effect waves-light" onClick={this.handleClick} >Play
                                <i class="material-icons right">send</i>
                            </button>        
                        </li>
                        <li className="collection-item left-align">{theSong.length === 1 ? theSong[0].description : ""}</li>
                    </ul>
                </div>
                <Link to='/'>
                    <button className="btn waves-effect waves-light">Back to List
                        <i className="material-icons left">view_list</i>
                    </button>
                </Link>
            </div>
        )
    }
}

export default SongDetails;