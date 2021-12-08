import * as axios from "axios";

export default class Apis {
    init = () => {
        this.client = axios.create({
            baseURL: 'https://61b095283c954f001722a4a6.mockapi.io/',
            timeout: 31000
        });

        return this.client;
    };

    getUser = (data ? ) => {
        if (data) {
            const searchString = this.queryParams(data)
            return this.init().get(`users/?${searchString}`);
        }
        return this.init().get('users');
    };

    postUser = (data) => {
        return this.init().post('users', data);
    }

    updateUser = (data) => {
        return this.init().put(`users/${data.id}`, data);
    };

    deleteUser = (id) => {
        return this.init().delete(`users/${id}`);
    }
    
}