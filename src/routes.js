import Vue from "vue";
import VueRouter from "vue-router";
import Login from "./pages/login";
import Home from "./pages/Home.vue";
import admin_rde_profile from "./pages/admin_rde_profile.vue";
import rde_profile_suggested from "./pages/outbreak/rde_profile_suggested.vue";
import rde_self_profile from "./pages/RDE/rde_self_profile.vue";
import rde_deployments from "./pages/RDE/rde_deployments.vue";
import Deployments from "./pages/deployments/Deployments.vue";
import PartnerStates from "./pages/countries/PartnerStates.vue";
import Regions from "./pages/countries/Regions.vue";
import Outbreak from "./pages/outbreak/Outbreaks.vue";
import DeploymentsPerOutbreak from "./pages/outbreak/DeploymentsPerOutbreak.vue";
import SuggestedRDES from "./pages/outbreak/SuggestedRDES.vue";
import AffectedRegions from "./pages/outbreak/AffectedRegions.vue";
import OutbreakReport from "./pages/outbreak/OutbreakReport.vue";
import Competence from "./pages/competence/Competence.vue";
import QualificationTypes from "./pages/AcademicQualificationTypes/Types.vue";
import OutbreakTypes from "./pages/outbreak/Types.vue";
import Occupation from "./pages/occupations/Occupations.vue";
import OneHealth from "./pages/occupations/OneHealth.vue";
// import UserGroups from "./pages/users/UserGroups.vue";
// import Users from "./pages/users/Users.vue";
import SignUp from "./pages/sign-up.vue";
import SelfRegistrationForm from "./pages/RDE/rde-self-registration-form.vue";
import ForgotPassword from "./pages/forgot-password.vue";
import MyAccount from "./pages/my-account.vue";
import PageNotFound from "./pages/404.vue";
import Landing from "./pages/Landing"
import modal_create_template from "./components/utilities/modal_create_template";
import modal_update_template from "./components/utilities/modal_update_template";
import modal_delete_template from "./components/utilities/modal_delete_template";
import modal_deploy_template from "./components/utilities/modal_deploy_template";
import modal_end_deployment_template from "./components/utilities/modal_end_deployment_template";
import modal_approve_rde_template from "./components/utilities/modal_approve_rde_template";
import modal_disapprove_rde_template from "./components/utilities/modal_disapprove_rde_template";
import modal_upload_cv_template from "./components/utilities/modal_upload_cv_template";
// import store from './store/index'

//schemas
import country_schema from '@/schemas/country_schema.json'
import deploy_rde_schema from '@/schemas/deploy_rde_schema.json'
import deploy_rde_from_suggest_schema from '@/schemas/deploy_rde_from_suggest_schema.json'
import end_rde_deployment_schema from '@/schemas/end_rde_deployment_schema.json'
import region_schema from '@/schemas/region_schema.json'
import outbreak_schema from '@/schemas/outbreak_schema.json'
import outbreak_end_date_schema from '@/schemas/outbreak_end_date_schema.json'
import competence_schema from '@/schemas/competence_schema.json'
import academic_qualification_type from '@/schemas/academic_qualification_type.json'
import add_qualification_schema from '@/schemas/add_qualification_schema.json'
import add_experience_schema from '@/schemas/add_experience_schema.json'
import accept_deployment from '@/schemas/accept_deployment.json'
import activate_account from '@/schemas/activate_account.json'
import deactivate_account from '@/schemas/deactivate_account.json'
import save_filter from '@/schemas/save_filter.json'
import reject_deployment from '@/schemas/reject_deployment.json'
import add_reference_schema from '@/schemas/add_reference_schema.json'
import occupation_schema from '@/schemas/occupation_schema.json'
import one_health_schema from '@/schemas/one_health.json'
// import user_group_schema from '@/schemas/user_group_schema.json'
// import user_schema from '@/schemas/user_schema.json'
import rde_schema from '@/schemas/rde_schema.json'
import recommend_schema from '@/schemas/recommend_schema.json'
import outbreak_type from '@/schemas/outbreak_type.json'


Vue.use(VueRouter);

