import { GetServerSideProps } from 'next';
import { getServerSideSitemap, ISitemapField } from 'next-sitemap';
import { siteUrl } from '../../cfg';
import { libReq } from '../../requests/lib.req';
import { projReq } from '../../requests/project.req';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const [projects, _projectsError] = await projReq.getMany({
        count: 9999,
        desc: false,
        offset: 0
    });

    const [libs, _libsError] = await libReq.getMany({
        count: 9999,
        desc: false,
        offset: 0
    });

    const projectPaths: ISitemapField[] = projects.map(p => {
        return {
            loc: `${siteUrl}/projects/${p.slug}`
        };
    });

    const libPaths: ISitemapField[] = libs.map(l => {
        return {
            loc: `${siteUrl}/libs/${l.slug}`
        };
    });

    const fields: ISitemapField[] = [...projectPaths, ...libPaths];
    return getServerSideSitemap(ctx, fields);
};

export default () => {

};