import { ProjectCfg, ProjectCfgData } from "./utils/cfg_class";

const devCfgData: ProjectCfgData = {
    protocol: 'http',
    hostname: '127.0.0.1:3030', // backend! 
    api: 'api/v1',
    static: 'static',
    frontendHostname: '127.0.0.1:3000',
    revalidate: 5 * 60
};

const prodCfgData: ProjectCfgData = {
    protocol: 'https',
    api: 'api/v1',
    static: 'static',
    hostname: "kdevstack.ru",
    revalidate: 5 * 60
};

const devCfg = new ProjectCfg(devCfgData);
const prodCfg = new ProjectCfg(prodCfgData);

// set your cfg here
const curCfgData = devCfg.data;
export const projectCfg = new ProjectCfg(curCfgData);

export const apiUrl = `${curCfgData.protocol}://${curCfgData.hostname}/${curCfgData.api}`;
export const staticUrl = `${curCfgData.protocol}://${curCfgData.hostname}/${curCfgData.static}`;
export const siteUrl = `${curCfgData.protocol}://${curCfgData.frontendHostname || curCfgData.hostname}`;