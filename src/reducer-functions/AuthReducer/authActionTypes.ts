interface Login {
    type: "LOGIN";
    payload: { userId: string; token: string };
}
interface Logout {
    type: "LOGOUT";
}

export type AuthActionTypes = Login | Logout;
