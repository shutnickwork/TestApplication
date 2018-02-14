import RNFetchBlob, {FetchBlobResponse} from "react-native-fetch-blob";
import {IArticle} from "../../types/interfaces";

export class GetDataRequest  {

    getArticles(page: number, pageSize: number): Promise<IResponseArticles> {
        const headers = {
            "Accept": "application/json",
            "Content-Type": "application/json; charset=utf-8",
        };
        const url = `http://api.blog.testing.singree.com/?page=${page}&limit=${pageSize}`;

        return RNFetchBlob
            .fetch("GET", url, headers)
            .then((response: FetchBlobResponse) => {
                const status = response.respInfo.status;
                if (status == 401) {
                    //this.showLogoutError();
                } else if (status == 400) {
                    const error = Error("Validation error") as any;
                    error.Data = response.json();
                    error.Type = "ValidationError";
                    throw error;
                } else if (status < 200 || status >= 300) {
                    throw response.json();
                } else if (status == 204) {
                    return {};
                } else {
                    return response.json();
                }
            });
    }
}

export interface IResponseArticles {
    articles: IArticle[];
}