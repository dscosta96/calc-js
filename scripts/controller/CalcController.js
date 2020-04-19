/*
gett e sett - define como acessar valores;
get -> Colocar qualquer regra sempre que alguém chamar;
set -> Mudar o valor do atributo;
Criou atributo? Cria o getter e setter para consultar como deve ser alimentado;
MVC - Model View Controller - Organização entre Dados/Model ; 
O que eu vejo interagindo- View; Regras de Negócio O que deve ou n acntecer- Controller;
tratar os dados da aplicação - Model
exibir as informações em nosso navegador  - View
**/
class CalcController {
    //Chamado automaticamente quando se precisa construir uma classe;
    //uso do underline para privado _;

    constructor() {
            this._operation = [];
            this._locale = 'pt-BR';
            this._displayCalcEl = document.querySelector("#display");
            this._dateEl = document.querySelector("#data");
            this._timeEl = document.querySelector("#hora");
            this._currentDate;
            this.initialize();
            this.initButtonsEvents();
        }
        //- Initialize : Método principal. tudo o que a calculadora aconteça
    initialize() {
            //Inner Propriedade quando acessamos o DOM;
            //Pega o objeto, e coloque uma informação la dentro;
            this.setDisplayDateTime();
            setInterval(() => {
                this.setDisplayDateTime();
            }, 1000);
        }
        //Método para Utilizar mais de um Evento;
    addEventListenerAll(element, events, fn) {
        events.split(' ').forEach(event => {
            element.addEventListener(event, fn, false);
        });
    }

    clearAll() {

        this._operation = [];

    }

    clearEntry() {

        this._operation.pop();

    }
    isOperator(value) {
        //Busca o valor no Array o InedexOf, se achar trás o Index
        //Condicional diretra para T or F
        return (['+', '-', '*', '%', '/'].indexOf(value) > -1);

    }
    setLastOperation(value) {
        this._operation[this._operation.length - 1] = value;
    }
    addOperation(value) {
        if (isNaN(this.getLastOperation())) {
            //String
            if (this.isOperator(value)) {
                //Trocar o operador
                this._operation[this.setLastOperation(value)];
            } else if (isNaN(value)) {

                //Outra coisa;
                console.log(value);
            } else {
                //Primeira vez que está colocando;
                this._operation.push(vlaue);
            }
        } else {
            //Number , concatena;
            let newValue = this.getLastOperation().toString() + value.toString();
            this._operation.push(newValue);

        }
        this._operation.push(value);
        console.log(this._operation);

    }

    getLastOperation() {
        //Retornando a posição do Array; Pega o último;
        return this._operation[this.setLastOperation(value)];

    }

    setError() {

        this.displayCalc = "Error";

    }
    execBtn(value) {

        switch (value) {
            case 'ac':
                this.clearAll();
                break;
            case 'c':
                this.clearEntry();
                break;
            case 'soma':
                this.addOperation(parseInt('+'));
                break;
            case 'subtracao':
                this.addOperation(parseInt('-'));
                break;
            case 'divisao':
                this.addOperation(parseInt('/'));
                break;
            case 'multiplicacao':
                this.addOperation(parseInt('*'));
                break;
            case 'porcento':
                this.addOperation(parseInt('%'));
                break;
            case 'igual':
                this.addOperation(parseInt('='));
                break;
            case 'ponto':
                this.addOperation(parseInt('.'));
                break;
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.addOperation(parseInt(value));
                break;
            default:
                this.setError();
                break;
        }
    }

    //Método para Pegar os botões;
    initButtonsEvents() {
            let buttons = document.querySelectorAll("#buttons > g, #parts > g");
            //Percorrendo para cada botão que encontrar;
            buttons.forEach((btn, index) => {

                this.addEventListenerAll(btn, "click drag", e => {
                    //pegando o nome da classe , e tirando o btn,e substituindo por nada;
                    let textBtn = btn.className.baseVal.replace("btn-", "");
                    this.execBtn(textBtn);
                });

                this.addEventListenerAll(btn, "mouseover mouseup mousedown", e => {
                    btn.style.cursor = "pointer";
                });

            });
        }
        //Setando Data e Hora;
    setDisplayDateTime() {
        this.displayDate = this.currentDate.toLocaleDateString(this._locale, {
            day: "2-digit",
            month: "long",
            year: "numeric"
        });
        this.displayTime = this.currentDate.toLocaleTimeString(this._locale);
    }

    get displayTime() {
        return this._timeEl.innerHTML;
    }

    set displayTime(value) {
        this._timeEl.innerHTML = value;
    }

    get displayDate() {
        return this._dateEl.innerHTML;
    }

    set displayDate(value) {
        this._dateEl.innerHTML = value;
    }

    get displayCalc() {
        return this._displayCalcEl.innerHTML;
    }

    set displayCalc(value) {
        this._displayCalcEl.innerHTML = value;
    }

    get currentDate() {
        return new Date();
    }
    set currentDate(value) {
        this._currentDate = value;
    }
}