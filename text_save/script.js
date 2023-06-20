const textarea = document.querySelector("textarea"),
fileNameInput = document.querySelector(".file-name input"),
selectMenu = document.querySelector(".save-as select"),
saveBtn = document.querySelector(".save-btn");


selectMenu.addEventListener("change", () => {
    // Obtendo o texto da opção selecionada 
    let selectedOption = selectMenu.options[selectMenu.selectedIndex].text;
    saveBtn.innerText = `Salvar como arquivo de ${selectedOption.split(" ")[0]}`;
});
saveBtn.addEventListener("click", () => {
    const blob = new Blob([textarea.value], {type: selectMenu.value});
    // URL.createObjectURL cria uma URL que representa o objeto passado
    const fileUrl = URL.createObjectURL(blob);
    console.log(fileUrl);
    const link = document.createElement("a"); // Criando uma tag <a>
    link.download = fileNameInput.value; // passando o nome de arquivo como de download do link
    link.href = fileUrl; // passando URL do arquivo como valor de referência do link
    link.click(); // Clicando no link para baixar o arquivo
});