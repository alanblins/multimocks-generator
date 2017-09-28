## multimocks-generator

Read API and save the responses into multimocks format file with mockResourse.json.
### Instalation
```
npm install
npm install -g typescript
tsc -p src/
```
### Running
Create MultimocksConfigFile.js file containing information of the API and the folders then run by typing:
```sh
node src/index.js
```
Then a folder containg all json files and mockResources.json will be created on the same folder.
Sample of MultimocksConfigFile.js
```js
module.exports = function (app) {
	app.setData({
		"api": {
			"endPoint": "https://real_server",
			"mockEndPoint": "https://mockserver"
		},
		"mockConfig": {
			"dir": "folderJson/",
			"scenario": "scenario1"
		},
		"mockResourcesConfigs": [
			{
				"filename": "customers.json",
				"api": {
					"resource": "/api/v1/customers/"
				},
				"content": {
					"httpMethod": "GET",
					"statusCode": 200
				}
			},
			{
				"filename": "products.json",
				"api": {
					"resource": "/api/v1/products/"
				},
				"content": {
					"httpMethod": "GET",
					"statusCode": 200
				}
			}
		]
	});
};
```