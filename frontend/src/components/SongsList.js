import React, {Component} from 'react';
import Song from './Song';

class SongsList extends Component {
    render() {

        let songLayout;
        if (this.props.songs !== undefined){
            songLayout = this.props.songs.map((curr)=>{
                return <Song song={curr} setButton={this.props.setButton} setCB={this.props.setCB}/>
            })
        }

        return (
            <div className="col s7" style={{display: "flex", flexWrap: "wrap"}} >
                {songLayout}
            </div>
        )
    }
}

export default SongsList;