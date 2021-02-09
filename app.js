const searchSong = async () => {
    const searchText = document.getElementById('search-field').value;
    try {
        const url = `https://api.lyrics.ovh/suggest/${searchText}`
        const res = await fetch(url);
        const data = await res.json();
        displaySongs(data.data);
    }
    catch(error){
        displayError("Something went wrong! Please try again letter!");
        document.getElementById("lyrics").style.display = "none";
        document.getElementById("song-container").innerHTML = "";
    }
    
}

// -----.then--------
// const searchSong = async() =>{
// const searchText = document.getElementById('search-field').value;
// fetch(`https://api.lyrics.ovh/suggest/${searchText}`)
// .then(res => res.json())
// .then(data => displaySongs(data.data))
// .catch(error => displayError("Something went wrong! Please try again letter!"))
// }

const displaySongs = songs => {
    const songContainer = document.getElementById('song-container');
    songContainer.innerHTML = '';
    document.getElementById("lyrics").style.display = "none";
    document.getElementById("errorTag").innerText = '';

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

const getLyric = async (artist, title) => {
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`
    const res = await fetch(url);
    const data = await res.json();
    displayLyrics(data.lyrics);
}


// ---------.then----------
// const getLyric = async(artist, title) => {
// fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`)
// .then(res => res.json())
// .then(data => displayLyrics(data.lyrics))
// }

const displayLyrics = lyrics => {
    const lyricsAria = document.getElementById("lyrics");
    lyricsAria.value = lyrics;
    lyricsAria.style.display = "block"
    console.log(lyrics);
}

const displayError = error => {
    const errorTag = document.getElementById("errorTag");
    errorTag.innerText = error;
}