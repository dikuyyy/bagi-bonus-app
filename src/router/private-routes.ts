import HomePage from "@/pages/home/HomePage.vue";
import {RouteRecordRaw} from "vue-router";
import MainLayout from "@/layouts/PrivateRoutes.vue";
import TambahBagiBonus from "@/pages/bagiBonus/TambahBagiBonusPage.vue";
import BagiBonusPage from "@/pages/bagiBonus/BagiBonusPage.vue";
import EditBagiBonusPage from "@/pages/bagiBonus/EditBagiBonusPage.vue";

const usePrivateRoutes = (routes: RouteRecordRaw[]) => {
    return routes.map((route: RouteRecordRaw) => ({
        ...route,
        meta: {
            layout: MainLayout,
            ...route.meta
        }
    }))
}

const privateRoutes: RouteRecordRaw[] = usePrivateRoutes(
    [
        {
            path: '/',
            name: 'home-page',
            component: HomePage
        },
        {
            path: '/bagi-bonus',
            children: [
                {
                    path: '/create',
                    name: 'tambah-bagi-bonus',
                    component: TambahBagiBonus
                },
                {
                    path: '',
                    name: 'bagi-bonus',
                    component: BagiBonusPage
                },
                {
                    path: '/edit/:id',
                    name: 'edit-bagi-bonus',
                    component: EditBagiBonusPage
                }
            ]
        }
    ]
)

export default privateRoutes;