var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class HttpHelperResponse {
}
export class HttpRequestHelper {
    doFormPost(url, formValues, debug = false) {
        return __awaiter(this, void 0, void 0, function* () {
            let httpResponse = new HttpHelperResponse();
            try {
                let payload = "";
                let payloadCounter = 0;
                formValues.forEach((x) => {
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
                const response = yield fetch(url, {
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
                httpResponse.serverResponse = yield response.text();
                httpResponse.success = true;
                if (debug) {
                    console.log('result is: ', JSON.stringify(httpResponse, null, 4));
                }
            }
            catch (error) {
                httpResponse.success = false;
                if (error instanceof Error) {
                    httpResponse.error = error.message;
                    if (debug) {
                        console.log('error message: ', error.message);
                    }
                }
                else {
                    httpResponse.error = error.message;
                    if (debug) {
                        console.log('unexpected error: ', error);
                    }
                    return 'An unexpected error occurred';
                }
            }
            return httpResponse;
        });
    }
    doJSONPost(url, payload, debug = false) {
        return __awaiter(this, void 0, void 0, function* () {
            let httpResponse = new HttpHelperResponse();
            try {
                //const response: Response
                const response = yield fetch(url, {
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
                httpResponse.serverResponse = yield (response.json());
                httpResponse.success = true;
                if (debug) {
                    console.log('result is: ', JSON.stringify(httpResponse, null, 4));
                }
            }
            catch (error) {
                if (error instanceof Error) {
                    httpResponse.error = error.message;
                    if (debug) {
                        console.log('error message: ', error.message);
                    }
                    return error.message;
                }
                else {
                    httpResponse.error = error;
                    if (debug) {
                        console.log('unexpected error: ', error);
                    }
                    return 'An unexpected error occurred';
                }
            }
            return httpResponse;
        });
    }
}
