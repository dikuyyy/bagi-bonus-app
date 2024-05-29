import HomePage from "@/pages/home/HomePage.vue";
import {RouteRecordRaw} from "vue-router";
import MainLayout from "@/layouts/PrivateRoutes.vue";

const usePrivateRoutes = (routes: RouteRecordRaw[]) => {
    return routes.map((route: RouteRecordRaw) => ({
        ...route,
        meta: {
            layout: MainLayout,
            ...route.meta
        }
    }))
}

const publicRoutes: RouteRecordRaw[] = usePrivateRoutes(
    [
        {
            path: '/',
            name: 'home-page',
            component: HomePage
        }
    ]
)

export default publicRoutes;