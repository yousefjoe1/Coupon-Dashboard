import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
    index("routes/login.tsx"),

    route("home", "routes/home.tsx"),

    layout("routes/dashboard/layout.tsx", [
        route("dashboard", "routes/dashboard/home.tsx"),
        route("dashboard/stores", "routes/dashboard/stores.tsx"),
        route("dashboard/coupons", "routes/dashboard/coupones.tsx"),
        route("dashboard/products", "routes/dashboard/products.tsx"),
    ]),
] satisfies RouteConfig;
