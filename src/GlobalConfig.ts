import {MockResourceConfig} from "./MockResourceConfig";
export class GlobalConfig{  
    public api:{endPoint:string,mockEndPoint:string,parameters:{[key:string]:string}};
    public mockConfig:{dir:string,scenario:string};
    public mockResourcesConfigs:Array<MockResourceConfig>;

}