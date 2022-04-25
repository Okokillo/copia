/*
	A função recebe um titulo de filme, serie ou anime como argumento e retorna
	informações sobre o mesmo se essas informações existirem na API utilizada.
*/
function getMovieInfosOMDB(title){

	// Pega o titulo e insere na URL para realizar a requisição
    const url = `http://www.omdbapi.com/?t=${title}&apikey=790af7bc`
    /* 
        é necessário que a instancia dessa tag seja visível em todo escopo da função.
        o "queryselector" pega uma tag do html e a partir disso, consegue mudar tudo da tag no JS.
    */
        let descriptionBody = document.querySelector("#descriptionBody")     
	
    fetch(url) // Realiza a requisição
	.then(response => response.json()) // Retorna as informações do servidor no formato chave/valor
	.then(data => {

/* 
	Caso o título não seja localizado na API, aparecerá as seguintes informações:
	Caso contrário (caso o título seja "localizado" na API), as inforamçoes substituem os id's
	do arquivo html, mostrando as informações do filme no lugar.
	Por exemplo: "movieYear" é o ID e esse ID será substituído pelo ano do filme. 
*/
        if(data.Response == 'False'){
            descriptionBodyNotFound.textContent = "Filme não encontrado! Tente novamente.";

			// Isso aqui faz a informação do "Filme não encontrado!" ter uma certa distância do nome
			// "Título do filme"
            descriptionBodyNotFound.style.marginBottom = '30px'
			
			// url da imagem que aparecerá caso o filme não seja encontrado na API.
            moviePoster.style.backgroundImage = `url(filmeNaoEncontrado.png)`
            descriptionBody.style.display = "none"

        } else {
            descriptionBodyNotFound.textContent = "";
            
            movieTitle.textContent = data.Title
            movieYear.textContent = data.Year
            movieGenre.textContent = data.Genre
            movieRuntime.textContent = data.Runtime
            imdbRating.textContent = data.imdbRating
            movieInfo.textContent = data.Plot
            movieWriter.textContent = data.Writer
            movieDirector.textContent = data.Director

			/* 
			Caso o filme seja encontrado, aparecerá a imagem que está "cadastrada" como 
			pôster do filme
			*/
            moviePoster.style.backgroundImage = `url(${data.Poster})`
        }
        
        
     })  
}

/* 
aqui é adicionado um evento pra toda vez que pressionar o botão de pesquisar, ser colocada as informações
na tela. Basicamente, sem isso o site não mostra os filmes.
*/
var form = document.getElementById('formSearch');
var title = document.getElementById('title');

form.addEventListener('submit', function(e) {
    
    getMovieInfosOMDB(title.value)
    // impede o envio do form
    e.preventDefault();
});