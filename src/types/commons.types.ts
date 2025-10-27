export type Nullable<T> = T | undefined;

export type Context<T> = {
  params: Promise<T>;
};

export type Session = {
  token: string;
  isLogin: boolean;
};

export type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
  image: string;
};

export type Device = {
  browserName: string;
  browserVersion: string;
  osName: string;
  osVersion: string;
  deviceType: string;
  deviceVendor: string;
  deviceModel: string;
  userAgent: string;
};

export type Options = {
  id: string | number;
  name: string;
};

export type Meta = {
  page: number;
  limit: number;
  getMore: boolean;
};
