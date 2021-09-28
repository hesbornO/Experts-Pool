import Vue from "vue";
import VueRouter from "vue-router";
import Login from "./pages/login";
import Home from "./pages/Index.vue";
import rde_profile from "./pages/rde_profile.vue";
import rde_self_profile from "./pages/rde_self_profile.vue";
import Deployments from "./pages/deployments/Deployments.vue";
import PartnerStates from "./pages/countries/PartnerStates.vue";
import Regions from "./pages/countries/Regions.vue";
import Outbreak from "./pages/outbreak/Outbreaks.vue";
import Competence from "./pages/competence/Competence.vue";
import Occupation from "./pages/occupations/Occupations.vue";
import UserGroups from "./pages/users/UserGroups.vue";
import Users from "./pages/users/Users.vue";
import SignUp from "./pages/sign-up.vue";
import SelfRegistrationForm from "./pages/rde-self-registration-form.vue";
import ForgotPassword from "./pages/forgot-password.vue";
import MyAccount from "./pages/my-account.vue";
import PageNotFound from "./pages/404.vue";
import modal_delete_template from "./components/utilities/modal_delete_template";
import modal_create_template from "./components/utilities/modal_create_template";
import modal_update_template from "./components/utilities/modal_update_template";
import modal_deploy_template from "./components/utilities/modal_deploy_template";
import modal_end_deployment_template from "./components/utilities/modal_end_deployment_template";
import modal_approve_rde_template from "./components/utilities/modal_approve_rde_template";
import modal_disapprove_rde_template from "./components/utilities/modal_disapprove_rde_template";
import modal_upload_cv_template from "./components/utilities/modal_upload_cv_template";

//schemas
import country_schema from '@/schemas/country_schema.json'
import deploy_rde_schema from '@/schemas/deploy_rde_schema.json'
import end_rde_deployment_schema from '@/schemas/end_rde_deployment_schema.json'
import region_schema from '@/schemas/region_schema.json'
import outbreak_schema from '@/schemas/outbreak_schema.json'
import outbreak_end_date_schema from '@/schemas/outbreak_end_date_schema.json'
import competence_schema from '@/schemas/competence_schema.json'
import occupation_schema from '@/schemas/occupation_schema.json'
import user_group_schema from '@/schemas/user_group_schema.json'
import user_schema from '@/schemas/user_schema.json'
import rde_schema from '@/schemas/rde_schema.json'
import recommend_schema from '@/schemas/recommend_schema.json'


Vue.use(VueRouter);

