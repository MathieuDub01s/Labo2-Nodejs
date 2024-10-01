import queryString from "query-string";
import { factorial, isPrime, findPrime } from "../mathUtilities.js";

import fs from 'fs';
import path from 'path';
export default class Controller {
    constructor(HttpContext, repository = null) {
        this.HttpContext = HttpContext;
        this.repository = repository;
    }
    operation(operator, valueX, valueY){    
        let x = parseFloat(valueX);
        let y = parseFloat(valueY);
        let result = null;
        if(operator == ' '){
            result = x + y;
        }else if(operator == '-'){
            result = x - y;
        }else if(operator == '*'){
            result = x * y;
        }else if(operator == '/'){
            result = x / y;
        }else if(operator == '%'){
            result = x%y;
        }
        this.HttpContext.response.JSON(result);
    }
    operationMathUtilities(operator, valueN){
        let result = null;
        if(operator == '!'){
            result = factorial(valueN);
        }else if(operator == 'p'){
            result = isPrime(valueN);
        }else if(operator == 'np'){
            result = findPrime(valueN);
        }
        this.HttpContext.response.JSON(result);
    }
    errorHandling(operator, valueX, valueY, valueN){    
        let error =  null;
        if (operator != '!' || operator != 'p' || operator != 'np') {
            if (isNaN(valueX)) {
                error = "x parameter is not a number";
            } else if (isNaN(valueY)) {
                error = "y parameter is not a number";
            }
        }else {
            if (isNaN(valueN)) {
                error = "n parameter is not a number";
            } 
        }
        return error;
    }
    get() {
        let query = this.HttpContext.path.queryString;
        let parameters = this.HttpContext.path.params;
        let errors = this.errorHandling(parameters.op,parameters.x,parameters.y, parameters.n);
        if(query == '?'){
            let content = path.join(process.cwd(), wwwroot,"API-Help-Pages/API-Maths-Help.html");
            this.HttpContext.response.HTML(fs.readFileSync(content));
        }else{
            if(errors == null || parameters.op == '!' || parameters.op == 'p' || parameters.op == 'np'){
                 this.operationMathUtilities(parameters.op, parameters.n);
            }else if(errors == null){
                this.operation(parameters.op, parameters.x, parameters.y);
            }
            else{
                this.HttpContext.response.JSON(errors);
            }
        }
    }
    post(data) {
        data = this.repository.add(data);
        if (this.repository.model.state.isValid) {
            this.HttpContext.response.created(data);
        } else {
            if (this.repository.model.state.inConflict)
                this.HttpContext.response.conflict(this.repository.model.state.errors);
            else
                this.HttpContext.response.badRequest(this.repository.model.state.errors);
        }
    }
    put(data) {
        if (!isNaN(this.HttpContext.path.id)) {
            this.repository.update(this.HttpContext.path.id, data);
            if (this.repository.model.state.isValid) {
                this.HttpContext.response.ok();
            } else {
                if (this.repository.model.state.notFound) {
                    this.HttpContext.response.notFound(this.repository.model.state.errors);
                } else {
                    if (this.repository.model.state.inConflict)
                        this.HttpContext.response.conflict(this.repository.model.state.errors)
                    else
                        this.HttpContext.response.badRequest(this.repository.model.state.errors);
                }
            }
        } else
            this.HttpContext.response.badRequest("The Id of ressource is not specified in the request url.")
    }
    remove(id) {
        if (!isNaN(this.HttpContext.path.id)) {
            if (this.repository.remove(id))
                this.HttpContext.response.accepted();
            else
                this.HttpContext.response.notFound("Ressource not found.");
        } else
            this.HttpContext.response.badRequest("The Id in the request url is rather not specified or syntactically wrong.");
    }
}
