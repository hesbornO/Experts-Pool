<template>
  <dashboard_layout
    :page_title="`Suggested Rapidly Deployable Experts (RDES) for ${$route.params.outbreakName}`"
  >
    <!-- Suggested rdes -->
    <div>
      <br />
      <!-- filter -->
      <div class="grid grid-cols-8 border-l-4 h-48 overflow-auto bg-white rounded-md p-2 h-full">
        <div class="flex justify-between col-span-8 w-full gap-4">
          <div class="pl-2">
            <span class="font-semibold">Partner State</span><br />
            <span
              v-for="(country, index) in countries"
              :key="index"
              class="flex col-span-1"
            >
              <input
                type="checkbox"
                :value="country.id"
                :ref="`country${country.id}`"
                :id="`country${country.id}`"
                @input="addToFilterString('country', country.id)"
              />
              <label class="pl-1">{{ country.label }}</label>
            </span>
          </div>
          <div class="pl-2">
            <span class="font-semibold">Region</span><br />
            <span
              v-for="(region, index) in regions"
              :key="index"
              class="flex col-span-1"
            >
              <input
                type="checkbox"
                :value="region.id"
                :ref="`region${region.id}`"
                :id="`region${region.id}`"
                @input="addToFilterString('region', region.id)"
              />
              <label class="pl-1">{{ region.name }}</label>
            </span>
          </div>
          
          <div>
            <span class="font-semibold">Gender</span><br />
            <span
              v-for="(item, index) in gender"
              :key="index"
              class="flex col-span-1"
            >
              <input
                type="checkbox"
                :value="item.value"
                :ref="`gender${item.value}`"
                :id="`gender${item.value}`"
                @input="addToFilterString('gender', item.value)"
              />
              <label class="pl-1">{{ item.label }}</label>
            </span>
          </div>
          <div>
            <span class="font-semibold">Occupation</span><br />
            <span v-for="(occupation, index) in occupations" :key="index">
              <input
                type="checkbox"
                :value="occupation.value"
                :ref="`occupation${occupation.value}`"
                :id="`occupation${occupation.value}`"
                @input="addToFilterString('occupation', occupation.value)"
              />
              <label class="pl-1">{{ occupation.label }}</label>
              <br />
            </span>
          </div>
          <div>
            <span class="font-semibold">Religion</span><br />
            <span v-for="(religion, index) in religions" :key="index">
              <input
                type="checkbox"
                :value="religion.value"
                :ref="`religion${religion.value}`"
                :id="`religion${religion.value}`"
                @input="addToFilterString('religion', religion.value)"
              />
              <label class="pl-1">{{ religion.label }}</label>
              <br />
            </span>
          </div>
          <div>
            <span class="font-semibold">Application Status</span><br />
            <div v-for="(status, index) in application_status" :key="index">
              <input
                type="checkbox"
                :value="status.value"
                :ref="`application_status${status.value}`"
                :id="`application_status${status.value}`"
                @input="addToFilterString('application_status', status.value)"
              />
              <label class="pl-1">{{ status.label }}</label>
            </div>
          </div>
          <div>
            <span class="font-semibold">Academic Degree</span><br />
            <div
              v-for="(degree, index) in academic_degree"
              :key="index"
              class="flex col-span-1"
            >
              <input
                type="checkbox"
                :value="degree.value"
                :id="`academic_degree${degree.value}`"
                @input="addToFilterString('academic_degree', degree.value)"
              />
              <label class="pl-1">{{ degree.label }}</label>
            </div>
          </div>
          <div class="pr-2">
            <span class="font-semibold">Competency</span><br />
            <div v-for="(competency, index) in competencies" :key="index">
              <input
                type="checkbox"
                :value="competency.value"
                :ref="`competencies${competency.value}`"
                :id="`competencies${competency.value}`"
                @input="addToFilterString('competencies', competency.value)"
                v-if="competency.type!=='language'"
              />
              <label class="pl-1" v-if="competency.type!=='language'">{{ competency.label }}</label>
            </div>
          </div>
          <div class="pr-2">
            <span class="font-semibold">Language</span><br />
            <div v-for="(competency, index) in competencies" :key="index">
              <input
                type="checkbox"
                :value="competency.value"
                :ref="`competencies${competency.value}`"
                :id="`competencies${competency.value}`"
                @input="addToFilterString('competencies', competency.value)"
                v-if="competency.type==='language'"
              />
              <label class="pl-1" v-if="competency.type==='language'">{{ competency.label }}</label>
            </div>
          </div>
        </div>
      </div>
      <!-- end of filter -->
      <div class="flex justify-end">
        <div class="flex justify-between -mt-16">  
          <router-link
              :to="{name:'saveFilter', params:{outbreakId:$route.params.outbreakId?$route.params.outbreakId:'id',outbreakName:$route.params.outbreakName?$route.params.outbreakName:'name',eligibility_criteria:filterString}}"
              class="btn btn-blue h-1/2 text-xs m-5"
              v-if="userHasSelectedFilterItem"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"></path></svg>
            <span class="px-1">{{activeLanguage.store.rde_self_profile.save_filter}}</span>
          </router-link>       
          <button
            class="flex text-white bg-blue-400 py-2 px-4 m-5 rounded-md"
            @click="filterRDES"
          >
            <svg
              class="w-5 h-5 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              ></path>
            </svg>

            Filter
          </button> 
                   
        </div>
      </div>
    </div>
    <data_table
      v-bind="$attrs"
      :show-back="true"
      v-if="!userHasSelectedFilterItem"
      class="mt-10"
    >
      <template v-slot="{ item }">
        <td class="px-4 py-3 text-sm">
          {{ item.last_name ? item.last_name + ", " : "" }}
          {{ item.first_name ? item.first_name : "" }}
          {{ item.middle_name ? item.middle_name : "" }}
          <span class="text-xs">({{ item.gender==='M' ?'Male':item.gender==='F'?'Female':'Undefined' }})</span>
          
        </td>
        <td class="px-4 py-3 text-sm">
          {{ item.region_of_residence.name }},
          {{ item.region_of_residence.country.name }}
        </td>
        <td class="px-4 py-3 text-sm italic">
          <div v-if="item.competencies_objects">
            <span
              v-for="(competency, index) in item.competencies_objects"
              :key="index"
              class="capitalize flex-auto"
            >
              {{ competency.name ? competency.name.replace("_", " ") : "" }}
              <span v-if="index + 1 < item.competencies_objects.length"
                >,
              </span>
            </span>
          </div>
        </td>

        <td class="px-4 py-3 text-sm">
          <span class="flex flex-row space-x-1 text-blue-500">
            <!-- <span v-if="item.phone"><a :href="`tel:${item.phone}`" title="Click to call">{{item.phone}}</a></span>  -->
            <span v-if="item.email"
              ><a :href="`mailto:${item.email}`" title="Click to mail">{{
                item.email
              }}</a></span
            >
          </span>
        </td>
        <td
          class="
            px-4
            py-3
            text-sm
            capitalize
            text-orange-400
            italic
            font-mono font-semibold
          "
        >
          <span
            :class="[
              'capitalize italic px-4 py-3 text-xs leading-tight font-mono rounded-md  font-semibold',
              item.application_status === 'pending_approval'
                ? 'text-yellow-700  dark:text-yellow-100'
                : item.application_status === 'approved_by_partner_state'
                ? 'text-purple-700  dark:text-purple-100'
                : item.application_status === 'approval_complete'
                ? 'text-green-700  dark:text-green-100'
                : item.application_status === 'deployed'
                ? 'text-purple-700 dark:text-purple-100'
                : '',
            ]"
            >{{
              item.application_status
                ? item.application_status.replace(/[_-]/g, " ")
                : ""
            }}</span
          ><br />
        </td>
        <td
          class="
            px-4
            py-3
            text-sm
            capitalize
            text-orange-400
            italic
            font-mono font-semibold
          "
        >
          <split-button
            :optional="createOptional(item)"
            :primary="createPrimary(item)"
            class="w-32 md:w-48"
          />
        </td>
      </template>
    </data_table>

    <span class="text-blue-500 italic font-mono font-semibold mt-10" v-if="userHasSelectedFilterItem">{{filtered_rdes && filtered_rdes.results?filtered_rdes.results.length:'0'}} record{{filtered_rdes && filtered_rdes.results?(filtered_rdes.results.length>1?'s':''):''}} found.</span>

    <div v-if="userHasSelectedFilterItem">
      <table class="w-full whitespace-no-wrap">
        <thead>
          <tr
            class="
              text-xs
              font-semibold
              tracking-wide
              text-left text-gray-500
              uppercase
              border border-b border-t border-r
              dark:border-gray-700
              bg-gray-50
              dark:text-gray-400 dark:bg-gray-800
            "
          >
            <th class="px-4 py-3 w-2/12">NAME</th>
            <th class="px-4 py-3 w-2/12">RESIDENCE</th>
            <th class="px-4 py-3 w-2/12">COMPETENCIES</th>
            <th class="px-4 py-3 w-2/12">CONTACT</th>
            <th class="px-4 py-3 w-2/12">STATUS</th>
            <th class="px-4 py-3 w-2/12">ACTION</th>
          </tr>
        </thead>
        <tbody
          v-if="
            filtered_rdes &&
            filtered_rdes.results &&
            filtered_rdes.results.length > 0
          "
          class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800"
        >
          <tr
            class="text-gray-700 dark:text-gray-400 border"
            v-for="(item, index) in filtered_rdes.results"
            :key="index"
          >
            <td class="px-4 py-3 text-sm">
              {{ item.last_name ? item.last_name + ", " : "" }}
              {{ item.first_name ? item.first_name : "" }}
              {{ item.middle_name ? item.middle_name : "" }}
            </td>
            <td class="px-4 py-3 text-sm">
              {{ item.region_of_residence.name }},
              {{ item.region_of_residence.country.name }}
            </td>
            <td class="px-4 py-3 text-sm italic">
              <div v-if="item.competencies_objects">
                <span
                  v-for="(competency, index) in item.competencies_objects"
                  :key="index"
                  class="capitalize flex-auto"
                >
                  {{ competency.name ? competency.name.replace("_", " ") : "" }}
                  <span v-if="index + 1 < item.competencies_objects.length"
                    >,
                  </span>
                </span>
              </div>
            </td>

            <td class="px-4 py-3 text-sm">
              <span class="flex flex-row space-x-1 text-blue-500">
                <!-- <span v-if="item.phone"><a :href="`tel:${item.phone}`" title="Click to call">{{item.phone}}</a></span>  -->
                <span v-if="item.email"
                  ><a :href="`mailto:${item.email}`" title="Click to mail">{{
                    item.email
                  }}</a></span
                >
              </span>
            </td>
            <td
              class="
                px-4
                py-3
                text-sm
                capitalize
                text-orange-400
                italic
                font-mono font-semibold
              "
            >
              <span
                :class="[
                  'capitalize italic px-4 py-3 text-xs leading-tight font-mono rounded-md  font-semibold',
                  item.application_status === 'pending_approval'
                    ? 'text-yellow-700  dark:text-yellow-100'
                    : item.application_status === 'approved_by_partner_state'
                    ? 'text-purple-700  dark:text-purple-100'
                    : item.application_status === 'approval_complete'
                    ? 'text-green-700  dark:text-green-100'
                    : item.application_status === 'deployed'
                    ? 'text-purple-700 dark:text-purple-100'
                    : '',
                ]"
                >{{
                  item.application_status
                    ? item.application_status.replace(/[_-]/g, " ")
                    : ""
                }}</span
              ><br />
            </td>
            <td
              class="
                px-4
                py-3
                text-sm
                capitalize
                text-orange-400
                italic
                font-mono font-semibold
              "
            >
              <split-button
                :optional="createOptional(item)"
                :primary="createPrimary(item)"
                class="w-32 md:w-48"
              />
            </td>
          </tr>
        </tbody>
        <tbody
          v-else
          class="bg-white divide-y w-full dark:divide-gray-700 dark:bg-gray-800"
        >
          <tr class="flex justify-center ">
            <td class="text-orange-500">No records found</td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- End of Suggested rdes -->
    <router-view></router-view>
  </dashboard_layout>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import api from "@/api";

