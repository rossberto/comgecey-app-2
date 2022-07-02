function setRoutes(config, defaultAuth)
    {
        let routes = [...config.routes];

        if ( config.settings || config.auth )
        {
            routes = routes.map((route) => {
                let auth = config.auth ? [...config.auth] : defaultAuth || null;
                auth = route.auth ? [...auth, ...route.auth] : auth;
                return {
                    ...route,
                    settings: {...config.settings, ...route.settings},
                    auth
                };
            });
        }

        return [...routes];
    }

export default function generateRoutesFromConfigs(configs, defaultAuth)
{
    let allRoutes = [];
    configs.forEach((config) => {
        allRoutes = [
            ...allRoutes,
            ...setRoutes(config, defaultAuth)
        ]
    });
    return allRoutes;
}
