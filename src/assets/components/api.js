const API_HOST = process.env.NODE_ENV === "production" ? "https://api.naxalian.fr/v2" : "http://localhost:8080";

// ACCOUNTS API //

export const userinfo = () => new Promise((resolve, reject) => {

    if (!localStorage.getItem("token")) return reject("No token found");

    fetch(API_HOST + "/accounts/@me", {
        method: "GET",
        headers: { "Authorization": localStorage.getItem("token") }
    }).then((res) => {
        if (res.status === 200) res.json().then((res) => resolve(res.data)).catch((error) => reject(error));
        else res.json().then((res) => reject(res.message)).catch((error) => reject(error));
    }).catch((error) => {
        if (error === "Invalid token" && localStorage.getItem("token")) localStorage.removeItem("token");
        reject(error)
    });
});