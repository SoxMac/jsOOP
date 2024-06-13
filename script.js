class Persona {
    //attributi o proprietà
    //# => serve per rendere privato
    name;
    surname;
    isAlive = true; 

    //costruttore
    //assegna ad ogni proprietà della classe un valore specifico dell'oggetto
    constructor (name, surname) {
        this.name = name;
        this.surname = surname; 
    };

    //metodi
    presentation() { //parametri o argomenti
        console.log(`Ciao! Sono ${this.name} ${this.surname}`); 
        if(this.isAlive) {
            console.log(`Ciao! Sono vivo`);
        } else {
            console.log(`Ciao! Sono morto`);
        }
    };
}

//creo OGGETTO, è un'istanza della classe
let persona1 = new Persona("Marcos", "Lupini");
//altro modo per creare OGGETTO
let persona2 = new Persona();
persona2.name = "Marcos2";
persona2.surname = "Lupini2";

persona1.presentation();

//Ereditarietà (Inheritance)
//--> Professore "figlio" di Persona
//--> Persona è la super class di Professore
//--> Professore è la subclass di Persona 
class Professor extends Persona {
    subjectTaught;

    constructor(name,surname,subjectTaught) {
        super(name,surname);
        this.subjectTaught = subjectTaught;
    }

    presentation() {
        super.presentation();
        console.log("Buongiorno, mi chiamo " + this.name + " " + this.surname);
        console.log("Insegno " + this.subjectTaught);
        this.assignGrades();
    }

    assignGrades () {
        console.log("Ho corretto le verifiche di " + this.subjectTaught);
    }

}

let professor1 = new Professor("Prof1","Prof","Italiano");

professor1.presentation();

//Ereditarietà (Inheritance)
//--> Studente "figlio" di Persona
//--> Persona è la super class di Studente
//--> Studente è la subclass di Persona 
class Studente extends Persona { 
    course;
    serialNumber;

    constructor(name,surname,course, serialNumber) {
        super(name,surname); //super -> richiama in automatico il metodo "constructor" della classe padre
        this.course = course;
        this.serialNumber = serialNumber;
    };

    //override di "presentation"
    //L'override di un metodo sostituisce il codice del metodo nella superclasse con quello della sottoclasse.
    //utilizzando "super" si prendono le istruzioni del metodo padre + quelle del figlio, senza "super" si prendono solo le istruzioni del figlio
    //Se non viene fatto override figlio prende metodo del padre
    presentation() {
        super.presentation();
        console.log("Frequento il corso " + this.course);
    }

    takeExam(schoolSubject) {
        console.log("Oggi devo fare l'esame di: " + schoolSubject);
    };
}

let studente1 = new Studente("Marcosss","Lupiniiiii","5A","0001");

studente1.presentation();
studente1.takeExam("Italiano");


class Assistant extends Studente {
    assistance;

    constructor(name,surname,course,serialNumber,assistance) {
        super(name,surname,course,serialNumber);
        this.assistance = assistance;
    }

    assignGrades () {
        console.log("Ho corretto le verifiche di " + this.course);
    }
}

let assistance1 = new Assistant("Assist1","Assist","Italiano","0001", professor1);
assistance1.presentation();
assistance1.takeExam("Italiano");