const routes = [
    {
        path: "/login",
        name: "Login",
        component: Login,
        showInLeftBar: false
    },
    {
      path:"/",
        name:"Landing",
        component: Landing,
        showInLeftBar: false
    },
    //home
    {
        path: "/home",
        name: "home",
        component: Home,
        props: () => {
            return {
            vuex_data_action: 'fetchRDES',
            // table_headings: store.getters['activeLanguage'].store.tables.home_table_headings
            }
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
        roles: ['admin', 'eac_admin', 'country_admin','approver']
    },
    //EAC PROFILE
    {
        path: '/home/profile/:rdeId/:rdeName',
        name: 'adminRdeProfile',
        component: admin_rde_profile,
        showInLeftBar: false,
        props: () => {
            return {
               
            }
        },
        children: [
            // partner state
            {
                path: 'ps-approve-rde',
                name: 'PSApproveRDEfromProfile',
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
                path: 'ps-disapprove-rde',
                name: 'PSDisapproveRDEfromProfile',
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
            // EAC
            {
                path: 'eac-approve-rde',
                name: 'EAC_ApproveRDEfromProfile',
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
                path: 'eac-disapprove-rde',
                name: 'EAC_DisapproveRDEfromProfile',
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
                path: 'update-rde/:rdeId',
                name: 'UpdateRDEfromProfile',
                component: modal_update_template,
                showInLeftBar: false,
                props: x => {
                    return {
                        jsonSchema: rde_schema,
                        vuex_fetch_action: 'fetchRDEById',
                        vuex_save_action: 'updateRDEById',
                        moduleName:'UpdateRDEfromProfile',
                        object_title: `' ${x.params.rdeName}'s ' details`,
                        object_id: x.params.rdeId,
                        optionsList: ['fetchAllOccupations', 'fetchRegions', 'fetchAllCompetencies'],
                        size: 'w-3/4'
                    }

                }
            },
            {
                path: 'deactivate-account',
                name: 'deactivateAccount',
                component: modal_update_template,
                showInLeftBar: false,
                props: x => {
                    return {
                        jsonSchema: rde_schema,
                        // vuex_fetch_action: 'fetchRDEById',
                        // vuex_save_action: 'updateRDEById',
                        object_title: `' ${x.params.rdeName}'s ' details`,
                        object_id: x.params.rdeId,
                        // optionsList: ['fetchAllOccupations', 'fetchRegions', 'fetchAllCompetencies'],
                        size: 'w-3/4'
                    }

                }
            },
            {
                path: 'update-status',
                name: 'UpdateRDEStatus',
                component: modal_delete_template,
                showInLeftBar: false,
                props: x => {
                    return {
                        // vuex_action: 'deleteRDEById',
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
                path: 'end-deployment/:deploymentId/:outbreakName',
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
        roles: ['admin', 'eac_admin']
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
        children: [
            {
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
                path: 'rde-self-update:rdeId',
                name: 'updateRDEPersonalDetails',
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
                path: 'activate-profile/:rdeId/:rdeName',
                name: 'activateProfile',
                component: modal_create_template,
                showInLeftBar: false,
                props: x => {
                    return {
                        jsonSchema:activate_account,
                        vuex_action: 'updateRDEById',
                        moduleAction:'activateProfile',
                        vuex_fetch_action:'',
                        object_id: x.params.rdeId,
                        object_title: x.params.rdeName,
                    }
                }
            },
            {
                path: 'deactivate-profile/:rdeId/:rdeName',
                name: 'deactivateProfile',
                component: modal_create_template,
                showInLeftBar: false,
                props: x => {
                    return {
                        jsonSchema:deactivate_account,
                        vuex_action: 'updateRDEById',
                        moduleAction:'deactivateProfile',
                        object_id: x.params.rdeId,
                        object_title: x.params.rdeName,
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
            },
            // qualification
            {
                path: 'add-qualification/:rdeId/:rdeName',
                name: 'addRDEQualification',
                component: modal_create_template,
                showInLeftBar: false,
                props: x => {
                    return {
                        jsonSchema: add_qualification_schema,
                        vuex_action: 'postRDEQualification',
                        moduleAction:"addRDEQualification",
                        profile: x.params.rdeId,
                        object_title: x.params.rdeName + ' qualification',
                        optionsList: ['fetchAllQualificationTypes'],
                        size: 'max-w-5xl'
                    }
                }
            },
            {
                path: 'update-qualification/:qualificationId/:qualificationName',
                name: 'updateRDEQualification',
                component: modal_update_template,
                showInLeftBar: false,
                props: x => {
                    return {
                        jsonSchema: add_qualification_schema,
                        vuex_fetch_action: 'fetchRDEQualificationById',
                        vuex_save_action: 'updateRDEQualificationById',
                        object_title: `' ${x.params.qualificationName}'s ' qualification`,
                        object_id: x.params.qualificationId,
                        optionsList: ['fetchAllQualificationTypes'],
                        moduleAction:"updateRDEQualification",
                        size: 'w-3/4'
                    }

                }
            },
            {
                path: 'delete-qualification/:qualificationId/:qualificationName',
                name: 'deleteRDEQualification',
                component: modal_delete_template,
                showInLeftBar: false,
                props: x => {
                    return {
                        vuex_action: 'deleteRDEQualificationById',
                        vuex_payload: x.params.qualificationId,
                        object_title: `' ${x.params.qualificationName}'`,
                        object_id: x.params.qualificationId,
                        moduleAction:"deleteRDEQualification",
                        size: 'w-3/4'
                    }

                }
            },
            
            // experience
            {
                path: 'add-experience/:rdeId/:rdeName',
                name: 'addRDEExperience',
                component: modal_create_template,
                showInLeftBar: false,
                props: x => {
                    return {
                        jsonSchema: add_experience_schema,
                        vuex_action: 'postRDEExperienceById',
                        moduleAction:"postRDEExperienceById",
                        allItems:x.params.allItems,
                        object_id: x.params.rdeId,
                        profile: x.params.rdeId,
                        object_title: x.params.rdeName + ' experience',
                        size: 'max-w-5xl'
                    }
                }
            },
            {
                path: 'update-experience/:rdeId/:rdeName/:experienceName/:currentItem',
                name: 'updateRDEExperience',
                component: modal_create_template,
                showInLeftBar: false,
                props: x => {
                    return {
                        jsonSchema: add_experience_schema,
                        currentItem: x.params.currentItem,
                        currentItemIndex: x.params.currentItemIndex,
                        allItems:x.params.allItems,
                        vuex_action: 'postRDEExperienceById',
                        object_title: `' ${x.params.experienceName} update'`,
                        object_id: x.params.rdeId,
                        moduleAction:"updateRDEexperience",
                        size: '1/2'
                    }

                }
            },
            {
                path: 'delete-experience/:rdeId/:rdeName/:experienceName',
                name: 'deleteRDEExperience',
                component: modal_delete_template,
                showInLeftBar: false,
                props: x => {
                    return {
                       
                        experienceName: x.params.experienceName,
                        allItems:x.params.allItems,
                        currentItem: x.params.currentItem,
                        currentItemIndex: x.params.currentItemIndex,
                        vuex_action: 'postRDEExperienceById',
                        object_title: `' ${x.params.experienceName} '`,
                        object_id: x.params.rdeId,
                        vuex_payload:x.params.rdeId,
                        moduleAction:"deleteRDEexperience",
                        size: 'w-3/4'
                    }

                }
            },
            // reference
            {
                path: 'add-reference/:rdeId/:rdeName',
                name: 'addRDEReference',
                component: modal_create_template,
                showInLeftBar: false,
                props: x => {
                    return {
                        jsonSchema: add_reference_schema,
                        vuex_action: 'postRDEExperienceById',
                        moduleAction:"addRDEReference",
                        allItems:x.params.allItems,
                        object_id: x.params.rdeId,
                        profile: x.params.rdeId,
                        object_title: x.params.rdeName + ' reference',
                        size: '1/2'
                    }
                }
            },
            {
                path: 'update-reference/:rdeId/:rdeName/:referenceName/:currentItem',
                name: 'updateRDEReference',
                component: modal_create_template,
                showInLeftBar: false,
                props: x => {
                    return {
                        jsonSchema: add_reference_schema,
                        currentItem: x.params.currentItem,
                        currentItemIndex: x.params.currentItemIndex,
                        allItems:x.params.allItems,
                        vuex_action: 'postRDEExperienceById',
                        object_title: `' ${x.params.referenceName} update'`,
                        object_id: x.params.rdeId,
                        moduleAction:"updateRDEReference",
                        size: '1/2'
                    }

                }
            },
            {
                path: 'delete-reference/:rdeId/:rdeName/:referenceName',
                name: 'deleteRDEReference',
                component: modal_delete_template,
                showInLeftBar: false,
                props: x => {
                    return {
                        referenceName: x.params.referenceName,
                        allItems:x.params.allItems,
                        currentItem: x.params.currentItem,
                        currentItemIndex: x.params.currentItemIndex,
                        vuex_action: 'postRDEExperienceById',
                        object_title: `' ${x.params.referenceName} '`,
                        object_id: x.params.rdeId,
                        vuex_payload:x.params.rdeId,
                        moduleAction:"deleteRDEReference",
                        size: 'w-3/4'
                    }

                }
            },

        ],
        roles: ['rde']
    },   
    
    //rde deployments
    {
        path: '/rde-deployments',
        name: 'RDEDeployments',
        component: rde_deployments,
        showInLeftBar: true,
        icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 5l7 7-7 7"></path></svg>',
        verboseName: 'Deployments',
        props: x => {
            return {
                vuex_data_action: 'fetchRDEById',
                object_id: `?country=${x.params.countryId}`,
                table_headings: ['NAME', 'Country', 'ACTION']
            }
        },
        children: [            
            {
                path: 'accept-deployment/:deploymentId/:outbreakName',
                name: 'acceptDeployment',
                component: modal_create_template,
                showInLeftBar: false,
                props: x => {
                    return {
                        jsonSchema: accept_deployment,
                        vuex_action: 'acceptOrRejectDeploymentById',
                        moduleAction:"acceptDeployment",
                        object_id: x.params.deploymentId,
                        object_title: x.params.outbreakName,
                        size: 'max-w-5xl'
                    }
                }
            },    
            {
                path: 'reject-deployment/:deploymentId/:outbreakName',
                name: 'rejectDeployment',
                component: modal_create_template,
                showInLeftBar: false,
                props: x => {
                    return {
                        jsonSchema: reject_deployment,
                        vuex_action: 'acceptOrRejectDeploymentById',
                        moduleAction:"rejectDeployment",
                        object_id: x.params.deploymentId,
                        object_title: x.params.outbreakName,
                        size: 'max-w-5xl'
                    }
                }
            },         
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
        showInLeftBar: false,

        props:x=>{
            return {
                signUpData:x.params.signUpData
            }
        },
        roles: ['rde']
    },
    //deployments
    {
        path: "/deployments",
        name: "Active Deployments",
        component: Deployments,
        props: {
            // vuex_data_action: 'fetchRDEDeployments',
            vuex_data_action: 'fetchRDES',
            table_headings: ['NAME', 'SPECIALIZATION', 'REGION', 'current deployment', 'COMPETENCE', 'STATUS']

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
        roles: ['admin', 'eac_admin', 'country_admin', 'approver']
    },
    // outbreaks
    {
        path: "/events/",
        name: "Public Health Events",
        component: Outbreak,
        props: {
            vuex_data_action: 'fetchAllOutbreaks',
            table_headings: ['NAME', 'DESCRIPTION', 'DURATION', 'ACTIONS']
        },
        icon: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`,
        children: [{
                path: 'add-event',
                name: 'CreateOutbreak',
                component: modal_create_template,
                showInLeftBar: false,
                props: {
                    jsonSchema: outbreak_schema,
                    vuex_action: 'postOutbreak',
                    object_title: 'Outbreak',
                    size: 'w-1/2',
                    optionsList: ['fetchAllCompetencies', 'fetchRegions','fetchAllOutbreakTypes'],
                    moduleAction:'CreateOutbreak'
                }
            },
            {
                path: 'update-event/:outbreakName/:outbreakId',
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
                        optionsList: ['fetchAllCompetencies', 'fetchRegions','fetchAllOutbreakTypes'],
                        moduleAction:'UpdateOutbreak'

                    }

                }
            },
           
            {
                path: 'event-end-date/:outbreakName/:outbreakId',
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
                path: 'delete-event/:outbreakName/:outbreakId',
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
        roles: ['admin', 'eac_admin']
    },

    // end of outbreaks
    // partner-states
    {
        path: "/partner-states/",
        name: "PartnerStates",
        component: PartnerStates,
        props: {
            vuex_data_action: 'fetchCountries',
            table_headings: ['NAME', 'PHONE CODE', 'TOTAL RDES', 'PENDING APPROVAL','CURRENTLY DEPLOYED', 'ACTION']
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
        roles: ['admin', 'eac_admin']
    },
    // regions
    {
        path: '/partner-states/:countryId/:countryName/regions/',
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
        roles: ['admin', 'eac_admin']
    },

    
    // affected regions
    {
        path: '/events/:outbreakId/:outbreakName/affected-regions',
        name: 'AffectedRegionsPerOutbreak',
        component: AffectedRegions,
        props: (x) => {
            return {
                affectedRegions:x.params.affectedRegions,
                table_headings: ['NAME', 'Country', 'Outbreak']
            }
        },
        showInLeftBar: false,
        children: [
        ],
        roles: ['admin', 'eac_admin']
    },
    // end of affected regions
    // outbreak report
    {
        path: '/events/:outbreakId/:outbreakName/report',
        name: 'OutbreakReport',
        component: OutbreakReport,
        props: (x) => {
            return {
                outbreakId:x.params.outbreakId,
                outbreakName:x.params.outbreakName,
            }
        },
        showInLeftBar: false,
        children: [
        ],
        roles: ['admin', 'eac_admin']
    },
    // end of affected regions
    
    //deployments per outbreak 
    {
        path: '/outbreaks/:outbreakId/:outbreakName/deployments/',
        name: 'DeploymentsPerOutbreak',
        component: DeploymentsPerOutbreak,
        props: x => {
            return {
                vuex_data_action: 'fetchDeploymentsPerOutbreak',
                object_id: x.params.outbreakId,
                table_headings: ['Name', 'Residence', 'Period', 'Status','Contacts']
            }
        },
        showInLeftBar: false,        
        roles: ['admin', 'eac_admin']
    },
    //end of deployments per outbreak 
    //suggested rdes per outbreak 
    {
        path: '/outbreaks/:outbreakId/:outbreakName/suggested-rdes/:eligibility_criteria',
        name: 'SuggestedRDESPerOutbreak',
        component: SuggestedRDES,
        props: (x) => {
            return {
                vuex_data_action: 'suggestRDES',
                object_id: `${x.params.eligibility_criteria}`,
                // object_id: `?competencies=[${x.params.competencies}]`,
                table_headings: ['Name', 'Residence', 'Competencies','Contact','Status', 'Action']
            }
        },    
        children:[  
            {
                path: 'save-filter',
                name: 'saveFilter',
                component: modal_update_template,
                showInLeftBar: false,
                props: x => {
                    return {
                        jsonSchema:save_filter,
                        vuex_save_action: 'updateOutbreakItemById',
                        moduleAction:'saveFilter',
                        vuex_payload: { eligibility_criteria:x.params.eligibility_criteria,id:x.params.outbreakId },
                        object_id: x.params.outbreakId,
                        object_title: x.params.outbreakName,
                    }
                }
            },         
           

        ],    
        showInLeftBar: false,        
        roles: ['admin', 'eac_admin']
    },
    {
        path: '/outbreaks/:outbreakId/:outbreakName/suggested-rdes/:rdeId/:rdeName/profile',
        name: 'ViewProfileFromSuggestions',        
        component: rde_profile_suggested,
        props: () => {
            return {
                
            }
        },       
        children:[
            {
                path: 'deploy',
                name: 'DeployFromSuggestions',
                component: modal_deploy_template,
                showInLeftBar: false,
                props: x => {
                    return {
                        jsonSchema: deploy_rde_from_suggest_schema,
                        moduleAction:'deployRDEFromSuggestions',
                        vuex_save_action: 'deployRDE',
                        object_title: `' ${x.params.rdeName}' ?`,
                        object_id: x.params.rdeId,
                        optionsList: ['fetchOutbreakOptions', 'fetchRegions'],
                        size: 'w-1/2'
                    }

                }
            },
        ], 
        showInLeftBar: false,        
        roles: ['admin', 'eac_admin']
    },
    //end of suggested rdes per outbreak 

    // competence
    {
        path: "/competence/",
        name: "Competence",
        component: Competence,
        props: {
            vuex_data_action: 'fetchAllCompetencies',
            table_headings: ['NAME', 'TYPE', 'CREATED', 'ACTIONS']
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
        roles: ['admin', 'eac_admin']
    },
    // end of competence
    // occupation
    {
        path: "/occupation/",
        name: "Occupation",
        component: Occupation,
        props: {
            vuex_data_action: 'fetchAllOccupations',
            table_headings: ['NAME', 'one health sector', 'description']
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
                    moduleName:'occupation',
                    object_title: 'Add Occupation',
                    size: 'w-1/2',
                    optionsList: ['fetchAllOneHealthSectors']
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
                        object_title: `'${x.params.occupationName}' occupation `,
                        object_id: x.params.occupationId,
                        moduleName:'occupation',
                        size: 'w-1/2',
                        optionsList: ['fetchAllOneHealthSectors']

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
        roles: ['admin', 'eac_admin']
    },
    // end of occupation

    // one health sectors
    {
        path: "/one-health-sectors/",
        name: "OneHealth",
        component: OneHealth,
        props: {
            vuex_data_action: 'fetchAllOneHealthSectors',
            table_headings: ['NAME', 'ACTIONS']
        },
        icon: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>`,
        children: [
            {
                path: 'add-sector',
                name: 'CreateOneHealthSector',
                component: modal_create_template,
                showInLeftBar: false,
                props: {
                    jsonSchema: one_health_schema,
                    vuex_action: 'postSector',
                    object_title: 'Add Sector',
                    size: 'w-1/2',
                    
                }
            },
            {
                path: 'update-sector/:sectorName/:sectorId',
                name: 'UpdateOneHealthSector',
                component: modal_update_template,
                showInLeftBar: false,
                props: x => {
                    return {
                        jsonSchema: one_health_schema,
                        vuex_fetch_action: 'fetchSectorById',
                        vuex_save_action: 'updateSectorById',
                        object_title: x.params.sectorName,
                        object_id: x.params.sectorId,
                        size: 'w-1/2'
                    }

                }
            },
            {
                path: 'delete-sector/:sectorName/:sectorId',
                name: 'DeleteSector',
                component: modal_delete_template,
                showInLeftBar: false,
                props: x => {
                    return {
                        vuex_action: 'deleteSectorById',
                        vuex_payload: x.params.sectorId,
                        object_title: x.params.sectorName
                    }
                }
            },
        ],
        roles: ['admin', 'eac_admin']
    },
    // end of one health sectors
    // qualification types
    {
        path: "/qualification-types/",
        name: "QualificationTypes",
        component: QualificationTypes,
        props: {
            vuex_data_action: 'fetchAllQualificationTypes',
            table_headings: ['NAME', 'CREATED', 'ACTIONS']
        },
        icon: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>`,
        children: [{
                path: 'add-qualification-type',
                name: 'AddQualificationType',
                component: modal_create_template,
                showInLeftBar: false,
                props: {
                    jsonSchema: academic_qualification_type,
                    vuex_action: 'postQualificationType',
                    object_title: 'Qualification Type',
                    size: 'w-1/2',
                    // optionsList: ['fetchAllCompetencies', 'fetchRegions']
                }
            },
            {
                path: 'update-qualification-type/:qualificationTypeName/:qualificationTypeId',
                name: 'UpdateQualificationType',
                component: modal_update_template,
                showInLeftBar: false,
                props: x => {
                    return {
                        jsonSchema: academic_qualification_type,
                        vuex_fetch_action: 'fetchQualificationTypeById',
                        vuex_save_action: 'updateQualificationTypeById',
                        object_title: x.params.qualificationTypeName,
                        object_id: x.params.qualificationTypeId,
                        size: 'w-1/2'
                    }

                }
            },
            {
                path: 'delete-qualification-type/:qualificationTypeName/:qualificationTypeId',
                name: 'DeleteQualificationType',
                component: modal_delete_template,
                showInLeftBar: false,
                props: x => {
                    return {
                        vuex_action: 'deleteQualificationTypeById',
                        vuex_payload: x.params.qualificationTypeId,
                        object_title: x.params.qualificationTypeName
                    }
                }
            },
        ],
        roles: ['admin', 'eac_admin']
    },
    // end of qualification types
    // outbreak types
    {
        path: "/outbreak-types/",
        name: "OutbreakTypes",
        component: OutbreakTypes,
        props: {
            vuex_data_action: 'fetchAllOutbreakTypes',
            table_headings: ['NAME',  'ACTIONS']
        },
        icon: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>`,
        children: [{
                path: 'add-outbreak-type',
                name: 'AddOutbreakType',
                component: modal_create_template,
                showInLeftBar: false,
                props: {
                    jsonSchema: outbreak_type,
                    vuex_action: 'postOutbreakType',
                    object_title: 'Outbreak Type',
                    size: 'w-1/2',
                    // optionsList: ['fetchAllCompetencies', 'fetchRegions']
                }
            },
            {
                path: 'update-outbreak-type/:outbreakTypeName/:outbreakTypeId',
                name: 'UpdateOutbreakType',
                component: modal_update_template,
                showInLeftBar: false,
                props: x => {
                    return {
                        jsonSchema: outbreak_type,
                        vuex_fetch_action: 'fetchOutbreakTypeById',
                        vuex_save_action: 'updateOutbreakTypeById',
                        object_title: x.params.outbreakTypeName,
                        object_id: x.params.outbreakTypeId,
                        size: 'w-1/2',
                        moduleName:'UpdateOutbreakType'
                    }

                }
            },
            {
                path: 'delete-outbreak-type/:outbreakTypeName/:outbreakTypeId',
                name: 'DeleteOutbreakType',
                component: modal_delete_template,
                showInLeftBar: false,
                props: x => {
                    return {
                        vuex_action: 'deleteOutbreakTypeById',
                        vuex_payload: x.params.outbreakTypeId,
                        object_title: x.params.outbreakTypeName
                    }
                }
            },
        ],
        roles: ['admin', 'eac_admin']
    },
    // end of outbreak types

    // user groups
    // {
    //     path: "/user-groups/",
    //     name: "UserGroups",
    //     component: UserGroups,
    //     props: {
    //         vuex_data_action: 'fetchUserGroups',
    //         table_headings: ['NAME', 'ACTIONS']
    //     },
    //     icon: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>`,
    //     children: [{
    //             path: 'create-user-group',
    //             name: 'CreateUserGroup',
    //             component: modal_create_template,
    //             showInLeftBar: false,
    //             props: {
    //                 jsonSchema: user_group_schema,
    //                 vuex_action: 'postUserGroup',
    //                 object_title: 'Add User Group',
    //                 size: 'w-1/2',
    //                 optionsList: []
    //             }
    //         },
    //         {
    //             path: 'update-user-group/:userGroupName/:userGroupId',
    //             name: 'UpdateUserGroup',
    //             component: modal_update_template,
    //             showInLeftBar: false,
    //             props: x => {
    //                 return {
    //                     jsonSchema: user_group_schema,
    //                     vuex_fetch_action: 'fetchUserGroupById',
    //                     vuex_save_action: 'updateUserGroupById',
    //                     object_title: x.params.userGroupName,
    //                     object_id: x.params.userGroupId,
    //                     size: 'w-1/2'
    //                 }
    //             }
    //         },
    //         {
    //             path: 'delete-user-group/:userGroupName/:userGroupId',
    //             name: 'DeleteUserGroup',
    //             component: modal_delete_template,
    //             showInLeftBar: false,
    //             props: x => {
    //                 return {
    //                     vuex_action: 'deleteUserGroupById',
    //                     vuex_payload: x.params.userGroupId,
    //                     object_title: x.params.userGroupName
    //                 }
    //             }
    //         },
    //     ],
    //     roles: ['admin', 'eac_admin']
    // },
    // end of user groups
    // users
    // {
    //     path: "/users/",
    //     name: "Users",
    //     component: Users,
    //     props: {
    //         vuex_data_action: 'fetchUsers',
    //         table_headings: ['USERNAME', 'NAME', 'PHONE NUMBER', 'GROUPS', 'STAFF NUMBER', 'ACTIONS']
    //     },
    //     icon: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`,
    //     children: [{
    //             path: 'create-user',
    //             name: 'CreateUser',
    //             component: modal_create_template,
    //             showInLeftBar: false,
    //             props: {
    //                 jsonSchema: user_schema,
    //                 vuex_action: 'postUser',
    //                 object_title: 'Add User',
    //                 size: 'w-1/2',
    //                 optionsList: []
    //             }
    //         },
    //         {
    //             path: 'update-user/:userId',
    //             name: 'UpdateUser',
    //             component: modal_update_template,
    //             showInLeftBar: false,
    //             props: x => {
    //                 return {
    //                     jsonSchema: user_schema,
    //                     vuex_fetch_action: 'fetchUserById',
    //                     vuex_save_action: 'updateUserById',
    //                     object_title: 'Update User',
    //                     object_id: x.params.userId,
    //                     size: 'w-1/2'
    //                 }
    //             }
    //         },
    //         {
    //             path: 'delete-user/:userId',
    //             name: 'DeleteUser',
    //             component: modal_delete_template,
    //             showInLeftBar: false,
    //             props: x => {
    //                 return {
    //                     vuex_action: 'deleteUserById',
    //                     vuex_payload: x.params.userId,
    //                     object_title: 'Delete user'
    //                 }
    //             }
    //         },
    //     ],
    //     roles: ['admin', 'eac_admin']
    // },
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