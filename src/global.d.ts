// Cache Route
export interface CacheRouteConfig {
    path: string,
    name: string,
    props: string,
    component: any,
    componentPath: string
}

declare global {
    interface Window {
        Logline: any
    }
}
