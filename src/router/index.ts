import publicRoutes from "./public-routes.ts";
import {createRouter, createWebHistory} from "vue-router";
import privateRoutes from "@/router/private-routes.ts";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        ...publicRoutes,
        ...privateRoutes
    ]
})

export default router;