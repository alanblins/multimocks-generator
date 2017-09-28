import { MockResourceConfig } from "./MockResourceConfig";
import { GlobalConfig } from "./GlobalConfig";
import { MockFile } from "./MockFile";

export class ConfigFile{
    private mockResourceConfig:MockResourceConfig;
    private data:any;
    private globalConfig:GlobalConfig;
    constructor(mockResourceConfig:MockResourceConfig,globalConfig:GlobalConfig){
        this.mockResourceConfig = mockResourceConfig;
        this.globalConfig = globalConfig;
    }

    isGET():boolean{
        return this.mockResourceConfig.content.httpMethod=='GET';
    }

    isPOST():boolean{
        return this.mockResourceConfig.content.httpMethod=='POST';
    }

    getUrlApi():string{
        return this.globalConfig.api.endPoint+this.mockResourceConfig.api.resource;
    }

    getArgs(){
        let args = {
            parameters: this.globalConfig.api.parameters,
            headers: { "Content-Type": "application/json" },
            data:{}
        };

        if(this.isPOST()){
            args.data = this.mockResourceConfig.api.payload;
        }

        if(this.mockResourceConfig.api.parameters){
            for(var item in this.mockResourceConfig.api.parameters){
                args.parameters[item] = this.mockResourceConfig.api.parameters[item];
            }
        }

        return args;
    }

    setDataResponse(data:any):void{
        if(this.mockResourceConfig.content.transformResponse && typeof this.mockResourceConfig.content.transformResponse === 'function'){
            this.data = this.mockResourceConfig.content.transformResponse(data);
        }
    }

    getMockFileDirectory():string{
        return (this.mockResourceConfig.dir || this.globalConfig.mockConfig.dir);
    }

    getMockFilePath():string{
        return this.getMockFileDirectory()+this.mockResourceConfig.filename;
    };

    getScenario():string{
        return (this.mockResourceConfig.scenario || this.globalConfig.mockConfig.scenario);
    };

    getMockFileJson():MockFile{
        let mockFile = new MockFile();
        mockFile.httpMethod = this.mockResourceConfig.content.httpMethod;
        mockFile.statusCode = this.mockResourceConfig.content.statusCode,
        mockFile.uri = this.globalConfig.api.mockEndPoint+this.mockResourceConfig.api.resource,
        mockFile.response = this.data

        return mockFile;
    };

}

