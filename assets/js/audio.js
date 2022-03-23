
const audio = new Audio('../assets/sounds/beijinho.mp3')

document.getElementById('logo').addEventListener('click', () => {
    
    if(audio.played.length > 0) {
        audio.currentTime = 0.2
    } else {
        audio.play()
    }

})