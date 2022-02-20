interface ProjectCfgData {
    protocol: string; //http
    hostname: string; // k_dev_stack.ru
    api: string; // api/v1
    static: string; // static
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
    hostname: '127.0.0.1:3030',
    api: 'api/v1',
    static: 'static'
};

const curCfg = devCfg;
export const apiUrl = `${curCfg.protocol}://${curCfg.hostname}/${curCfg.api}`;
export const staticUrl = `${curCfg.protocol}://${curCfg.hostname}/${curCfg.static}`;
export const projectCfg = new ProjectCfg(curCfg);