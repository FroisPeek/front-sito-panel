import api from "./api";

export async function LoginService({
    username,
    password,
}: {
    username: string;
    password: string;
}) {
    const data = { username: username, password: password };

    try {
        const response = await api.post(`/user/authenticate`, data, {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true
        });

        return response;
    } catch (err) {
        console.log(err);
        return null;
    }
}