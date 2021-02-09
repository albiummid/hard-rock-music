const searchSong = async() =>{
    const searchText = document.getElementById('search-field').value;
    const res = await fetch(`https://api.lyrics.ovh/suggest/${searchText}`);
    const data = await res.json();
    displaySongs(data.data);
}

// by .then
// fetch(`https://api.lyrics.ovh/suggest/${searchText}`)
// // load data
// .then(res => res.json())
// .then(data => displaySongs(data.data))
// }

const displaySongs = songs => {
    const songContainer = document.getElementById('song-container');
    songContainer.innerHTML = '';

    songs.forEach(song => {
        const songDiv = document.createElement("div");
        songDiv.className = "single-result row align-items-center my-3 p-3"
         songDiv.innerHTML = `
          <div class="col-md-9">
          <img src="${song.album.cover_medium}" class = "w-25">
         <h3 class="lyrics-name">${song.title}</h3>
         <p class="author lead">Album by <span>${song.artist.name}</span></p>
         <audio controls>
  <source src="${song.preview}" type="audio/mpeg">
</audio>
     </div>
     <div class="col-md-3 text-md-right text-center">
         <button onclick = "getLyric('${song.artist.name}','${song.title}')" class="btn btn-success">Get Lyrics</button>
     </div>`
         songContainer.appendChild(songDiv);
    });

}

const getLyric = async(artist, title) => {
const res = await fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`);
const data = await res.json();
displayLyrics(data.lyrics);
}

// by .then
// fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`)
// .then(res => res.json())
// .then(data => displayLyrics(data.lyrics))
// }

const displayLyrics = lyrics => {
    const lyricDiv = document.getElementById("song-lyrics");
    lyricDiv.innerText = lyrics;
}