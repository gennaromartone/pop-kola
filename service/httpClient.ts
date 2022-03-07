async function buildHeader(): Promise<HeadersInit | undefined> {
    return {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        //'X-API-Key':`${API_KEY}`,
        //'X-User-Id':getuserId()
        //authorization: `Bearer ${token}`,
    };
}

function buildParams(obj?: Record<string, unknown> | Record<string, never>): string {
    const items = obj && Object.keys(obj).map((key)  => {
        const value = obj && obj[key];
        if (Array.isArray(value)) {
            return (value as never[]).map(v => `${key}=${v}`);
        } else {
            return `${key}=${value}`;
        }
    });

    return (items as [string]).flat().join('&');
}

const domain = '';

/**
 * Execute Http Post call
 * @param {string} path - Path to call
 * @param {unknow} body - Http body - the body can take any type
 * @param {boolean} isRetry - Tell if it's a retry call
 * @param {boolean} addToRetry - Tell if it get a connection error to retry
 * @param {Record<string, unknown>} - params for request string
 * @return {Promise<T> } - A promise of the same type of the Post
 */
 export async function post<T>(path: string, body: unknown, isRetry?:boolean, addToRetry?:boolean, params?: Record<string, unknown>): Promise<T> {
    try {
        const queryParams = params ? `?${buildParams(params)}` : '';
        const res = await fetch(`${domain}${path}${queryParams}`, {
            method: 'POST',
            headers: await buildHeader(),
            body: JSON.stringify(body),
            credentials: 'include'
        });

        if (res.status === 401 && !isRetry)
            //redirectToLogin();
            console.log('401')

        if(!res.ok)
            throw await res.json();
        
        return res.json();
    } catch (error) {

       // !isRetry && addToRetry && saveToRetry(path,body,params); // gestire il retry della post( salvare la chiamata nel indexedDB)

       // const e = error as CustomError;
        
       // if(e.errorStatus)
           // throw error;
        
        // in this case the device is offline
        throw {errorDescription:error};
    }
}

export async function _delete<T>(path: string, body: unknown, isRetry?:boolean, addToRetry?:boolean, params?: Record<string, unknown>): Promise<T> {
    try {
        const queryParams = params ? `?${buildParams(params)}` : '';
        const res = await fetch(`${domain}${path}${queryParams}`, {
            method: 'DELETE',
            headers: await buildHeader(),
            body: JSON.stringify(body),
            credentials: 'include'
        });

        if (res.status === 401 && !isRetry)
            //redirectToLogin();
            console.log('401')

        if(!res.ok)
            throw await res.json();
        
        return res.json();
    } catch (error) {
        throw {errorDescription:error};
    }
}

export async function put<T>(path: string, body: unknown, isRetry?:boolean, addToRetry?:boolean, params?: Record<string, unknown>): Promise<T> {
    try {
        const queryParams = params ? `?${buildParams(params)}` : '';
        const res = await fetch(`${domain}${path}${queryParams}`, {
            method: 'PUT',
            headers: await buildHeader(),
            body: JSON.stringify(body),
            credentials: 'include'
        });

        if (res.status === 401 && !isRetry)
            //redirectToLogin();
            console.log('401')

        if(!res.ok)
            throw await res.json();
        
        return res.json();
    } catch (error) {
        throw {errorDescription:error};
    }
}