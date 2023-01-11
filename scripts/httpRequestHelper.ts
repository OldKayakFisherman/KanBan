export class HttpHelperResponse {
    success: boolean;
    serverResponse: string;
    error: string;
}

export class HttpRequestHelper {

    public async doFormPost(url: string, formValues: Array<[string, string]>, debug: boolean = false) {

        let httpResponse: HttpHelperResponse = new HttpHelperResponse();

        try {

            let payload: string = "";
            let payloadCounter: number = 0;

            formValues.forEach((x: [string, string]) => {
                payloadCounter++;

                if (payloadCounter < formValues.length) {
                    payload += `${x[0]}=${x[1]}&`;
                }
                else {
                    payload += `${x[0]}=${x[1]}`;
                }

            });

            if (debug) {
                console.log(`Form Post Payload: ${payload}`);
            }

            //const response: Response
            const response = await fetch(url, {
                method: 'POST',
                body: encodeURI(payload),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    Accept: 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Error! status: ${response.status}`);
            }

            //const result: CreateUserResponse
            httpResponse.serverResponse = await response.text();
            httpResponse.success = true;

            if (debug) {
                console.log('result is: ', JSON.stringify(httpResponse, null, 4));
            }

        } catch (error) {

            httpResponse.success = false;

            if (error instanceof Error) {

                httpResponse.error = error.message;

                if (debug) {
                    console.log('error message: ', error.message);
                }

            } else {

                httpResponse.error = error.message;

                if (debug) {
                    console.log('unexpected error: ', error);
                }
                return 'An unexpected error occurred';
            }

        }

        return httpResponse;
    }

    public async doJSONPost(url: string, payload: object, debug: boolean = false) {

        let httpResponse: HttpHelperResponse = new HttpHelperResponse();

        try {
            //const response: Response
            const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(payload),
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Error! status: ${response.status}`);
            }

            //const result: CreateUserResponse
            httpResponse.serverResponse = await (response.json());
            httpResponse.success = true;

            if (debug) {
                console.log('result is: ', JSON.stringify(httpResponse, null, 4));
            }

        } catch (error) {
            if (error instanceof Error) {

                httpResponse.error = error.message;

                if (debug) {
                    console.log('error message: ', error.message);
                }
                return error.message;
            } else {

                httpResponse.error = error;

                if (debug) {
                    console.log('unexpected error: ', error);
                }
                return 'An unexpected error occurred';
            }
        }

        return httpResponse;
    }
}