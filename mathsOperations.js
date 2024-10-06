import { factorial, isPrime, findPrime } from "mathUtilities.js";
export function operation(operator, valueX, valueY, valueN, errors) {
    let x = parseFloat(valueX);
    let y = parseFloat(valueY);
    let result= "";
    if (errors == null) {
        if (valueN == null) {
            if (operator == ' ') {
                result = x + y;
            } else if (operator == '-') {
                result = x - y;
            } else if (operator == '*') {
                result = x * y;
            } else if (operator == '/') {

                result = x / y;
            } else if (operator == '%') {
                result = x % y;
            }
        } else {
            if (operator == '!') {
                result = factorial(valueN);
            } else if (operator == 'p') {
                result = isPrime(valueN);
            } else if (operator == 'np') {
                result = findPrime(valueN);
            }
        }
    }
    if(isNaN(result) || result == "Infinity" ){
        result = result.toString();
    }
  
    return result;
}

export function errorHandling(parameters) {
    let operator = parameters.op;
    let valueN = parameters.n;
    let valueX = parameters.x;
    let valueY = parameters.y;
    if(!isNaN(parameters.x)){
        valueX = parseFloat(parameters.x);
    }
    if (!isNaN(parameters.y)){
        valueY  = parseFloat(parameters.y);
    }
    if (!isNaN(parameters.n)){
        valueN = parseFloat(parameters.n);
    }
    let paramLength = Object.keys(parameters).length;
    let error = null;
    if(operator == null){
        error = "'op' parameter is missing";
    }else
    if (operator != '!' && operator != 'p' && operator != 'np') {
        if (parameters.x == null) {
            error = "x parameter is missing";
        } else if (parameters.y == null) {
            error = "y parameter is missing";
        } else if(isNaN(valueX)){
            error = "x parameter is not a number";
        } else if(isNaN(valueY)){
            error = "y parameter is not a number";
        } else if (paramLength > 3  ){
            error = "too many parameters";
        }
    } else {
        if (parameters.n ==null){
            error = "n parameter is missing";
        }
        else if (isNaN(valueN) && valueN !=null) {
            error = "n parameter is not a number";
        }else if (valueN <=0 || !Number.isInteger(valueN) ){
            error = "n parameter must be an integer > 0";
        }else if (paramLength > 2){
            error = "too many parameters";
        }
    }
    return error;
}
export function resultHandling(parameters, result, error) {
   
    let obj = {};
    if (parameters.op== " ") {
        parameters.op = "+";
    }
    for (let [key, value] of Object.entries(parameters)) {       
        if(!isNaN(value)){
            value = parseFloat(value);
        }
        obj[key] = value;
    }
    if(error==null){
        obj["value"] = result;
    }else{
        obj["error"] = error;
    }
   
    return obj;
}