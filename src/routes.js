import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [{
        path: "/",
        name: "Home",
        component: () =>
            import ("./pages/Index.vue"),
    },
    {
        path: "/buttons",
        name: "Buttons",
        component: () =>
            import ("./pages/Buttons.vue"),
    },
    {
        path: "/login",
        name: "Login",
        component: () =>
            import ("./pages/login.vue"),
    },
    {
        path: "/create-account",
        name: "CreateAccount",
        component: () =>
            import ("./pages/create-account.vue"),
    },
    {
        path: "/rade-self-registration-form",
        name: "RadeSelfRegistrationForm",
        component: () =>
            import ("./pages/rade-self-registration-form.vue"),
    },
    {
        path: "/forgot-password",
        name: "ForgotPassword",
        component: () =>
            import ("./pages/forgot-password.vue"),
    },
    {
        path: "/my-account",
        name: "My Account",
        component: () =>
            import ("./pages/my-account.vue"),
    },
    {
        path: "/page-unavailable",
        name: "PageUnavailable",
        component: () =>
            import ("./pages/404.vue"),
    },
    {
        path: "/cards",
        name: "Cards",
        component: () =>
            import ("./pages/Cards.vue"),
    },
    {
        path: "/charts",
        name: "Charts",
        component: () =>
            import ("./pages/Charts.vue"),
    },
    {
        path: "/forms",
        name: "Forms",
        component: () =>
            import ("./pages/Forms.vue"),
    },
    {
        path: "/modals",
        name: "Modals",
        component: () =>
            import ("./pages/Modals.vue"),
    },
    {
        path: "/tables",
        name: "Tables",
        component: () =>
            import ("./pages/Tables.vue"),
    },
];

const router = new VueRouter({
    routes,
    mode: "history",
});

export default router;