import http from "../http-common";

class ProductDataService {
    getAll(page=0){
        return http.get(`?page=${page}`);
    }
    get(id){
        return http.get(`/id/${id}`);
    }
    find(query, by = "name", page = 0) {
        return http.get(`?${by}=${query}&page=${page}`);
    }
    getBrands(){
        return http.get(`/brands`);
    }
}

export default new ProductDataService();