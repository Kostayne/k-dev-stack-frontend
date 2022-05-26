export interface ProjectCfgData {
    protocol: string; //http
    hostname: string; // kdevstack.ru
    api: string; // api/v1
    static: string; // static
    revalidate: number; // 5 * 60

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

    getBaseUrl() {
        const { protocol, hostname } = this._data;
        return `${protocol}://${hostname}`;
    }
}