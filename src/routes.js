import Vue from "vue";
import VueRouter from "vue-router";
import Login from "./pages/login";
import Home from "./pages/Index.vue";
import MemberCountries from "./pages/MemberCountries.vue";
import Regions from "./pages/Regions.vue";
import CreateAccount from "./pages/create-account.vue";
import SelfRegistrationForm from "./pages/rde-self-registration-form.vue";
import ForgotPassword from "./pages/forgot-password.vue";
import MyAccount from "./pages/my-account.vue";
import PageNotFound from "./pages/404.vue";
import testMemberCountries from "./pages/testMemberCountries";

Vue.use(VueRouter);

const routes = [
    {
        path: "/login",
        name: "Login",
        component: Login,
        showInLeftBar: false
    },
    {
        path: "/home",
        name: "Home",
        component: Home,
        icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>`
    },
    {
        path: "/testCountries",
        name: "MemberCountriesTest",
        component: testMemberCountries,
        props:{ vuex_data_action: 'fetchCountries', table_headings: ['NAME','PHONE CODE', 'REGISTERED RDES', 'PENDING RDES', 'ACTION']},
        icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>`
    },
    {
        path: "/rde-self-registration-form",
        name: "RdeSelfRegistrationForm",
        component: SelfRegistrationForm,
        icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">\n' +
            '  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />\n' +
            '</svg>',
        verboseName: 'Register RDE'
    },
    {
        path: "/member-countries",
        name: "MemberCountries",
        component: MemberCountries,
        props:{ vuex_data_action: 'fetchCountries', table_headings: ['NAME','PHONE CODE', 'REGISTERED RDES', 'PENDING RDES', 'ACTION']},
        icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>`,
        children: [
            {
                path: ':countryId/:countryName/regions',
                name: 'Regions',
                component: Regions
            },
        ]
    },
    {
        path: "/create-account",
        name: "CreateAccount",
        component: CreateAccount,
        showInLeftBar: false
    },

    {
        path: "/forgot-password",
        name: "ForgotPassword",
        component: ForgotPassword,
        showInLeftBar: false
    },
    {
        path: "/my-account",
        name: "My Account",
        component: MyAccount,
        showInLeftBar: false
    },
    {
        path: "/page-unavailable",
        name: "PageUnavailable",
        component: PageNotFound,
        showInLeftBar: false
    },
];

const router = new VueRouter({
    routes,
    mode: "history",
});

export default router;