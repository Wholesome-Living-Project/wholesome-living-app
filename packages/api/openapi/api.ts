/* tslint:disable */
/* eslint-disable */
/**
 * Wholesome Living Backend
 * A backend for Wholesome Living written in Golang backend API using Fiber and MongoDB
 *
 * The version of the OpenAPI document: 0.1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import type { Configuration } from './configuration';
import type { AxiosPromise, AxiosInstance, AxiosRequestConfig } from 'axios';
import globalAxios from 'axios';
// Some imports not used depending on template conditions
// @ts-ignore
import { DUMMY_BASE_URL, assertParamExists, setApiKeyToObject, setBasicAuthToObject, setBearerAuthToObject, setOAuthToObject, setSearchParams, serializeDataIfNeeded, toPathString, createRequestFunction } from './common';
import type { RequestArgs } from './base';
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, BaseAPI, RequiredError } from './base';

/**
 * 
 * @export
 * @interface MeditationMeditationResponse
 */
export interface MeditationMeditationResponse {
    /**
     * 
     * @type {string}
     * @memberof MeditationMeditationResponse
     */
    'meditationId'?: string;
}
/**
 * 
 * @export
 * @interface UserCreateUserRequest
 */
export interface UserCreateUserRequest {
    /**
     * 
     * @type {string}
     * @memberof UserCreateUserRequest
     */
    'dateOfBirth'?: string;
    /**
     * 
     * @type {string}
     * @memberof UserCreateUserRequest
     */
    'email'?: string;
    /**
     * 
     * @type {string}
     * @memberof UserCreateUserRequest
     */
    'firstName'?: string;
    /**
     * 
     * @type {string}
     * @memberof UserCreateUserRequest
     */
    'id'?: string;
    /**
     * 
     * @type {string}
     * @memberof UserCreateUserRequest
     */
    'lastName'?: string;
}
/**
 * 
 * @export
 * @interface UserCreateUserResponse
 */
export interface UserCreateUserResponse {
    /**
     * 
     * @type {string}
     * @memberof UserCreateUserResponse
     */
    'id'?: string;
}
/**
 * 
 * @export
 * @interface UserUserDB
 */
export interface UserUserDB {
    /**
     * 
     * @type {string}
     * @memberof UserUserDB
     */
    'createdAt'?: string;
    /**
     * 
     * @type {string}
     * @memberof UserUserDB
     */
    'dateOfBirth'?: string;
    /**
     * 
     * @type {string}
     * @memberof UserUserDB
     */
    'email'?: string;
    /**
     * 
     * @type {string}
     * @memberof UserUserDB
     */
    'firstName'?: string;
    /**
     * 
     * @type {string}
     * @memberof UserUserDB
     */
    'id'?: string;
    /**
     * 
     * @type {string}
     * @memberof UserUserDB
     */
    'lastName'?: string;
}

/**
 * MeditationApi - axios parameter creator
 * @export
 */
export const MeditationApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * fetch a single meditation session.
         * @summary Get a meditation session
         * @param {string} id Meditation ID
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        meditationIdGet: async (id: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('meditationIdGet', 'id', id)
            const localVarPath = `/meditation/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * MeditationApi - functional programming interface
 * @export
 */
export const MeditationApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = MeditationApiAxiosParamCreator(configuration)
    return {
        /**
         * fetch a single meditation session.
         * @summary Get a meditation session
         * @param {string} id Meditation ID
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async meditationIdGet(id: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<MeditationMeditationResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.meditationIdGet(id, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * MeditationApi - factory interface
 * @export
 */
export const MeditationApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = MeditationApiFp(configuration)
    return {
        /**
         * fetch a single meditation session.
         * @summary Get a meditation session
         * @param {string} id Meditation ID
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        meditationIdGet(id: string, options?: any): AxiosPromise<MeditationMeditationResponse> {
            return localVarFp.meditationIdGet(id, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * MeditationApi - object-oriented interface
 * @export
 * @class MeditationApi
 * @extends {BaseAPI}
 */
export class MeditationApi extends BaseAPI {
    /**
     * fetch a single meditation session.
     * @summary Get a meditation session
     * @param {string} id Meditation ID
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof MeditationApi
     */
    public meditationIdGet(id: string, options?: AxiosRequestConfig) {
        return MeditationApiFp(this.configuration).meditationIdGet(id, options).then((request) => request(this.axios, this.basePath));
    }
}


/**
 * UsersApi - axios parameter creator
 * @export
 */
export const UsersApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * fetch every user available.
         * @summary Get all users.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        usersGet: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/users`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * fetch a user by id.
         * @summary Get a user.
         * @param {string} id User ID
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        usersIdGet: async (id: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('usersIdGet', 'id', id)
            const localVarPath = `/users/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * creates one user.
         * @summary Create one user.
         * @param {UserCreateUserRequest} user User to create
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        usersPost: async (user: UserCreateUserRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'user' is not null or undefined
            assertParamExists('usersPost', 'user', user)
            const localVarPath = `/users`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(user, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * UsersApi - functional programming interface
 * @export
 */
export const UsersApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = UsersApiAxiosParamCreator(configuration)
    return {
        /**
         * fetch every user available.
         * @summary Get all users.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async usersGet(options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<UserUserDB>>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.usersGet(options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * fetch a user by id.
         * @summary Get a user.
         * @param {string} id User ID
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async usersIdGet(id: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<UserUserDB>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.usersIdGet(id, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * creates one user.
         * @summary Create one user.
         * @param {UserCreateUserRequest} user User to create
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async usersPost(user: UserCreateUserRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<UserCreateUserResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.usersPost(user, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * UsersApi - factory interface
 * @export
 */
export const UsersApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = UsersApiFp(configuration)
    return {
        /**
         * fetch every user available.
         * @summary Get all users.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        usersGet(options?: any): AxiosPromise<Array<UserUserDB>> {
            return localVarFp.usersGet(options).then((request) => request(axios, basePath));
        },
        /**
         * fetch a user by id.
         * @summary Get a user.
         * @param {string} id User ID
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        usersIdGet(id: string, options?: any): AxiosPromise<UserUserDB> {
            return localVarFp.usersIdGet(id, options).then((request) => request(axios, basePath));
        },
        /**
         * creates one user.
         * @summary Create one user.
         * @param {UserCreateUserRequest} user User to create
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        usersPost(user: UserCreateUserRequest, options?: any): AxiosPromise<UserCreateUserResponse> {
            return localVarFp.usersPost(user, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * UsersApi - object-oriented interface
 * @export
 * @class UsersApi
 * @extends {BaseAPI}
 */
export class UsersApi extends BaseAPI {
    /**
     * fetch every user available.
     * @summary Get all users.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UsersApi
     */
    public usersGet(options?: AxiosRequestConfig) {
        return UsersApiFp(this.configuration).usersGet(options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * fetch a user by id.
     * @summary Get a user.
     * @param {string} id User ID
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UsersApi
     */
    public usersIdGet(id: string, options?: AxiosRequestConfig) {
        return UsersApiFp(this.configuration).usersIdGet(id, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * creates one user.
     * @summary Create one user.
     * @param {UserCreateUserRequest} user User to create
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UsersApi
     */
    public usersPost(user: UserCreateUserRequest, options?: AxiosRequestConfig) {
        return UsersApiFp(this.configuration).usersPost(user, options).then((request) => request(this.axios, this.basePath));
    }
}

