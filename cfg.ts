interface ProjectCfgData {
    protocol: string; //http
    hostname: string; // kdev_stack.ru
    api: string; // api/v1
    static: string; // static
    revalidate: number;

    // dev only!
    frontendHostname?: string;
};

export class ProjectCfg {
    protected _data: ProjectCfgData;

    constructor(data: ProjectCfgData) {
        this._data = data;
    }

    get data() {
        return this._data;
    }

    getApiUrl() {
        const { protocol, hostname, api } = this._data;
        return `${protocol}://${hostname}/${api}`;
    }
}

const devCfg: ProjectCfgData = {
    protocol: 'http',
    hostname: '127.0.0.1:3030', // backend! 
    api: 'api/v1',
    static: 'static',
    frontendHostname: '127.0.0.1:3000',
    revalidate: 5 * 60
};

const prodCdf: ProjectCfgData = {
    protocol: 'https',
    api: 'api/v1',
    static: 'static',
    hostname: "kdev_stack.ru",
    revalidate: 5 * 60
};

const curCfg = devCfg;

export const apiUrl = `${curCfg.protocol}://${curCfg.hostname}/${curCfg.api}`;
export const staticUrl = `${curCfg.protocol}://${curCfg.hostname}/${curCfg.static}`;
export const projectCfg = new ProjectCfg(curCfg);
export const siteUrl = `${curCfg.protocol}://${curCfg.frontendHostname || curCfg.hostname}`;