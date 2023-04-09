export class Config{

    static serverUrl;

    static _initialize(){
        if(process.env.NODE_ENV === "production"){
            Config.serverUrl="https://itay-todo.herokuapp.com/api";
        }

        else{
            Config.serverUrl="http://localhost:3000/api";
        }
    }
}

Config._initialize();