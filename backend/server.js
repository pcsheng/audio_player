const express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      cors = require('cors');

app.use(cors());

function Song(source, title, artist, cover, duration, description, id) {
    this.source = source;
    this.title = title;
    this.artist = artist;
    this.cover = cover;
    this.duration = duration;
    this.description = description;
    this.id = id;
}
  
const songs = [
    new Song("/assets/Podington_Bear_-_Blue_Highway.mp3", 'Blue Highway', 'Podington Bear', '/assets/edan-cohen-2487-unsplash.jpg', "2:50", "Williamsburg wolf thundercats air plant. Tousled 90's try-hard, snackwave banh mi shabby chic blog keffiyeh next level copper mug readymade activated charcoal quinoa chillwave tilde. Forage narwhal quinoa, polaroid prism cronut yr raw denim lyft scenester street art tilde kickstarter. Mumblecore +1 raclette asymmetrical vexillologist chia listicle lumbersexual freegan vaporware pitchfork prism. Whatever copper mug banjo wayfarers actually next level locavore you probably haven't heard of them 8-bit. Waistcoat heirloom bushwick microdosing, pug blog semiotics slow-carb poutine man braid mlkshk taxidermy cliche man bun taiyaki. 90's blue bottle ugh chartreuse, pickled flannel vape franzen taxidermy.", 0),
    new Song('/assets/Podington_Bear_-_Gizmo.mp3', 'Gizmo', 'Podington Bear', '/assets/john-jennings-430220-unsplash.jpg', "2:04", "Mixtape lumbersexual keffiyeh chillwave kombucha normcore blue bottle plaid ugh +1 pop-up air plant craft beer. Truffaut kogi venmo, gochujang direct trade photo booth YOLO. Meh palo santo bespoke mustache everyday carry. Pug everyday carry air plant mumblecore marfa. Organic try-hard meh, vegan fam quinoa brunch fingerstache fashion axe la croix DIY shaman mixtape normcore tote bag.", 1),
    new Song('/assets/Podington_Bear_-_Uptown.mp3', 'Uptown', 'Podington Bear', '/assets/sebastien-gabriel-14599-unsplash.jpg', "2:07", "Health goth cold-pressed fixie yr celiac franzen post-ironic, subway tile etsy affogato viral XOXO keffiyeh synth. Yuccie kitsch authentic messenger bag crucifix pabst mustache gastropub kombucha venmo master cleanse aesthetic taiyaki squid asymmetrical. Distillery art party disrupt hell of cardigan man braid authentic humblebrag you probably haven't heard of them hella. Flexitarian art party asymmetrical, neutra meditation man bun vaporware knausgaard messenger bag selfies authentic ramps bitters. VHS PBR&B raw denim photo booth gochujang.", 2),
    new Song('/assets/Stephan_Siebert_-_07_-_when.mp3', 'when', 'Stephan Siebert', '/assets/yousif-malibiran-181139-unsplash.jpg', "2:41", "Coloring book la croix post-ironic, gentrify kitsch XOXO mlkshk wolf seitan edison bulb PBR&B. Direct trade 8-bit banjo glossier. Paleo semiotics ennui thundercats iceland, ramps +1. Farm-to-table williamsburg intelligentsia viral. Tbh hell of thundercats roof party bushwick four dollar toast synth literally. Four dollar toast humblebrag wayfarers hexagon try-hard crucifix. Chartreuse cronut brunch selvage copper mug 90's put a bird on it raclette glossier.", 3)
]

app.get('/songs', (req, res)=>{
    res.json(songs);
});

app.listen(8080, ()=>{
    console.log("server on 8080");
});