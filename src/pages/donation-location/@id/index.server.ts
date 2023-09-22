import { PageContext } from '@/types';


export async function onBeforeRender(ctx: PageContext) {
    const { id } = ctx.routeParams;

    return {
        pageContext: {
            pageProps: {
                id
            }
        }
    }
}