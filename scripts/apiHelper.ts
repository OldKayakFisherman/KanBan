




export class APIRequestResponse {
    success: boolean;
    serverResponse: string;
    error: string;
}

export async function doPostRequest(url, payload){
 return await doBaseRequest('POST', url, payload);
}

export async function doPutRequest(url, payload){
  return await doBaseRequest('PUT', url, payload);
}

export async function doDeleteRequest(url){
    return await doBaseRequest("DELETE", url, "");
}

async function doBaseRequest(verb, url, payload){

        let apiResponse: APIRequestResponse = new APIRequestResponse();

         try {
            const response = await fetch(url, {
                method: verb,
                body: JSON.stringify(payload),
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Error! status: ${response.status}`);
            }

            apiResponse.success = true;
            apiResponse.serverResponse = response.statusText;

        }
        catch (error) {

            apiResponse.success = false;

            if (error instanceof Error) {
                apiResponse.error = error.message;
                //console.log('error message: ', error.message);
            } else {
                apiResponse.error = error;
                //console.log('unexpected error: ', error);
            }
        }

        return apiResponse;
}

