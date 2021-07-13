import Vue from "vue";
import VueRouter from "vue-router";
import Login from "./pages/login";
import Home from "./pages/Index.vue";
import MemberCountries from "./pages/countries/MemberCountries.vue";
import Regions from "./pages/regions/Regions.vue";
import Outbreak from "./pages/outbreak/Outbreaks.vue";
import Competence from "./pages/competence/Competence.vue";
import CreateAccount from "./pages/create-account.vue";
import SelfRegistrationForm from "./pages/rde-self-registration-form.vue";
import ForgotPassword from "./pages/forgot-password.vue";
import MyAccount from "./pages/my-account.vue";
import PageNotFound from "./pages/404.vue";
import modal_delete_template from "./components/utilities/modal_delete_template";
// import CreateMemberCountry from "./pages/countries/CreateMemberCountry";
import modal_create_template from "./components/utilities/modal_create_template";
// import paragraph from "./components/layouts/paragraph";

//schemas
import country_schema from '@/schemas/country_schema.json'
import region_schema from '@/schemas/region_schema.json'
import outbreak_schema from '@/schemas/outbreak_schema.json'
import competence_schema from '@/schemas/competence_schema.json'
import rde_schema from '@/schemas/rde_schema.json'
import modal_update_template from "./components/utilities/modal_update_template";


Vue.use(VueRouter);

