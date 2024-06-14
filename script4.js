/* Esercizio Biblioteca (Video e Audio in futuro) -> audio è download
Classe libro
    titolo
    autore
    codiceId
    disponibile

Romanzo:
    genere

Saggi:
    argomento

Manuali:
    categoria
    edizione

Audio:
    formato
    download (prestito)
    non altera disponibilità
    tenere conto dei download

Video:
    frame rate
    download (prestito)
    non altera disponibilità
    tenere conto dei download

Metodo che visualizza i dettagli
Metodo per prestito
Metodo per restituzione
*/

class Author {
    #name;
    #surname;

    constructor(name,surname) {
        this.#name = name;
        this.#surname = surname;
    }

    get name() {
        return this.#name;
    }

    set name(name) {
        this.#name = name;
    }

    get surname() {
        return this.#surname;
    }

    set surname(surname) {
        this.#surname = surname;
    }
}

class Book {
    #idCode;
    title;
    author;
    availability = true;

    constructor(idCode,title,author) {
        this.#idCode = idCode;
        this.title = title;
        this.author = author;
    }
    
    get idCode() {
        return this.#idCode;
    }

    set idCode(idCode) {
        this.#idCode = idCode;
    }

    seeBookDetails() {
        let details = `Dettagli libro:\n
        Codice: ${this.idCode}\n
        Titolo: ${this.title}\n
        Autore: ${this.author.name} ${this.author.surname}\n
        Disponibilità: ${this.availability}\n`;
        console.log(details);
    }

    loanBook() {
        if(this.availability){
            this.availability = false;   
            console.log("Operazione completata");
        } else {
            console.log("Libro già in prestito");
        }
    }

    returnBook(){
        if(!this.availability){
            this.availability = true;   
            console.log("Operazione completata");
        } else {
            console.log("Libro già restituito");
        }
    }
}

class Novel extends Book { //Novella
    type;
    constructor(idCode,title,author,type) {
        super(idCode,title,author);
        this.type = type;
    }

    seeBookDetails() {
        let details = `Dettagli libro:\n
        Codice: ${this.idCode}\n
        Titolo: ${this.title}\n
        Autore: ${this.author.name} ${this.author.surname}\n
        Disponibilità: ${this.availability}\n
        Genere: ${this.type}`;
        console.log(details);
    }

}

class Essay extends Book { //Saggio
    argument;
    constructor(idCode,title,author,argument) {
        super(idCode,title,author);
        this.argument = argument;
    }

    seeBookDetails() {
        let details = `Dettagli libro:\n
        Codice: ${this.idCode}\n
        Titolo: ${this.title}\n
        Autore: ${this.author.name} ${this.author.surname}\n
        Disponibilità: ${this.availability}\n
        Argomento: ${this.argument}`;
        console.log(details);
    }
}

class Manual extends Book { //Manuale
    category;
    edition;
    constructor(idCode,title,author,category,edition) {
        super(idCode,title,author);
        this.category = category;
        this.edition = edition;
    }

    seeBookDetails() {
        let details = `Dettagli libro:\n
        Codice: ${this.idCode}\n
        Titolo: ${this.title}\n
        Autore: ${this.author.name} ${this.author.surname}\n
        Disponibilità: ${this.availability}\n
        Categoria: ${this.category}\n
        Edizione: ${this.edition}`;
        console.log(details);
    }
}

class AudioBook extends Book {
    format;
    #nDownload = 0;

    constructor(idCode,title,author,format) {
        super(idCode,title,author);
        this.format = format;
    }
    
    get nDownload() {
        return this.#nDownload;
    }

    set nDownload(nDownload) {
        this.#nDownload = nDownload;
    }

    seeBookDetails() {
        let details = `Dettagli audio libro:\n
        Codice: ${this.idCode}\n
        Titolo: ${this.title}\n
        Autore: ${this.author.name} ${this.author.surname}\n
        Formato: ${this.format}\n`;
        console.log(details);
    }

    loanBook() {
        console.log(`Download audio libro: ${this.title} effettuato`);
        this.#nDownload++;
        console.log(`Numero download effettuati per ${this.title} sono: ${this.nDownload}`);
    }
}

class Video {
    idCode;
    title;
    author
    frameRate; //24 fps
    #nDownload = 0;

    constructor(idCode,title,author,frameRate) {
        this.idCode = idCode;
        this.title = title;
        this.author = author;
        this.frameRate = frameRate;
    }

    get nDownload() {
        return this.#nDownload;
    }

    set nDownload(nDownload) {
        this.#nDownload = nDownload;
    }

    seeVideoDetails() {
        let details = `Dettagli audio libro:\n
        Codice: ${this.idCode}\n
        Titolo: ${this.title}\n
        Autore: ${this.author.name} ${this.author.surname}\n
        FPS: ${this.frameRate}\n`;
        console.log(details);
    }

    loanVideo() {
        console.log(`Download video: ${this.title} effettuato`);
        this.#nDownload++;
        console.log(`Numero download effettuati per ${this.title} sono: ${this.nDownload}`);
    }
}

//Creazione autori
const author1 = new Author("NomeAutore1","CognomeAutore1");
const author2 = new Author("NomeAutore2","CognomeAutore2");


const authorAudio1 = new Author("NomeAutoreAudio1","CognomeAutoreAudio1");
const authorVideo1 = new Author("NomeAutoreVideo1","CognomeAutoreVideo1");

//Creazione libri
const book1 = new Book("0001","libro1",author1);
const book2 = new Book("0002","libro2",author2);
const book3 = new Book("0003","libro3",author1);

//Creazione novelle
const novel1 = new Novel("0001","Novel1",author2,"storico");
const novel2 = new Novel("0002","Novel2",author1,"psicologico");

//Creazione saggi
const essay1 = new Essay("0001","Essay1",author1,"architettura");
const essay2 = new Essay("0002","Essay2",author2,"astrologia");

//Creazione manuali
const manual1 = new Manual("0001","Manual1",author1,"meccanica",2010);
const manual2 = new Manual("0002","Manual2",author1,"antropologia",2016);

//Creazione audio
const audioBook1 = new AudioBook("0001","AudioLibro1",authorAudio1,".wav");
const audioBook2 = new AudioBook("0002","AudioLibro2",authorAudio1,".mp3");

//Creazione video
const video1 = new Video("0001","Video1",authorVideo1,"24fps");
const video2 = new Video("0002","Video2",authorVideo1,"22fps");

//Catalogo libri fisici
let arrayBook = [book1,book2,book3,novel1,novel2,manual1,manual2];

//Catalogo libri digitali
let arrayDigitalBook = [audioBook1,audioBook2];

//Catalogo video
let arrayVideo = [video1,video2];

//dettagli di tutti i libri fisici
console.log("Libri fisici");
arrayBook.forEach(element => {
    element.seeBookDetails();
});

//dettagli di tutti i libri digitali
console.log("Libri digitali");
arrayDigitalBook.forEach(element => {
    element.seeBookDetails();
});

//dettagli di tutti i video
console.log("Video");
arrayVideo.forEach(element => {
    element.seeVideoDetails();
})


//download audio e video
audioBook1.loanBook();
audioBook2.loanBook();
audioBook1.loanBook();

audioBook1.loanBook();


video1.loanVideo();
video2.loanVideo();
video2.loanVideo();

// //Faccio prestito libri fisici
// book1.loanBook();
// book1.seeBookDetails();


// //Restituisco libri fisici
// book1.returnBook();
// book1.seeBookDetails();

