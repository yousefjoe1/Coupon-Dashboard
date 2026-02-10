import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
    index("routes/login.tsx"),

    route("home", "routes/home.tsx"),

    layout("routes/dashboard/layout.tsx", [
        route("dashboard", "routes/dashboard/home.tsx"), // الوصول لها عبر /dashboard
    ]),
] satisfies RouteConfig;
