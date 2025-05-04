export interface AuthUser {
  id: number;
  username: string;
  isVip?:boolean,
}
export interface User extends AuthUser {
  password: string;
}

export const apiUrl = "https://fakestoreapi.com/users";