const routes = [{
        path: "/",
        name: "Login",
        component: Login,
        showInLeftBar: false
    },
    //home
    {
        path: "/home",
        name: "home",
        component: Home,
        props: {
            vuex_data_action: 'fetchRDES',
            table_headings: ['NAME', 'SPECIALIZATION', 'REGION', 'CURRENT DEPLOYMENT', 'COMPETENCE', 'STATUS', 'ACTIONS']
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
                    object_title: 'RDE',
                    size: 'w-3/4',
                    optionsList: ['fetchAllOccupations', 'fetchRegions', 'fetchAllCompetencies']
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
                        object_title: `' ${x.params.rdeName}'s ' details`,
                        object_id: x.params.rdeId,
                        optionsList: ['fetchAllOccupations', 'fetchRegions', 'fetchAllCompetencies'],
                        size: 'w-3/4'
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
            {
                path: 'approve-rde-ps/:rdeName/:rdeId',
                name: 'partnerStateApproval',
                component: modal_approve_rde_template,
                showInLeftBar: false,
                props: x => {
                    return {
                        vuex_action: 'approveRDEById',
                        vuex_payload: x.params.rdeId,
                        object_title: x.params.rdeName
                    }
                }
            },
            {
                path: 'disapprove-rde-ps/:rdeName/:rdeId',
                name: 'partnerStateDisapproval',
                component: modal_disapprove_rde_template,
                showInLeftBar: false,
                props: x => {
                    return {
                        vuex_action: 'disapproveRDEById',
                        vuex_payload: x.params.rdeId,
                        object_title: x.params.rdeName
                    }
                }
            },
            {
                path: 'approve-rde-eac/:rdeName/:rdeId',
                name: 'eacApproval',
                component: modal_approve_rde_template,
                showInLeftBar: false,
                props: x => {
                    return {
                        vuex_action: 'eac_approveRDEById',
                        vuex_payload: x.params.rdeId,
                        object_title: x.params.rdeName
                    }
                }
            },

            {
                path: 'disapprove-rde-eac/:rdeName/:rdeId',
                name: 'eacDisapproval',
                component: modal_disapprove_rde_template,
                showInLeftBar: false,
                props: x => {
                    return {
                        vuex_action: 'eac_disapproveRDEById',
                        vuex_payload: x.params.rdeId,
                        object_title: x.params.rdeName
                    }
                }
            },
            {
                path: 'deploy-rde/:rdeName/:rdeId',
                name: 'DeployRDE',
                component: modal_deploy_template,
                showInLeftBar: false,
                props: x => {
                    return {
                        jsonSchema: deploy_rde_schema,
                        vuex_save_action: 'deployRDE',
                        object_title: `' ${x.params.rdeName}' ?`,
                        object_id: x.params.rdeId,
                        optionsList: ['fetchOutbreakOptions', 'fetchRegions'],
                        size: 'w-1/2'
                    }

                }
            },
            {
                path: 'end-deployment/:rdeName/:rdeId',
                name: 'EndRDEDeployment',
                component: modal_end_deployment_template,
                showInLeftBar: false,
                props: x => {
                    return {
                        jsonSchema: end_rde_deployment_schema,
                        vuex_save_action: 'endRDEdeployment',
                        object_title: `' ${x.params.rdeName}' ?`,
                        object_id: x.params.rdeId,
                        // optionsList: ['fetchOutbreakOptions','fetchRegions'],
                        size: 'w-1/2'
                    }

                }
            }

        ],
        roles: ['admin', 'approver']
    },
    // PROFILE
    {
        path: '/home/profile/:rdeId/:rdeName',
        name: 'rdeProfile',
        component: rde_profile,
        showInLeftBar: false,
        props: x => {
            return {
                vuex_data_action: 'fetchRDEById',
                object_id: `?country=${x.params.countryId}`,
                table_headings: ['NAME', 'Country', 'ACTION']
            }
        },
        children: [{
                path: 'approve-rde',
                name: 'ApproveRDEfromProfile',
                component: modal_approve_rde_template,
                showInLeftBar: false,
                props: x => {
                    return {
                        vuex_action: 'approveRDEById',
                        vuex_payload: x.params.rdeId,
                        object_title: x.params.rdeName
                    }
                }
            },
            {
                path: 'disapprove-rde',
                name: 'DisapproveRDEfromProfile',
                component: modal_disapprove_rde_template,
                showInLeftBar: false,
                props: x => {
                    return {
                        vuex_action: 'disapproveRDEById',
                        vuex_payload: x.params.rdeId,
                        object_title: x.params.rdeName
                    }
                }
            },
            {
                path: 'update-rde',
                name: 'UpdateRDEfromProfile',
                component: modal_update_template,
                showInLeftBar: false,
                props: x => {
                    return {
                        jsonSchema: rde_schema,
                        vuex_fetch_action: 'fetchRDEById',
                        vuex_save_action: 'updateRDEById',
                        object_title: `' ${x.params.rdeName}'s ' details`,
                        object_id: x.params.rdeId,
                        optionsList: ['fetchAllOccupations', 'fetchRegions', 'fetchAllCompetencies'],
                        size: 'w-3/4'
                    }

                }
            },
            {
                path: 'delete-rde',
                name: 'DeleteRDEfromProfile',
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
            {
                path: 'upload-cv',
                name: 'UploadCVfromProfile',
                component: modal_upload_cv_template,
                showInLeftBar: false,
                props: x => {
                    return {
                        vuex_action: 'uploadCVById',
                        vuex_payload: { cv: x.params.cv, rdeId: x.params.rdeId },
                        object_title: x.params.rdeName
                    }
                }
            },
            {
                path: 'make-recommendation',
                name: 'makeRDErecommendation',
                component: modal_create_template,
                showInLeftBar: false,
                props: x => {
                    return {
                        jsonSchema: recommend_schema,
                        vuex_action: 'recommendToRDE',
                        profile: x.params.rdeId,
                        object_title: x.params.rdeName + ' recommendation',
                        size: '3/4'
                    }
                }
            },
            {
                path: 'deploy-rde',
                name: 'deployRDEfromProfile',
                component: modal_deploy_template,
                showInLeftBar: false,
                props: x => {
                    return {
                        jsonSchema: deploy_rde_schema,
                        vuex_save_action: 'deployRDE',
                        object_title: `' ${x.params.rdeName}' ?`,
                        object_id: x.params.rdeId,
                        optionsList: ['fetchOutbreakOptions', 'fetchRegions'],
                        size: 'w-1/2'
                    }

                }
            },
            {
                path: 'end-deployment/:rdeName/:deploymentId/:outbreakName',
                name: 'EndRDEDeploymentFromProfile',
                component: modal_end_deployment_template,
                showInLeftBar: false,
                props: x => {
                    return {
                        jsonSchema: end_rde_deployment_schema,
                        vuex_save_action: 'endRDEdeployment',
                        object_title: `' ${x.params.rdeName}'s' ${x.params.outbreakName} `,
                        deployment_id: x.params.deploymentId,
                        object_id: x.params.deploymentId,
                        // optionsList: ['fetchOutbreakOptions','fetchRegions'],
                        size: 'w-1/2'
                    }

                }
            }
        ],
        roles: ['admin']
    },
    //rde self profile
    {
        path: '/rde-self-profile',
        name: 'rdeSelfProfile',
        component: rde_self_profile,
        showInLeftBar: true,
        icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>',
        verboseName: 'Profile',
        props: x => {
            return {
                vuex_data_action: 'fetchRDEById',
                object_id: `?country=${x.params.countryId}`,
                table_headings: ['NAME', 'Country', 'ACTION']
            }
        },
        children: [{
                path: 'rde-self-update',
                name: 'RDESelfUIpdate',
                component: modal_update_template,
                showInLeftBar: false,
                props: x => {
                    return {
                        jsonSchema: rde_schema,
                        vuex_fetch_action: 'fetchRDEById',
                        vuex_save_action: 'updateRDEById',
                        object_title: `' ${x.params.rdeName}'s ' details`,
                        object_id: x.params.rdeId,
                        optionsList: ['fetchAllOccupations', 'fetchRegions', 'fetchAllCompetencies'],
                        size: 'w-3/4'
                    }

                }
            },
            {
                path: 'deactivate-profile',
                name: 'DeactivateProfile',
                component: modal_update_template,
                showInLeftBar: false,
                props: x => {
                    return {
                        vuex_action: 'deactivateProfile',
                        vuex_payload: x.params.rdeId,
                        object_title: x.params.rdeName
                    }
                }
            },
            {
                path: 'rde-upload-cv',
                name: 'RDEUploadCVfromProfile',
                component: modal_upload_cv_template,
                showInLeftBar: false,
                props: x => {
                    return {
                        vuex_action: 'uploadCVById',
                        vuex_payload: { cv: x.params.cv, rdeId: x.params.rdeId },
                        object_title: x.params.rdeName
                    }
                }
            },
            {
                path: 'request-for-deployment',
                name: 'requestForDeployment',
                component: modal_create_template,
                showInLeftBar: false,
                props: x => {
                    return {
                        jsonSchema: recommend_schema,
                        vuex_action: 'requestForDeployment',
                        profile: x.params.rdeId,
                        object_title: x.params.rdeName,
                        size: '3/4'
                    }
                }
            },
            {
                path: 'add-remarks',
                name: 'AddGeneralRemarks',
                component: modal_create_template,
                showInLeftBar: false,
                props: x => {
                    return {
                        jsonSchema: end_rde_deployment_schema,
                        vuex_save_action: 'rdeAddRemarks',
                        object_title: `' ${x.params.rdeName}'s' ${x.params.outbreakName} `,
                        deployment_id: x.params.deploymentId,
                        object_id: x.params.deploymentId,
                        // optionsList: ['fetchOutbreakOptions','fetchRegions'],
                        size: 'w-1/2'
                    }

                }
            }
        ],
        roles: ['rde']
    },
    // self-registration
    {
        path: "/rde-self-registration-form",
        name: "RdeSelfRegistrationForm",
        component: SelfRegistrationForm,
        icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">\n' +
            '  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />\n' +
            '</svg>',
        verboseName: 'Register',
        roles: []
    },
    //deployments
    {
        path: "/deployments",
        name: "Active Deployments",
        component: Deployments,
        props: {
            // vuex_data_action: 'fetchRDEDeployments',
            // table_headings: ['NAME', 'CONTACT', 'REGION', 'SPECIALIZATION', 'COMPETENCE', 'CURRENT DEPLOYMENT', 'Deployment date', 'ACTIONS']
            vuex_data_action: 'fetchRDES',
            table_headings: ['NAME', 'SPECIALIZATION', 'REGION', 'CURRENT DEPLOYMENT', 'COMPETENCE', 'STATUS', 'ACTIONS']

        },
        icon: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 5l7 7-7 7"></path></svg>`,
        children: [{
            path: 'end-deployment/:rdeName/:rdeId',
            name: 'EndRDEdeployment',
            component: modal_end_deployment_template,
            showInLeftBar: false,
            props: x => {
                return {
                    jsonSchema: end_rde_deployment_schema,
                    vuex_save_action: 'endRDEdeployment',
                    object_title: `' ${x.params.rdeName}' `,
                    object_id: x.params.rdeId,
                    size: 'w-1/2'
                }

            }
        }],
        roles: ['admin', 'approver']
    },
    // partner-states
    {
        path: "/partner-states/",
        name: "PartnerStates",
        component: PartnerStates,
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
        ],
        roles: ['admin']
    },
    // regions
    {
        path: '/member-countries/:countryId/:countryName/regions/',
        name: 'Regions',
        component: Regions,
        props: x => {
            return {
                vuex_data_action: 'fetchRegions',
                object_id: `?country=${x.params.countryId}`,
                table_headings: ['NAME', 'Country', 'ACTION']
            }
        },
        showInLeftBar: false,
        children: [{
                path: 'create-region',
                name: 'CreateRegion',
                component: modal_create_template,
                showInLeftBar: false,
                props: x => {
                    return {
                        country_id: x.params.countryId,
                        jsonSchema: region_schema,
                        vuex_action: 'postRegion',
                        object_title: 'Region',
                        optionsList: ['fetchCountries'],
                    }
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
                        optionsList: ['fetchCountries'],
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
        ],
        roles: ['admin']
    },

    // outbreaks
    {
        path: "/outbreaks/",
        name: "Outbreaks",
        component: Outbreak,
        props: {
            vuex_data_action: 'fetchAllOutbreaks',
            table_headings: ['NAME', 'DESCRIPTION', 'DATES', 'ACTION']
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
                path: 'outbreak-end-date/:outbreakName/:outbreakId',
                name: 'OutbreakEndDate',
                component: modal_update_template,
                showInLeftBar: false,
                props: x => {
                    return {
                        jsonSchema: outbreak_end_date_schema,
                        vuex_fetch_action: 'fetchOutbreakById',
                        vuex_save_action: 'updateOutbreakById',
                        object_title: x.params.outbreakName,
                        object_id: x.params.outbreakId,
                        size: 'w-1/2',
                        optionsList: []
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
        ],
        roles: ['admin']
    },
    // end of outbreaks
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
        ],
        roles: ['admin']
    },
    // end of competence
    // occupation
    {
        path: "/occupation/",
        name: "Occupation",
        component: Occupation,
        props: {
            vuex_data_action: 'fetchAllOccupations',
            table_headings: ['NAME', 'one health sector', 'description', 'ACTIONS']
        },
        icon: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>`,
        children: [{
                path: 'create-occupation',
                name: 'CreateOccupation',
                component: modal_create_template,
                showInLeftBar: false,
                props: {
                    jsonSchema: occupation_schema,
                    vuex_action: 'postOccupation',
                    object_title: 'Add Occupation',
                    size: 'w-1/2',
                    optionsList: []
                }
            },
            {
                path: 'update-occupation/:occupationName/:occupationId',
                name: 'UpdateOccupation',
                component: modal_update_template,
                showInLeftBar: false,
                props: x => {
                    return {
                        jsonSchema: occupation_schema,
                        vuex_fetch_action: 'fetchOccupationById',
                        vuex_save_action: 'updateOccupationById',
                        object_title: x.params.occupationName,
                        object_id: x.params.occupationId,
                        size: 'w-1/2'
                    }

                }
            },
            {
                path: 'delete-occupation/:occupationName/:occupationId',
                name: 'DeleteOccupation',
                component: modal_delete_template,
                showInLeftBar: false,
                props: x => {
                    return {
                        vuex_action: 'deleteOccupationById',
                        vuex_payload: x.params.occupationId,
                        object_title: x.params.occupationName
                    }
                }
            },
        ],
        roles: ['admin']
    },
    // end of occupation
    // user groups
    {
        path: "/user-groups/",
        name: "UserGroups",
        component: UserGroups,
        props: {
            vuex_data_action: 'fetchUserGroups',
            table_headings: ['NAME', 'ACTIONS']
        },
        icon: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>`,
        children: [{
                path: 'create-user-group',
                name: 'CreateUserGroup',
                component: modal_create_template,
                showInLeftBar: false,
                props: {
                    jsonSchema: user_group_schema,
                    vuex_action: 'postUserGroup',
                    object_title: 'Add User Group',
                    size: 'w-1/2',
                    optionsList: []
                }
            },
            {
                path: 'update-user-group/:userGroupName/:userGroupId',
                name: 'UpdateUserGroup',
                component: modal_update_template,
                showInLeftBar: false,
                props: x => {
                    return {
                        jsonSchema: user_group_schema,
                        vuex_fetch_action: 'fetchUserGroupById',
                        vuex_save_action: 'updateUserGroupById',
                        object_title: x.params.userGroupName,
                        object_id: x.params.userGroupId,
                        size: 'w-1/2'
                    }
                }
            },
            {
                path: 'delete-user-group/:userGroupName/:userGroupId',
                name: 'DeleteUserGroup',
                component: modal_delete_template,
                showInLeftBar: false,
                props: x => {
                    return {
                        vuex_action: 'deleteUserGroupById',
                        vuex_payload: x.params.userGroupId,
                        object_title: x.params.userGroupName
                    }
                }
            },
        ],
        roles: ['admin']
    },
    // end of user groups
    // users
    {
        path: "/users/",
        name: "Users",
        component: Users,
        props: {
            vuex_data_action: 'fetchUsers',
            table_headings: ['USERNAME', 'NAME', 'PHONE NUMBER', 'GROUPS', 'STAFF NUMBER', 'ACTIONS']
        },
        icon: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`,
        children: [{
                path: 'create-user',
                name: 'CreateUser',
                component: modal_create_template,
                showInLeftBar: false,
                props: {
                    jsonSchema: user_schema,
                    vuex_action: 'postUser',
                    object_title: 'Add User',
                    size: 'w-1/2',
                    optionsList: []
                }
            },
            {
                path: 'update-user/:userId',
                name: 'UpdateUser',
                component: modal_update_template,
                showInLeftBar: false,
                props: x => {
                    return {
                        jsonSchema: user_schema,
                        vuex_fetch_action: 'fetchUserById',
                        vuex_save_action: 'updateUserById',
                        object_title: 'Update User',
                        object_id: x.params.userId,
                        size: 'w-1/2'
                    }
                }
            },
            {
                path: 'delete-user/:userId',
                name: 'DeleteUser',
                component: modal_delete_template,
                showInLeftBar: false,
                props: x => {
                    return {
                        vuex_action: 'deleteUserById',
                        vuex_payload: x.params.userId,
                        object_title: 'Delete user'
                    }
                }
            },
        ],
        roles: ['admin']
    },
    // end of users
    {
        path: "/sign-up",
        name: "CreateAccount",
        component: SignUp,
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