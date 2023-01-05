var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class APIRequestResponse {
}
export function doPostRequest(url, payload) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield doBaseRequest('POST', url, payload);
    });
}
export function doPutRequest(url, payload) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield doBaseRequest('PUT', url, payload);
    });
}
function doBaseRequest(verb, url, payload) {
    return __awaiter(this, void 0, void 0, function* () {
        let apiResponse = new APIRequestResponse();
        try {
            const response = yield fetch(url, {
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
            }
            else {
                apiResponse.error = error;
                //console.log('unexpected error: ', error);
            }
            return apiResponse;
        }
    });
}
