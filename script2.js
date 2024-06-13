/* Esercizio
Dentro azienda abbiamo dei dirigenti, degli impiegati, degli stagisti
SOLO i dirigenti hanno una sezione che dirigono
SOLO gli impiegati e stagisti hanno un capo

dirigenti e impiegati hanno una tariffa orario
dirigenti hanno un bonus annuale variabile
stagisti hanno un forfait mensile


scrivere un metodo che calcola lo stipendio mensile di impiegati, dirigenti e stagisti
scrivere un metodo che calcola lo stipendio annuale di impiegati, dirigenti e stagisti
*/

class Employee {
    name;
    surname;
    rate;

    constructor (name, surname,rate) {
        this.name = name;
        this.surname = surname;
        this.rate = rate; 
    };

    presentation() {
        console.log(`Ciao! Sono ${this.name} ${this.surname} la mia tariffa orario è ${this.rate}`); 
    };

    annualSalary() {
        //calcolo salario annuale
        let hourlyRate = Number(this.rate) * 8;
        let weeklyRate = Number(hourlyRate) * 5;
        let monthlyRate = Number(weeklyRate) * 4;
        let annualRate = Number(monthlyRate) * 12;
        return annualRate;
    }

    monthlySalary() {
        //calcolo salario mensile
        let hourlyRate = Number(this.rate) * 8;
        let weeklyRate = Number(hourlyRate) * 5;
        let monthlyRate = Number(weeklyRate) * 4;
        return monthlyRate;
    }
}

class Manager extends Employee {
    section;
    bonus;

    constructor(name,surname,rate,section,bonus) {
        super(name,surname,rate);
        this.section = section;
        this.bonus = bonus;
    }
    
    presentation() {
        console.log(`Sono ${this.name} ${this.surname} dirigente della sezione ${this.section}`); 
    };

    annualSalary() {
        let annualNoBonus = super.annualSalary();
        //aggiungo bonus
        let bonus = (Number)(this.bonus);
        let annualbonus = (bonus*annualNoBonus)/100;
        console.log(`Il salario annuale è: ${annualNoBonus + annualbonus}`)
        console.log(`Il mio bonus annuo è: ${annualbonus}`)
    }

    monthlySalary() {
        let monthlySalary = super.monthlySalary();
        console.log(`Il mio salario mensile è: ${monthlySalary}`);
    }
}

class OfficeWorker extends Employee {
    boss;

    constructor (name,surname,rate,boss) {
        super(name,surname,rate);
        this.boss = boss;
    }

    presentation() {
        console.log(`Sono ${this.name} ${this.surname} un impiegato e il mio capo è ${this.boss}`); 
    };

    annualSalary() {
        let annualSalary = super.annualSalary();
        console.log(`Il salario annuale è: ${annualSalary}`)
    }

    monthlySalary() {
        let monthlySalary = super.monthlySalary();
        console.log(`Il mio salario mensile è: ${monthlySalary}`);
    }

}

class Interns extends OfficeWorker {
    forfait;

    constructor(name,surname,boss,forfait) {
        super(name,surname,0,boss);
        this.forfait = forfait;
    }

    presentation() {
        console.log(`Sono ${this.name} ${this.surname} uno stagista e il mio capo è ${this.boss}`); 
    };

    annualSalary(){
       console.log(`Il mio forfettario annuo è: ${(Number)(this.forfait) * 12}`);
    }

    monthlySalary() {
        console.log(`Il mio forfettario mensile è: ${(Number)(this.forfait)}`);
    }
}

let manager1 = new Manager("Manager","Manager1","20","IT","20");
let officeWorker1 = new OfficeWorker("Impiegato","Impiegato1","10",manager1.name);
let interns1 = new Interns("Stagista","Stagista1",officeWorker1.name,"500");

//Stampa la stessa cosa, solo che la prima usa "foreach", la seconda il "for" l'ultima uno per ogni istanza
let dipendenti = [manager1,officeWorker1,interns1];

for(let index = 0; index < dipendenti.length; index++){
    dipendenti[index].presentation();
    dipendenti[index].annualSalary();
    dipendenti[index].monthlySalary();
}

// dipendenti.forEach(element => {
//     element.presentation();
//     element.annualSalary();
//     element.monthlySalary();
// });


// manager
// manager1.presentation();
// manager1.annualSalary();
// manager1.monthlySalary();

// office worker
// officeWorker1.presentation();
// officeWorker1.annualSalary();
// officeWorker1.monthlySalary();

// interns
// interns1.presentation();
// interns1.annualSalary();
// interns1.monthlySalary();