import dashboard_layout from "../../components/layouts/dashboard_layout.vue";
import data_table from "../../components/layouts/DataTableTemplate";
import SplitButton from "../../components/buttons/SplitButton.vue";

export default {
  name: "SuggestedRDES",
  components: {
    data_table,
    dashboard_layout,
    SplitButton,
  },
  props: {
    eligibility_criteria: [String],
  },
  data() {
    return {
      filterString: "",
      regions: [],
      countries: [],
      gender: [
        {
          label: "Male",
          value: "M",
        },
        {
          label: "Female",
          value: "F",
        },
      ],
      occupations: [],
      application_status: [
        {
          label: "Pending Approval",
          value: "pending_approval",
        },
        {
          label: "Approved",
          value: "approval_complete",
        },
        {
          label: "Rejected",
          value: "rejected",
        },
      ],
      academic_degree: [],
      competencies: [],
      religions: [
        {
          label: "Christian",
          value: "christian",
        },
        {
          label: "Muslim",
          value: "muslim",
        },
        {
          label: "Buddhist",
          value: "buddhist",
        },
        {
          label: "Atheist",
          value: "atheist",
        },
      ],
      form: {
        name: "",
        country_id: "",
      },
      initial_competencies: [],
      initial_regions: [],
      filtered_rdes: [],
      userHasSelectedFilterItem: false,
    };
  },
  methods: {
    ...mapActions([
      "fetchRegions",
      "fetchCountries",
      "fetchAllOccupations",
      "fetchAllCompetencies",
      "fetchAllQualificationTypes",
    ]),
    getFilterOptions() {
      // regions
      this.$store
        .dispatch("fetchRegions")
        .then((resp) => {
          this.regions = resp;
        })
        .catch((err) => {
          console.log(err);
        })
        .then(() => {
          // countries
          this.$store
            .dispatch("fetchCountries")
            .then((resp) => {
              this.countries = resp;
            })
            .catch((err) => {
              console.log(err);
            })
        .then(() => {
          // occupations
          this.$store
            .dispatch("fetchAllOccupations")
            .then((resp) => {
              this.occupations = resp;
            })
            .catch((err) => {
              console.log(err);
            })
            .then(() => {
              // competencies
              this.$store
                .dispatch("fetchAllCompetencies")
                .then((resp) => {
                  this.competencies = resp;
                })
                .catch((err) => {
                  console.log(err);
                })
                .then(() => {
                  // academic_degree
                  this.$store
                    .dispatch("fetchAllQualificationTypes")
                    .then((resp) => {
                      this.academic_degree = resp;
                    })
                    .catch((err) => {
                      console.log(err);
                    })
                    .then(() => {
                      let initial_filter =
                        this.$route.params.eligibility_criteria
                          .replace("?", "")
                          .replaceAll("=", "")
                          .split("&");
                      this.filterString+=this.$route.params.eligibility_criteria
                      console.log('filterString',this.filterString)  
                      console.log(initial_filter);
                      for (let id of initial_filter) {
                        // this.$refs.id.checked=true
                        console.log("id", id);
                        document.getElementById(id).checked = true;
                      }
                    });
                });
            });
        });
        });
    },
    addToFilterString(label, value) {
      let region = document.getElementById(`${label}${value}`).value;
      if (document.getElementById(`${label}${value}`).checked) {
        if (!this.filterString)
          this.filterString = this.filterString.concat(`${label}=${region}`);
        else {
          if(this.filterString.length===1) this.filterString = this.filterString.concat(`${label}=${region}`);
          else{
            this.filterString = this.filterString.concat(`&${label}=${region}`);
          }
        }

        // console.log('filter string:',this.filterString)
      } else {
        if (this.filterString.includes(`&${label}=${region}`))
          this.filterString = this.filterString.replace(
            `&${label}=${region}`,
            ""
          );
        else {
          if (this.filterString.includes(`${label}=${region}&`))
            this.filterString = this.filterString.replace(
              `${label}=${region}&`,
              ""
            );
          else {
            this.filterString = this.filterString.replace(
              `${label}=${region}`,
              ""
            );
          }
        }
        // console.log('filter string:',this.filterString)
      }
    },
    createPrimary(item) {
      return {
        to: {
          name: "ViewProfileFromSuggestions",
          params: {
            rdeId: item.id,
            rdeName: item.last_name
              ? item.last_name
              : "" + item.first_name
              ? item.first_name
              : "" + item.middle_name
              ? item.middle_name
              : "",
          },
        },
        label: "View Profile",
        icon: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>`,
      };
    },
    createOptional(item) {
      const options = [];
      if (item.active_deployments !== 1) {
        options.push({
          to: {
            name: "DeployFromSuggestions",
            params: {
              rdeId: item.id,
              rdeName: item.last_name
                ? item.last_name
                : "" + item.first_name
                ? item.first_name
                : "" + item.middle_name
                ? item.middle_name
                : "",
            },
          },
          label: "Deploy",
          icon: '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 5l7 7-7 7"></path></svg>',
        });
      }

      return options;
    },
    filterRDES() {
      if (this.filterString) {
        this.userHasSelectedFilterItem = true;
        return new Promise((resolve, reject) => {
          api
            .get("/profile/" + this.filterString)
            .then((resp) => {
              this.filtered_rdes = resp.data;
            })
            .catch((err) => {
              reject(err);
            });
        });
      } else {
        this.filtered_rdes = [];
        this.userHasSelectedFilterItem = false;
      }
    },
  },
  mounted() {
    this.getFilterOptions();
  },
  computed: {
    ...mapGetters(["getErrorMessage", "activeLanguage"]),
  },
};
</script>
