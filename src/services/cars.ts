import http from "./http";

export const getCars = async (): Promise<any> => {
    const url = `/cars`
    const response = await http.get(url);
    return response.data;
}

export const getCar = async (id: string): Promise<any> => {
    const res = await http.get(`/cars/${id}`);
    return res.data;
}

export const postCar = async (data: any): Promise<any> => {
    const response = await http.post("/cars", data);
    return response.data;
}

export const putCar = async (id: string, data: any): Promise<any> => {
    const response = await http.put(`/cars/${id}`, data);
    return response.data;
}

export const deleteCar = async (id: string): Promise<any> => {
    const response = await http.delete(`/cars/${id}`);
    return response.data;
}