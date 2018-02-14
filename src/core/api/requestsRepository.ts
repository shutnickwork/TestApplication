import {GetDataRequest} from "./getDataRequest";

class ExtendedRequestRepository {
    getDataRequest = new GetDataRequest();
}

export const requestsRepository = new ExtendedRequestRepository();