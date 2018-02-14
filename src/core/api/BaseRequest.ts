import {UrlHelper} from "../../common/UrlHelper";
import uuid from "uuid";
import * as _ from "lodash";
import Toast from "react-native-simple-toast";

export class BaseRequest {
    static handleError = (error: any): Promise<any> => {
        return Promise.reject(error);
    };

    private emptyResponse: EmptyResponse;

    constructor() {
        this.emptyResponse = new EmptyResponse();
    }

    protected baseurl: string;

    private showLogoutError = _.debounce(() => Toast.show("Ошибка авторизации"), 100);

    protected fetch(url: string, config: Object): Promise<any> {
        let headers = {
            "DeviceId": uuid(),
            "Accept": "application/json",
            "Content-Type": "application/json"
        };

        const userToken = "store.getState().authState.userToken;"; // todo вернуть
        if (userToken) {
            headers = {...headers, "Cookie": `access_token=${userToken}`} as any;
        }

        return fetch(UrlHelper.create(url, this.baseurl), Object.assign({headers: headers}, config))
            .then(response => {
                if (response.status == 401) {
                    this.showLogoutError();
                    //store.dispatch(AuthActionsAsync.logout()); TODO вернуть
                }

                if (response.status == 204) {
                    return this.emptyResponse;
                } else if (!response.status || response.status < 200 || response.status >= 300) {
                    return response.json().then(e => {
                        throw e;
                    }) as Promise<any>;
                }

                return response;
            });
    }

    protected q(params: { [key: string]: string | number | boolean }): string {
        const query = Object.keys(params)
            .filter(k => params[k] != null && params[k] != undefined)
            .map(k => `${k}=${params[k]}`)
            .join("&");

        return query ? `?${query}` : "";
    }
}

class EmptyResponse {
    public json(): any {
        return null;
    }
}