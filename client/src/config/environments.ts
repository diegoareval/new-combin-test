type EnvironmentApp = "development" | "production" | "test";

type EnvironmentConfig = {
  baseUrl: string;
};

export const currentEnvironment: EnvironmentApp = process.env.NODE_ENV;

export const environments = {
  development: {
    baseUrl: "http://localhost:8081",
  } as EnvironmentConfig,
  production: {
    baseUrl: "http://localhost:8081",
  } as EnvironmentConfig,
  test: {
    baseUrl: "http://localhost:8081",
  } as EnvironmentConfig,
};

export const BASE_URL_SERVER = environments[currentEnvironment].baseUrl;

export const CURRENT_VERSION_APP = "1.0.0";
