const routes = {
    post: [{
        path: '/example',
        handler: jest.fn(() => Promise.resolve({ data: { }, status: 200 }))
    }],
    get: [{
        path: '/example',
        handler: jest.fn(() => Promise.resolve({ data: { }, status: 200 }))
    }],
    put: [],
    delete: []
};

const set = function(method, path, handler) {
    const fn = () => {
        return {
            data: handler()
        };
    };
    routes[method].push({ path, handler: fn });
};

const process = function(method, url) {
    const found = routes[method].find(one => url.includes(one.path));
    if (found) {
        return found.handler();
    }

    console.info('MOCK NOT FOUND FOR:', url);
    return jest.fn(() => Promise.resolve({ data: { }, status: 200 }));
};

const axios = {
    set:set,
    post: url => process('post', url),
    get: url => process('get', url),
    put:url => process('put', url),
    delete: url => process('delete', url),
    interceptors: {
        request: {
            use: () => {}
        }
    }
};

axios.create = () => axios;

module.exports = axios;
