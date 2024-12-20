import axios from "axios";
import { Buffer } from "buffer";
export const urlBase = "https://apicrm.repuestosangel.net/public/api/";
export const urlBaseAsset = "https://apicrm.repuestosangel.net/public/";
export const http = () => {
	let token = "";
	if (localStorage.getItem("token") != null) {
		token = Buffer.from(localStorage.getItem("token"), "base64").toString(
			"ascii"
		);
	}

	const interceptor = axios.create({
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		timeout: 15000,
	});
	interceptor.interceptors.response.use(
		function (response) {
			return response;
		},
		function (error) {
			if (error.response.status == 401) {
				localStorage.clear();
				window.location.href = "/login";
			}
			return Promise.reject(error);
		}
	);
	return interceptor;
};
export const httpAsset = () => {
	let token = "";
	if (localStorage.getItem("token") != null) {
		token = Buffer.from(localStorage.getItem("token"), "base64").toString(
			"ascii"
		);
	}
	const interceptor = axios.create({
		headers: {
			Accept: "application/json",
			"Content-Type": "multipart/form-data",
			Authorization: `Bearer ${token}`,
		},
		timeout: 15000,
	});
	interceptor.interceptors.response.use(
		function (response) {
			return response;
		},
		function (error) {
			if (error.response.status == 401) {
				localStorage.clear();
				window.location.href = "/login";
			}
			return Promise.reject(error);
		}
	);
	return interceptor;
};

export const httpNotToken = () => {
	const interceptor = axios.create({
		timeout: 15000,
	});
	interceptor.interceptors.response.use(
		function (response) {
			return response;
		},
		
	);
	return interceptor;
};



export const httpDownload = () => {
    let token = "";
    if (localStorage.getItem("token") != null) {
        token = Buffer.from(localStorage.getItem("token"), "base64").toString("ascii");
    }

    const interceptor = axios.create({
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        responseType: 'blob', // Configura el tipo de respuesta para descargar blobs
        timeout: 15000,
    });

    interceptor.interceptors.response.use(
        function (response) {
            return response;
        },
        function (error) {
            if (error.response && error.response.status === 401) {
                localStorage.clear();
                window.location.href = "/login";
            }
            return Promise.reject(error);
        }
    );

    return interceptor;
};