const routes = [{
        path: "/login",
        name: "Login",
        component: Login,
        showInLeftBar: false
    },
    {
        path: "/home",
        name: "home",
        component: Home,
        props: {
            vuex_data_action: 'fetchRDES',
            table_headings: ['NAME', 'SPECIALIZATION', 'REGION', 'STATUS', 'CURRENT DEPLOYMENT', 'COMPETENCE', 'ACTIONS']
        },
        icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>`,
        children: [{
                path: 'create-rde',
                name: 'CreateRDE',
                component: modal_create_template,
                showInLeftBar: false,
                props: {
                    jsonSchema: rde_schema,
                    vuex_action: 'postRDE',
                    object_title: 'Add RDE',
                    size: 'w-1/2',
                    optionsList: ['fetchAllCompetencies']
                }
            },
            {
                path: 'update-rde/:rdeName/:rdeId',
                name: 'UpdateRDE',
                component: modal_update_template,
                showInLeftBar: false,
                props: x => {
                    return {
                        jsonSchema: rde_schema,
                        vuex_fetch_action: 'fetchRDEById',
                        vuex_save_action: 'updateRDEById',
                        object_title: `${x.params.rdeName} details`,
                        object_id: x.params.rdeId,
                        optionsList: ['fetchAllCompetencies'],
                        size: 'w-1/2'
                    }

                }
            },
            {
                path: 'delete-rde/:rdeName/:rdeId',
                name: 'DeleteRDE',
                component: modal_delete_template,
                showInLeftBar: false,
                props: x => {
                    return {
                        vuex_action: 'deleteRDEById',
                        vuex_payload: x.params.rdeId,
                        object_title: x.params.rdeName
                    }
                }
            },
        ]
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
        path: "/member-countries/",
        name: "MemberCountries",
        component: MemberCountries,
        props: {
            vuex_data_action: 'fetchCountries',
            table_headings: ['NAME', 'PHONE CODE', 'REGISTERED RDES', 'PENDING RDES', 'ACTION']
        },
        icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>`,
        children: [{
                path: 'create-country',
                name: 'CreateCountry',
                component: modal_create_template,
                showInLeftBar: false,
                props: {
                    jsonSchema: country_schema,
                    vuex_action: 'postCountry',
                    object_title: 'Country'
                }
            },
            {
                path: 'update-country/:countryName/:countryId',
                name: 'UpdateCountry',
                component: modal_update_template,
                showInLeftBar: false,
                props: x => {
                    return {
                        jsonSchema: country_schema,
                        vuex_fetch_action: 'fetchCountryById',
                        vuex_save_action: 'updateCountryById',
                        object_title: x.params.countryName,
                        object_id: x.params.countryId
                    }

                }
            },
            {
                path: 'delete-country/:countryName/:countryId',
                name: 'DeleteCountry',
                component: modal_delete_template,
                showInLeftBar: false,
                props: x => {
                    return {
                        vuex_action: 'deleteCountryById',
                        vuex_payload: x.params.countryId,
                        object_title: x.params.countryName
                    }
                }
            },
        ]
    },
    {
        path: '/member-countries/:countryId/:countryName/regions/',
        name: 'Regions',
        component: Regions,
        props: {
            vuex_data_action: 'fetchRegions',
            table_headings: ['NAME', 'Country', 'ACTION']
        },
        showInLeftBar: false,
        children: [{
                path: 'create-region',
                name: 'CreateRegion',
                component: modal_create_template,
                showInLeftBar: false,
                props: {
                    jsonSchema: region_schema,
                    vuex_action: 'postRegion',
                    object_title: 'Region',
                    optionsList:['fetchCountries'],
                }
            },
            {
                path: 'update-region/:regionName/:regionId',
                name: 'UpdateRegion',
                component: modal_update_template,
                showInLeftBar: false,
                props: x => {
                    return {
                        jsonSchema: region_schema,
                        vuex_fetch_action: 'fetchRegionById',
                        vuex_save_action: 'updateRegionById',
                        object_title: x.params.regionName,
                        object_id: x.params.regionId,
                        optionsList:['fetchCountries'],
                    }

                }
            },
            {
                path: 'delete-region/:regionName/:regionId',
                name: 'DeleteRegion',
                component: modal_delete_template,
                showInLeftBar: false,
                props: x => {
                    return {
                        vuex_action: 'deleteRegionById',
                        vuex_payload: x.params.regionId,
                        object_title: x.params.regionName
                    }
                }
            },
        ]
    },

    // outbreaks
    {
        path: "/outbreaks/",
        name: "Outbreaks",
        component: Outbreak,
        props: {
            vuex_data_action: 'fetchAllOutbreaks',
            table_headings: ['NAME', 'DESCRIPTION', 'COMPETENCIES LIST', 'SEVERITY', 'AFFECTED REGIONS LIST', 'START DATE', 'END DATE', 'ACTION']
        },
        icon: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`,
        children: [{
                path: 'create-outbreak',
                name: 'CreateOutbreak',
                component: modal_create_template,
                showInLeftBar: false,
                props: {
                    jsonSchema: outbreak_schema,
                    vuex_action: 'postOutbreak',
                    object_title: 'Outbreak',
                    size: 'w-1/2',
                    optionsList: ['fetchAllCompetencies', 'fetchRegions']
                }
            },
            {
                path: 'update-outbreak/:outbreakName/:outbreakId',
                name: 'UpdateOutbreak',
                component: modal_update_template,
                showInLeftBar: false,
                props: x => {
                    return {
                        jsonSchema: outbreak_schema,
                        vuex_fetch_action: 'fetchOutbreakById',
                        vuex_save_action: 'updateOutbreakById',
                        object_title: x.params.outbreakName,
                        object_id: x.params.outbreakId,
                        size: 'w-1/2',
                        optionsList: ['fetchAllCompetencies', 'fetchRegions']
                    }

                }
            },
            {
                path: 'delete-outbreak/:outbreakName/:outbreakId',
                name: 'DeleteOutbreak',
                component: modal_delete_template,
                showInLeftBar: false,
                props: x => {
                    return {
                        vuex_action: 'deleteOutbreakById',
                        vuex_payload: x.params.outbreakId,
                        object_title: x.params.outbreakName
                    }
                }
            },
        ]
    },
    // competence
    {
        path: "/competence/",
        name: "Competence",
        component: Competence,
        props: {
            vuex_data_action: 'fetchAllCompetencies',
            table_headings: ['NAME', 'CREATED AT', 'UPDATED AT', 'ACTIONS']
        },
        icon: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>`,
        children: [{
                path: 'create-competence',
                name: 'CreateCompetence',
                component: modal_create_template,
                showInLeftBar: false,
                props: {
                    jsonSchema: competence_schema,
                    vuex_action: 'postCompetence',
                    object_title: 'Add Competence',
                    size: 'w-1/2',
                    optionsList: ['fetchAllCompetencies', 'fetchRegions']
                }
            },
            {
                path: 'update-competence/:competenceName/:competenceId',
                name: 'UpdateCompetence',
                component: modal_update_template,
                showInLeftBar: false,
                props: x => {
                    return {
                        jsonSchema: competence_schema,
                        vuex_fetch_action: 'fetchCompetencyById',
                        vuex_save_action: 'updateCompetenceById',
                        object_title: x.params.competenceName,
                        object_id: x.params.competenceId,
                        size: 'w-1/2'
                    }

                }
            },
            {
                path: 'delete-competence/:competenceName/:competenceId',
                name: 'DeleteCompetence',
                component: modal_delete_template,
                showInLeftBar: false,
                props: x => {
                    return {
                        vuex_action: 'deleteCompetencyById',
                        vuex_payload: x.params.competenceId,
                        object_title: x.params.competenceName
                    }
                }
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