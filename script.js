console.log("Welcome to spotify");

//initialize variable
let songIndex = 0;
let audioElement = new Audio("\\songs\\Let Me Love You ft Justin Bieber.mp3");
let masterPlay = document.getElementById("masterplay");
let mypregressbar = document.getElementById("mypregressbar");
let gif = document.getElementById('gifi');
let bottom = document.getElementById('bottom');
let displayPlaypause = document.getElementById("masterplay");
let songitems = Array.from(document.getElementsByClassName('songlist'));
let time_stamp = Array.from(document.getElementsByClassName('timestamp'));
let songBanner = document.getElementById('the_cover');

let songs =[
    {songName: "Aaj Bhi Official Video", filepath: "\\songs\\Aaj Bhi Official Video.mp3", times:"", coverpath:"\\banner\\Aaj Bhi.jpeg" },
    {songName: "Let Me Love You ft Justin Bieber", filepath: "\\songs\\Let Me Love You ft Justin Bieber.mp3", times:"", coverpath:"\\banner\\Let Me Love You ft Justin Bieber.jpeg"},
    {songName: "Lo Aayi Barsaat", filepath: "\\songs\\Lo Aayi Barsaat.mp3", times:"", coverpath:"\\banner\\Lo Aayi Barsaat.jpeg" },
    {songName: "Toh Phir Aao", filepath: "\\songs\\Toh Phir Aao.mp3", times:"", coverpath:"\\banner\\Toh Phir Aao.jpeg" }
]


//Handle play/ pause music
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused){
        audioElement.play(); 
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        gif.style.opacity = 0;
    }
});


//Handle play/ pause icons
function changeIcons(){
    
    if(displayPlaypause.src.match('playicon.png')){
        displayPlaypause.src = 'pauseicon.png';
    }
    else if(audioElement.played && displayPlaypause.src.match('playicon.png')){
        displayPlaypause.src = 'pauseicon.png';
    }
    else{
        displayPlaypause.src = 'playicon.png';
    }
}

//pregressbar
audioElement.addEventListener('timeupdate', ()=>{
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    mypregressbar.value = progress;

    if(mypregressbar.value==100){
        displayPlaypause.src = 'playicon.png'
    }
})

mypregressbar.addEventListener('change', ()=>{
    audioElement.currentTime = mypregressbar.value * audioElement.duration /100;
})

//songs lists
songitems.forEach((element, i)=>{
    element.getElementsByClassName('songlistplayname')[0].innerText = songs[i].songName;
})

/// songs play from list
let forward_song=0, backward_song=0, current_song, image;
Array.from(document.getElementsByClassName('songlist')).forEach((element, i)=>{
    element.addEventListener('click', ()=>{

        audioElement.src = songs[i].filepath;
        audioElement.currentTime = 0;
        audioElement.play();
        current_song = songs.indexOf(songs[i]);
        document.getElementById('songtitle').innerHTML = songs[i].songName;
        coverimage();

        if(audioElement.played){ //changing icons
            displayPlaypause.src = 'pauseicon.png';
            gif.style.opacity = 1;
            bottom.style.opacity =1;
        }
    })
})



///backward song
document.getElementById('backward').addEventListener('click', ()=>{
    
    if(current_song <= 0){
        current_song = songs.length-1;
        console.log(current_song);
        audioElement.src = songs[current_song].filepath;
        audioElement.currentTime = 0;
        audioElement.play();
        document.getElementById('songtitle').innerHTML = songs[current_song].songName;
        coverimage();
    }
    else{
        backward_song = current_song-1;
        audioElement.src = songs[backward_song].filepath;      
        audioElement.currentTime = 0;
        audioElement.play();
        current_song=songs.indexOf(songs[backward_song]);
        console.log(current_song);
        document.getElementById('songtitle').innerHTML = songs[current_song].songName; 
        coverimage();   
    }

})
///forward song
document.getElementById('forwardicon').addEventListener('click', ()=>{

    if(current_song >= songs.length-1){
        current_song = 0;
        console.log(current_song);
        audioElement.src = songs[current_song].filepath;
        audioElement.currentTime = 0;
        audioElement.play();
        document.getElementById('songtitle').innerHTML = songs[current_song].songName;
        coverimage();
    }
    else{
        forward_song = current_song+1;
        audioElement.src = songs[forward_song].filepath;      
        audioElement.currentTime = 0;
        audioElement.play();
        current_song=songs.indexOf(songs[forward_song]);
        console.log(current_song);
        document.getElementById('songtitle').innerHTML = songs[current_song].songName;
        coverimage();
    }
})

function coverimage(){
    let im = document.querySelector('#the_cover');
    im.setAttribute('src', songs[current_song].coverpath);
}


