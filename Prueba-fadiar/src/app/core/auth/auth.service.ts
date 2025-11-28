import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  BehaviorSubject,
  tap,
  throwError,
  Observable,
} from 'rxjs';

// ---- MODELOS SIMPLIFICADOS PARA EL FRONT ----
export interface User {
  id: number;        // id del user en backend
  name: string;
  lastname1: string;
  lastname2: string;
  type: string;      // "Cliente"
  email: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  lastname1: string;
  lastname2: string;
  type: string;
  email: string;
  password: string;
}

export interface VerifyCodeRequest {
  email: string;
  code: string;
}

// ---- MODELOS SEGÚN RESPUESTA REAL DEL BACKEND ----

// user_info.person
interface Person {
  id: number;
  ci: string;
  name: string;
  lastname1: string;
  lastname2: string;
  cellphone1: string;
  cellphone2: string | null;
  address: string;
}

// user_info.user
interface UserEntity {
  id: number;
  username: string;
  password: string;
  referredcode: string;
  registrationid: number | null;
  id_type: number;
  id_person: number;
  img: string | null;
  email: string;
  id_paquete: number | null;
  active: boolean;
}

// user_info.type
interface UserType {
  id: number;
  type: string; // "Cliente"
  category: number;
}

interface BackendUserInfo {
  person: Person;
  user: UserEntity;
  type: UserType;
  access_token: string;
  refresh_token: string;
}

interface CurrencyItem {
  id: number;
  currency: string;
  value: number;
  main: boolean;
  active: boolean;
}

interface Currencys {
  currencys: CurrencyItem[];
  main: CurrencyItem;
}

// Respuesta del /login y (asumimos) de /email_verification
interface LoginApiResponse {
  message: string;
  data: {
    user_info: BackendUserInfo;
    currencys: Currencys;
  };
}

// Respuesta del /refresh-token
interface RefreshApiResponse {
  refresh_token: string;
  access_token: string;
  login_data?: BackendUserInfo;
}

// Estructura de sesión interna en el front
interface AuthSession {
  accessToken: string;
  refreshToken: string;
  user: User;
  currencys?: Currencys | null;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://app.fadiar.com:444/prueba/api';

  private tokenKey = 'auth_access_token';
  private refreshTokenKey = 'auth_refresh_token';
  private userKey = 'auth_user';
  private currencysKey = 'auth_currencys';

  private currentUserSubject = new BehaviorSubject<User | null>(
    this.getStoredUser()
  );
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {}

  // ---- LOGIN ----
  login(payload: LoginRequest) {
    return this.http
      .post<LoginApiResponse>(`${this.apiUrl}/login`, payload)
      .pipe(
        tap((res) => {
          this.handleLoginLikeResponse(res);
        })
      );
  }

  // ---- REGISTRO ----
  // Aquí NO almacenamos sesión: primero el usuario debe verificar el código.
  register(payload: RegisterRequest) {
    return this.http.post<any>(`${this.apiUrl}/register`, payload);
  }

  // ---- VERIFICAR CÓDIGO DE EMAIL ----
  // POST /email_verification { email, code }
  // Asumimos que responde igual que /login (message + data.user_info + data.currencys)
  verifyEmailCode(payload: VerifyCodeRequest) {
    return this.http
      .post<LoginApiResponse>(`${this.apiUrl}/email_verification`, payload)
      .pipe(
        tap((res) => {
          this.handleLoginLikeResponse(res);
        })
      );
  }

  // ---- REFRESH TOKEN ----
  refreshToken(loginData: boolean = true): Observable<RefreshApiResponse> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      return throwError(() => new Error('No hay refresh token'));
    }

    return this.http
      .post<RefreshApiResponse>(`${this.apiUrl}/refresh-token`, {
        refresh_token: refreshToken,
        login_data: loginData,
      })
      .pipe(
        tap((res) => {
          // Si el backend envía login_data, lo usamos; si no, usamos el usuario ya guardado
          const backendInfo: BackendUserInfo | undefined = res.login_data;
          let user: User | null = null;

          if (backendInfo) {
            user = {
              id: backendInfo.user.id,
              name: backendInfo.person.name,
              lastname1: backendInfo.person.lastname1,
              lastname2: backendInfo.person.lastname2,
              type: backendInfo.type.type,
              email: backendInfo.user.email,
            };
          } else {
            user = this.getStoredUser();
          }

          if (!user) {
            // Si no tenemos usuario, solo actualizamos los tokens
            localStorage.setItem(this.tokenKey, res.access_token);
            localStorage.setItem(this.refreshTokenKey, res.refresh_token);
            return;
          }

          const session: AuthSession = {
            accessToken: res.access_token,
            refreshToken: res.refresh_token,
            user,
            currencys: this.getStoredCurrencys(),
          };

          this.storeSession(session);
        })
      );
  }

  // ---- LOGOUT ----
  logout() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.refreshTokenKey);
    localStorage.removeItem(this.userKey);
    localStorage.removeItem(this.currencysKey);
    this.currentUserSubject.next(null);
  }

  // ---- helpers ----
  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(this.refreshTokenKey);
  }

  private storeSession(session: AuthSession) {
    localStorage.setItem(this.tokenKey, session.accessToken);
    localStorage.setItem(this.refreshTokenKey, session.refreshToken);
    localStorage.setItem(this.userKey, JSON.stringify(session.user));
    if (session.currencys) {
      localStorage.setItem(this.currencysKey, JSON.stringify(session.currencys));
    }
    this.currentUserSubject.next(session.user);
  }

  private getStoredUser(): User | null {
    const raw = localStorage.getItem(this.userKey);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as User;
    } catch {
      return null;
    }
  }

  private getStoredCurrencys(): Currencys | null {
    const raw = localStorage.getItem(this.currencysKey);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as Currencys;
    } catch {
      return null;
    }
  }

  // 👇 helper común para respuestas tipo login (/login, /email_verification)
  private handleLoginLikeResponse(res: LoginApiResponse) {
    const info = res.data.user_info;

    const user: User = {
      id: info.user.id,
      name: info.person.name,
      lastname1: info.person.lastname1,
      lastname2: info.person.lastname2,
      type: info.type.type, // "Cliente"
      email: info.user.email,
    };

    const session: AuthSession = {
      accessToken: info.access_token,
      refreshToken: info.refresh_token,
      user,
      currencys: res.data.currencys,
    };

    this.storeSession(session);
  }

  // ---- envío y reenvío de código (si los usas) ----
  sendVerificationCode(email: string) {
    // si tu backend usa otro endpoint solo ajusta la URL
    return this.http.post(`${this.apiUrl}/email_verification`, { email });
  }

  resendVerificationCode(email: string) {
    return this.http.post(`${this.apiUrl}/resend_verification_email`, {
      email,
    });
  }
}
