import {ConfigFile} from "./ConfigFile";
import {MockResourceJson} from "./MockResourceJson";
export class MockResourceFileBuilder{
    private configFiles:Array<ConfigFile>;
    private mockResourceJson:MockResourceJson = new MockResourceJson();
    constructor(configFiles:Array<ConfigFile>){
        this.configFiles = configFiles;
        for(let configFile of this.configFiles){
            this.addConfigFile(configFile);
        }    
    }
    
    addConfigFile(configFile:ConfigFile){
        var scenario = configFile.getScenario();
        var mockFilePath = configFile.getMockFilePath();
        this.mockResourceJson[scenario] = this.mockResourceJson[scenario] || [];
        this.mockResourceJson[scenario].push(mockFilePath);
    }

    getMockResourceJson():MockResourceJson{
        return this.mockResourceJson;
    }
}