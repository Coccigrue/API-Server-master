const path = require('path');
const fs = require('fs');
module.exports =
    class MathsController extends require('./Controller') {
        constructor(HttpContext) {
            super(HttpContext);
        }
        get() {
            if (this.HttpContext.path.queryString == '?') {
                // Send helpPage
                let helpPagePath = path.join(process.cwd(), "wwwroot/helpPages/mathsServiceHelp.html");
                let content = fs.readFileSync(helpPagePath);
                this.HttpContext.response.content("text/html", content);
            }
            else {
                
                if (this.HttpContext.path.params.op) {
                    let x = this.HttpContext.path.params.x;
                    let y = this.HttpContext.path.params.y;
                    let n = this.HttpContext.path.params.n;
                    if(Object.keys(this.HttpContext.path.params).length > 3)
                    {
                        this.HttpContext.path.params.error = "too much arguments";
                        this.HttpContext.response.JSON(this.HttpContext.path.params);
                    }
                    else
                    {
                        switch (this.HttpContext.path.params.op) {
                            case ' ':
                              
                                if(isNaN(x) || isNaN(y))
                                {
                                    this.HttpContext.path.params.error = "parameter 'x' or 'y' is missing";
                                    this.HttpContext.response.JSON(this.HttpContext.path.params);
                                }
                                else
                                {
                                    x = parseInt(x)
                                    y = parseInt(y)
                                    this.HttpContext.path.params.op = '+';
                                    let somme = x + y;
                                    somme = somme.toString()
                                    this.HttpContext.path.params.value = somme;
                                    this.HttpContext.response.JSON(this.HttpContext.path.params);
                                   
                                }
                               break;
    
                            case '-':
                                if(isNaN(x) || isNaN(y))
                                {
                                    this.HttpContext.path.params.error = "parameter 'x' or 'y' is missing";
                                    this.HttpContext.response.JSON(this.HttpContext.path.params);
                                }
                                else{
                                    x = parseInt(x);
                                    y = parseInt(y);
                                    let soustraction = x - y;
                                    soustraction = soustraction.toString()
                                    this.HttpContext.path.params.value = soustraction;
                                    this.HttpContext.response.JSON(this.HttpContext.path.params);
                                }
                              
                                break;
    
                            case '*':
                                if(isNaN(x) || isNaN(y))
                                {
                                    this.HttpContext.path.params.error = "parameter 'x' or 'y' is missing";
                                    this.HttpContext.response.JSON(this.HttpContext.path.params);
                                }
                                else
                                {
                                    x = parseInt(x);
                                    y = parseInt(y);
                                    let multiplication = x * y;
                                    multiplication = multiplication.toString()
                                    this.HttpContext.path.params.value = multiplication;
                                    this.HttpContext.response.JSON(this.HttpContext.path.params);
                                    break;
                                }
                                break;
                               
    
    
                            case '/':
                                if(isNaN(x) || isNaN(y))
                                {
                                    this.HttpContext.path.params.error = "parameter 'x' or 'y' is missing";
                                    this.HttpContext.response.JSON(this.HttpContext.path.params);
                                }
                                else
                                {
                                    x = parseInt(x);
                                    y = parseInt(y);
                                    let division = x / y;
                                    division = division.toString()
                                    this.HttpContext.path.params.value = division;
                                    this.HttpContext.response.JSON(this.HttpContext.path.params);
                                }
                               
                                break;
    
    
                            case '%':
                                if(isNaN(x) || isNaN(y))
                                {
                                    this.HttpContext.path.params.error = "parameter 'x' or 'y' is missing";
                                    this.HttpContext.response.JSON(this.HttpContext.path.params);
                                }
                                else
                                {
                                    x = parseInt(x);
                                    y = parseInt(y);
                                    let modulo = x % y;
                                    modulo = modulo.toString()
                                    this.HttpContext.path.params.value = modulo;
                                    this.HttpContext.response.JSON(this.HttpContext.path.params);
                                }
                              
                                break;
    
                            case '!':
                                if(Object.keys(this.HttpContext.path.params).length > 2)
                                {
                                    this.HttpContext.path.params.error = "too much arguments";
                                    this.HttpContext.response.JSON(this.HttpContext.path.params);
                                }
                                else if (n < 0)
                                {
                                    
                                    this.HttpContext.path.params.error = "please use a n number";
                                    this.HttpContext.response.JSON(this.HttpContext.path.params);
                                }
                                else
                                {
                                    n = parseInt(n);
                                    let resultat = factorial(n);
                                    this.HttpContext.path.params.value = resultat;
                                    this.HttpContext.response.JSON(this.HttpContext.path.params);
                                }
                              
                                break;
                                
    
                            case 'p':
                                if(Object.keys(this.HttpContext.path.params).length > 2)
                                {
                                    this.HttpContext.path.params.error = "too much arguments";
                                    this.HttpContext.response.JSON(this.HttpContext.path.params);
                                }
                                else
                                {
                                    n = parseInt(n);
                                    let resultat = isPrime(n);
                                    this.HttpContext.path.params.value = resultat;
                                    this.HttpContext.response.JSON(this.HttpContext.path.params);
                                }
                              
                                break;
    
                            case 'np':
                                if(Object.keys(this.HttpContext.path.params).length > 2)
                                {
                                    this.HttpContext.path.params.error = "too much arguments";
                                    this.HttpContext.response.JSON(this.HttpContext.path.params);
                                }
                                else
                                {
                                    n = parseInt(n);
                                    resultat = findPrime(n)
                                    this.HttpContext.path.params.value = resultat;
                                    this.HttpContext.response.JSON(this.HttpContext.path.params);
                                }
                              
                                break;

                            default:
                                this.HttpContext.path.params.error = "this operation dont exist";
                                this.HttpContext.response.JSON(this.HttpContext.path.params);
                                break;
                        }
                    }
                   
                }
                else {
                    this.HttpContext.path.params.error = "parameter 'op' is missing";
                    this.HttpContext.response.JSON(this.HttpContext.path.params);
                }
            }
        }
    }

    function factorial(n){
        if(n===0||n===1){
          return 1;
        }
        return n*factorial(n-1);
    }
    function isPrime(value) {
        for(var i = 2; i < value; i++) {
            if(value % i === 0) {
                return false;
            }
        }
        return value > 1;
    }
    function findPrime(n){
        let primeNumer = 0;
        for ( let i=0; i < n; i++){
            primeNumer++;
            while (!isPrime(primeNumer)){
                primeNumer++;
            }
        }
        return primeNumer;
    }