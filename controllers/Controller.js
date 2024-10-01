import queryString from "query-string";

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
    errorHandling(operator, valueX, valueY){    
        let error =  null;
        if(isNaN(valueX)){
            error = "x parameter is not a number";
        }else if(isNaN(valueY)){
            error = "y parameter is not a number";
        }
        return error;
    }
    get() {
        let query = this.HttpContext.path.queryString;
        let parameters = this.HttpContext.path.params;
        let errors = this.errorHandling(parameters.op,parameters.x,parameters.y);
        if(query == '?'){
            this.HttpContext.response.JSON('wwwroot/404.html');
        }else{
            if(errors == null){
                    this.operation(parameters.op, parameters.x, parameters.y);

            }else{
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
