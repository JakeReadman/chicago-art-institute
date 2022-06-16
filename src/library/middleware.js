import _axios from 'axios';

const userRequestClient = _axios.create({
    baseURL: 'https://api.artic.edu/api',
});

const buildEndpoint = (endpoint, operation = null) => {
    return operation === null ? endpoint : `${endpoint}/${operation}`;
};

export const getRequest = async ({ endpoint, params, onSuccess, onError }) => {
    try {
        let res = await _axios.get(`https://api.artic.edu/api${endpoint}`, { params: params });
        onSuccess(res);
    } catch (error) {
        onError(error);
    }
};

export const postRequest = ({ operation = null, endpoint, data, callback, errorCallback = false }) => {
    userRequestClient
        .post(buildEndpoint(endpoint, operation), data)
        .then((response) => {
            callback(response.data);
        })
        .catch((error) => {
            if (errorCallback) {
                errorCallback(error);
            }
        });
};
