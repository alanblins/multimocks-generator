export class MockResourceConfig{
    
    public filename: string;
    public api: {
					resource:string,
                    payload:any,
                    parameters:{[key:string]:string}
				};         
    public dir:string;
    public scenario:string;
    public content: {
        httpMethod: string,
        statusCode: number,
        transformResponse: Function;
    }
} 