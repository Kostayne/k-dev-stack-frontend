import { apiUrl } from "../cfg";
import { RespInfo } from "../interfaces/resp_info";
import { HeaderBuilder } from "../utils/header_builder";

export class ProjectLibReq {
    connnectBySlug = async (libSlug: string, projectSlug: string): Promise<RespInfo<null>> => {
        const qb = new URLSearchParams();
        qb.append('lib', libSlug);
        qb.append('project', projectSlug);

        try {
            const resp = await fetch(`${apiUrl}/project_lib/connect_by_slug?` + qb.toString(), {
                method: 'POST',
                headers: new HeaderBuilder().json().jwt().headers
            });

            if (!resp.ok) {
                console.error(resp.statusText);

                return {
                    error: resp.statusText,
                    resp
                };
            }

            return {
                resp,
                data: null
            };
        } catch (e) {
            console.error(e);

            return {
                error: e as string
            };
        }
    };
}

export const projectLibReq = new ProjectLibReq();