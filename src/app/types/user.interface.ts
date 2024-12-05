export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  geminiAPIkey?: string;
}

export interface userRequest {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  geminiAPIkey?: string;
}
