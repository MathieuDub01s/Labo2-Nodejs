import queryString from "query-string";
import { operation, errorHandling, resultHandling} from "../mathsOperations.js";

import fs from 'fs';
import path from 'path';
export default class Controller {
    constructor(HttpContext, repository = null) {
        this.HttpContext = HttpContext;
        this.repository = repository;
    }
    
    get() {
        let query = this.HttpContext.path.queryString;
        let parameters = this.HttpContext.path.params;
        
        let errors = errorHandling(parameters);
        if (query == '?') {   //affiche html
            let content = path.join(process.cwd(), wwwroot, "API-Help-Pages/API-Maths-Help.html");
            this.HttpContext.response.HTML(fs.readFileSync(content));
        } else {     //calculs
            this.HttpContext.response.JSON(resultHandling(parameters,operation(parameters.op, parameters.x, parameters.y,parameters.n, errors), errors));
        }
    }
    post(data) {
        this.HttpContext.response.forbidden("Ce service n'est pas supporté");
    }
    put(data) {
        this.HttpContext.response.forbidden("Ce service n'est pas supporté");
    }
    remove(id) {
        this.HttpContext.response.forbidden("Ce service n'est pas supporté");
    }
}
