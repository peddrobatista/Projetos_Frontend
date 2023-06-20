const fromText = document.querySelector(".from-text"),
toText = document.querySelector(".to-text"),
selectTag = document.querySelectorAll("select"),
exchangeIcon = document.querySelector(".exchange"),
translateBtn = document.querySelector("button"),
icons = document.querySelectorAll(".row i");

selectTag.forEach((tag, id) => {
    for (const country_code in countries) {
        // Selecionando Português por padrão e Hindi por padrão
        let selected;
        if (id == 0 && country_code == "pt-BR") {
            selected = "selected";
        } else if ( id == 1 && country_code == "hi-IN") {
            selected = "selected";
        }
        let option = `<option value="${country_code}"${selected}>${countries[country_code]}</option>`;
        tag.insertAdjacentHTML("beforeend", option); // Adicionando a tag de opção dentre da tag de seleção
    }
});

exchangeIcon.addEventListener("click", () => {
    // trocar textarea e selecionar valores de tag
    let tempText = fromText.value,
    tempLang = selectTag[0].value;
    fromText.value = toText.value;
    selectTag[0].value = selectTag[1].value;
    toText.value = tempText;
    selectTag[1].value = tempLang;
});
translateBtn.addEventListener("click", () => {
    let text = fromText.value,
    translateFrom = selectTag[0].value, // Pega o valor da tag fromSelect
    translateTo = selectTag[1].value; //  Pega o valor da tag fromTo
    let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
    // buscando a resposta da API e retornando-a com a análise em obj js
    // e em outro método, recebendo esse obj
    fetch(apiUrl).then(res => res.json()).then(data => {
        console.log(data);
        toText.value = data.responseData.translatedText;
    })
})

icons.forEach(icon => {
    icon.addEventListener("click", ({target}) => {
        if (target.classList.contains("fa-copy")) {
            // se o ícone clicado for do id, copie o valor da área de texto, caso contrário, copie o valor para área de texto
            if (target.id == "from") {
                navigator.clipboard.writeText(fromText.value);
            } else {
               navigator.clipboard.writeText(toText.value);
            }
        } else {
            let utterance;
            // se o ícone clicado for do id, fale o valor da área de texto, caso contrário, fale o valor para área de texto
            if (target.id == "from") {
                utterance = new SpeechSynthesisUtterance(fromText.value);
                utterance.lang = selectTag[0].value; // definindo o idioma do enunciado para selecionar o valor da tag
            } else {
                utterance = new SpeechSynthesisUtterance(toText.value);
                utterance.lang = selectTag[1].value; // definindo o idioma do enunciado para selecionar o valor da tag
            }
            SpeechSynthesis.speak(utterance); // Fala o enunciado passado
        }
    });
});