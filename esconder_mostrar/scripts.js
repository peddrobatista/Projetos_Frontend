var btn = document.querySelector('#show-or-hide')
var conteiner_text = document.querySelector('.conteiner-text')
btn.addEventListener('click', function() {
    if(conteiner_text.style.display === 'block') {
        conteiner_text.style.display = 'none'
    } else {
        conteiner_text.style.display = 'block'
    }
})