import { MockResourceConfig } from "./MockResourceConfig";
import { ConfigFile } from "./ConfigFile";
import { GlobalConfig } from "./GlobalConfig";
import {MockResourceFileBuilder} from "./MockResourceFileBuilder";
let Client = require('node-rest-client').Client;
import * as fs from 'fs';
import * as mkdirp from 'mkdirp';

export class App{
    private client:any;
    private configFiles:Array<ConfigFile>;
    private configFilesLength:number;
    private globalConfig:GlobalConfig;
 
    constructor(client:any){
        this.client = client;
    }

    setData(globalConfig:GlobalConfig){
        this.globalConfig = globalConfig;
    }


    generate(){
        this.configFiles = this.wrapperConfigFiles(this.globalConfig);
        this.configFilesLength =  this.configFiles.length
        for(let configFile of this.configFiles){
            this.runApi(configFile);
        }
    }
    private wrapperConfigFiles(globalConfig:GlobalConfig):Array<ConfigFile>{
        var configFiles = new Array<ConfigFile>();
        for(let config of globalConfig.mockResourcesConfigs){
            configFiles.push(new ConfigFile(config,globalConfig));
        }
        return configFiles;
    }

    private runApi(configFile:ConfigFile){
        let context = this;
        if(configFile.isGET()){
            this.client.get(configFile.getUrlApi(), configFile.getArgs(),response);
        }else if(configFile.isPOST()){
            this.client.post(configFile.getUrlApi(), configFile.getArgs(),response);
        }

        function response(data:any, response:any){
            configFile.setDataResponse(data);
            context.configFilesLength--;
            if(context.configFilesLength===0){
                context.writeFiles();
            }
        }
    }

    private writeFiles(){
        this.writeConfigFiles();
        this.writeMockResource();
    }

    private writeConfigFiles(){
        for(let configFile of this.configFiles){
            mkdirp.sync(configFile.getMockFileDirectory());
            this.writeFileJson(configFile.getMockFilePath(), configFile.getMockFileJson());
        }
    }

    private writeMockResource(){
        var mockResourceFileBuilder = new MockResourceFileBuilder(this.configFiles);
        this.writeFileJson('mockResource.json', mockResourceFileBuilder.getMockResourceJson());
    }

    private writeFileJson(filename:string,json:any){
        fs.writeFileSync(filename,JSON.stringify(json,null,4) );
    }
}