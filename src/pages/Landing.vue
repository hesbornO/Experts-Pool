<template>
 <div class="bg-white">

  <!-- home section -->
  <section class="">
    <nav class="flex-wrap lg:flex items-center justify-between mb-10 lg:mb-20 shadow-md w-full px-4 py-4">
      <div class="flex items-center justify-between mb-10 lg:mb-0 ">
        <img src="@/assets/img/eac_logo.png" class="h-12" alt="Logo">
        <p class="font-bold text-brandblue">EAC Rapid Deployable Experts Pool</p>
        <button class="flex items-center justify-center border border-brandblue-500 w-10 h-10 text-brandblue rounded-md outline-none lg:hidden ml-auto" @click="navbarOpen = !navbarOpen">
          <i data-feather="menu"></i>
        </button>
      </div>

      <ul class="hidden lg:block lg:flex flex-col lg:flex-row lg:items-center lg:space-x-20" :class="{'hidden':!navbarOpen,'flex':navbarOpen}">
        <li class="font-medium text-brandblue text-lg hover:text-brandblue-300 transition ease-in-out duration-300 mb-5 lg:mb-0">
          <router-link :to="{name:'Login'}" >Login</router-link>
        </li>

        <li class="px-8 py-3 font-medium text-brandblue text-lg text-center border-2 border-brandblue-500 rounded-md hover:bg-brandblue-500 hover:text-white transition ease-linear duration-300">
          <router-link :to="{name:'CreateAccount'}" >Sign Up</router-link>
        </li>
      </ul>
    </nav>

    <div class="container max-w-screen-xl mx-auto">
      <header class="flex-col xl:flex-row flex justify-between px-4">

        <div class="mx-auto text-center xl:text-left xl:mx-0 mb-14 xl:mb-0">
          <h1 class="font-bold text-gray-700 text-3xl md:text-6xl leading-tight mb-5">
            Register to be deployed <br> by the EAC <br> as a rapid responder for Public Health Emergencies or Events
            <!-- Get deployed <br> by the EAC <br> during emergency events -->
            </h1>

          <p class="font-normal text-gray-500 text-sm md:text-lg mb-10">We keep your profile and notify you in the event of a public health event</p>

          <div class="flex items-center justify-center lg:justify-start">
            <a href="#" class="px-8 py-3 bg-brandblue-500 font-medium text-white text-md md:text-lg rounded-md hover:bg-brandblue-700 transition ease-in-out duration-300 mr-14">How to use this platform</a>

          </div>
        </div>

        <div class="mx-auto xl:mx-0">
          <img src="@/assets/img/experts_deployment.jpeg" alt="Image">
        </div>

      </header>

    </div> <!-- container.// -->

  </section>
  <!-- home section //end -->

  <!-- feature section -->
  <section class="py-8 md:py-16">

    <div class="container max-w-screen-xl mx-auto px-4">

      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        <div class="text-center mb-10 xl:mb-0">
          <div class="flex items-center justify-center">
            <div class="w-20 py-7 flex justify-center bg-purple-50 text-purple-500 rounded-md mb-5 md:mb-10">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
          </div>

          <h2 class="font-semibold text-gray-700 text-xl md:text-3xl mb-5"><router-link :to="{name:'CreateAccount'}" >Sign Up</router-link></h2>

          <p class="font-normal text-gray-400 text-sm md:text-lg">Click on the <router-link :to="{name:'CreateAccount'}" class="text-blue-400">Sign Up</router-link> button to create your account</p>
        </div>

        <div class="text-center mb-10 md:mb-0">
          <div class="flex items-center justify-center">
            <div class="w-20 py-7 flex justify-center bg-red-50 text-red-500 rounded-md mb-5 md:mb-10">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
              </svg>
            </div>
          </div>

          <h2 class="font-semibold text-gray-700 text-xl md:text-3xl mb-5">Add details to your profile</h2>

          <p class="font-normal text-gray-400 text-sm md:text-lg">We require your contact details, academic qualifications, work experience and availability information to add you to our pool of experts.</p>
        </div>

        <div class="text-center">
          <div class="flex items-center justify-center">
            <div class="w-20 py-7 flex justify-center bg-blue-50 text-blue-500 rounded-md mb-5 md:mb-10">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
          </div>

          <h2 class="font-semibold text-gray-700 text-xl md:text-3xl mb-5">Receive Deployment Requests</h2>

          <p class="font-normal text-gray-400 text-sm md:text-lg">You will be notified in the event that a <strong>public health event</strong>  occurs. Your deployment will be confirmed
          if you are available and meet the requirements</p>
        </div>
      </div>

    </div> <!-- container.// -->

  </section>
  <!-- feature section //end -->

  <section class="py-8 md:py-16">

    <div class="container max-w-screen-xl mx-auto px-4">

      <h1 class="font-semibold text-gray-700 text-3xl md:text-4xl text-center mb-5">How are experts selected?</h1>

      <p class="font-normal text-gray-500 text-md md:text-lg text-center mb-20 ">Experts are selected depending on availability, academic qualifications, work experience and any other factors decided by the EAC</p>

<!--      <div class="flex flex-col xl:flex-row items-center justify-between mb-20 md:mb-40">-->
<!--        <div class="mx-auto xl:mx-0 mb-20 xl:mb-0">-->
<!--          <img src="assets/image/image-1.svg" alt="Image">-->
<!--        </div>-->

<!--&lt;!&ndash;        <div class="mx-auto xl:mx-0 text-center xl:text-left">&ndash;&gt;-->
<!--&lt;!&ndash;          <h1 class="font-bold text-gray-700 text-3xl md:text-4xl mb-10">Design is our most intense <br> process</h1>&ndash;&gt;-->

<!--&lt;!&ndash;          <p class="font-normal text-gray-400 text-sm md:text-lg mb-5">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum <br> dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat <br> non proident, sunt in culpa qui officia deserunt mollit anim id est <br> laborum.</p>&ndash;&gt;-->

<!--&lt;!&ndash;          <a href="#" class="flex items-center justify-center xl:justify-start font-semibold text-brandblue text-lg gap-3 hover:text-brandblue-700 transition ease-in-out duration-300">&ndash;&gt;-->
<!--&lt;!&ndash;            See more&ndash;&gt;-->
<!--&lt;!&ndash;            <i data-feather="chevron-right"></i>&ndash;&gt;-->
<!--&lt;!&ndash;          </a>&ndash;&gt;-->
<!--&lt;!&ndash;        </div>&ndash;&gt;-->
<!--      </div>-->

<!--      <div class="flex flex-col xl:flex-row items-center justify-between mb-20 md:mb-40">-->
<!--        <div class="mx-auto xl:mx-0 text-center xl:text-left mb-20 xl:mb-0">-->
<!--          <h1 class="font-bold text-gray-700 text-3xl md:text-4xl mb-10">Don’t worry about the investment, <br> it will come back.</h1>-->

<!--          <p class="font-normal text-gray-400 text-sm md:text-lg mb-5">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum <br> dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat <br> non proident, sunt in culpa qui officia deserunt mollit anim id est <br> laborum.</p>-->

<!--          <a href="#" class="flex items-center justify-center xl:justify-start font-semibold text-brandblue text-lg gap-3 hover:text-brandblue-700 transition ease-in-out duration-300">-->
<!--            See more-->
<!--            <i data-feather="chevron-right"></i>-->
<!--          </a>-->
<!--        </div>-->

<!--        <div class="mx-auto xl:mx-0">-->
<!--          <img src="assets/image/image-2.svg" alt="Image">-->
<!--        </div>-->
<!--      </div>-->

<!--      <div class="flex flex-col xl:flex-row items-center justify-between">-->
<!--        <div class="mx-auto xl:mx-0 mb-20 xl:mb-0">-->
<!--          <img src="assets/image/image-3.svg" alt="Image">-->
<!--        </div>-->

<!--        <div class="mx-auto xl:mx-0 text-center xl:text-left">-->
<!--          <h1 class="font-bold text-gray-700 text-3xl md:text-4xl mb-10">Instantly understandable content <br> is important</h1>-->

<!--          <p class="font-normal text-gray-400 text-sm md:text-lg mb-5">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum <br> dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat <br> non proident, sunt in culpa qui officia deserunt mollit anim id est <br> laborum.</p>-->

<!--          <a href="#" class="flex items-center justify-center xl:justify-start font-semibold text-brandblue text-lg gap-3 hover:text-brandblue-700 transition ease-in-out duration-300">-->
<!--            See more-->
<!--            <i data-feather="chevron-right"></i>-->
<!--          </a>-->
<!--        </div>-->
<!--      </div>-->

    </div> <!-- container.// -->

  </section>
  <section class="py-8 md:py-16">

    <div class="container max-w-screen-xl mx-auto px-4">

      <h1 class="font-semibold text-gray-700 text-3xl md:text-4xl text-center mb-5">Background</h1>

      <p class="font-normal text-gray-500 text-md md:text-lg text-center mb-20 ">
        The East African Community (EAC) is prone to public health emergencies such as outbreaks of contagious and life-threatening diseases (SARS, Ebola, COVID-19, etc), natural disasters (droughts, floods and chemical contamination of the environment), among others. In such emergencies, large numbers of people may require medical attention, overwhelming the health system. Considering the frequency and occurrence of disease outbreaks in the EAC region, there is a need to build the regional capacity to respond to outbreaks in line with the International Health Regulations (IHR 2005). It is against this background that the EAC Secretariat decided to establish an EAC Regional Pool of rapidly deployable Experts to respond to public health emergencies. This system has been developed to manage this pool of the rapidly deployable experts. 
The purpose of this system is to support an expert through the process of application, recruitment, deployment and Post-Deployment Phase. The experts may be sought from within the country of the emergency, the region or the continent. They will be deployed according to their competencies for emergencies at hand. The selected experts will reflect the multisectoral and multidisciplinary “One Health” approach that promotes the attainment optimal health for people, animals and the environment.
      </p>

<!--      <div class="flex flex-col xl:flex-row items-center justify-between mb-20 md:mb-40">-->
<!--        <div class="mx-auto xl:mx-0 mb-20 xl:mb-0">-->
<!--          <img src="assets/image/image-1.svg" alt="Image">-->
<!--        </div>-->

<!--&lt;!&ndash;        <div class="mx-auto xl:mx-0 text-center xl:text-left">&ndash;&gt;-->
<!--&lt;!&ndash;          <h1 class="font-bold text-gray-700 text-3xl md:text-4xl mb-10">Design is our most intense <br> process</h1>&ndash;&gt;-->

<!--&lt;!&ndash;          <p class="font-normal text-gray-400 text-sm md:text-lg mb-5">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum <br> dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat <br> non proident, sunt in culpa qui officia deserunt mollit anim id est <br> laborum.</p>&ndash;&gt;-->

<!--&lt;!&ndash;          <a href="#" class="flex items-center justify-center xl:justify-start font-semibold text-brandblue text-lg gap-3 hover:text-brandblue-700 transition ease-in-out duration-300">&ndash;&gt;-->
<!--&lt;!&ndash;            See more&ndash;&gt;-->
<!--&lt;!&ndash;            <i data-feather="chevron-right"></i>&ndash;&gt;-->
<!--&lt;!&ndash;          </a>&ndash;&gt;-->
<!--&lt;!&ndash;        </div>&ndash;&gt;-->
<!--      </div>-->

<!--      <div class="flex flex-col xl:flex-row items-center justify-between mb-20 md:mb-40">-->
<!--        <div class="mx-auto xl:mx-0 text-center xl:text-left mb-20 xl:mb-0">-->
<!--          <h1 class="font-bold text-gray-700 text-3xl md:text-4xl mb-10">Don’t worry about the investment, <br> it will come back.</h1>-->

<!--          <p class="font-normal text-gray-400 text-sm md:text-lg mb-5">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum <br> dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat <br> non proident, sunt in culpa qui officia deserunt mollit anim id est <br> laborum.</p>-->

<!--          <a href="#" class="flex items-center justify-center xl:justify-start font-semibold text-brandblue text-lg gap-3 hover:text-brandblue-700 transition ease-in-out duration-300">-->
<!--            See more-->
<!--            <i data-feather="chevron-right"></i>-->
<!--          </a>-->
<!--        </div>-->

<!--        <div class="mx-auto xl:mx-0">-->
<!--          <img src="assets/image/image-2.svg" alt="Image">-->
<!--        </div>-->
<!--      </div>-->

<!--      <div class="flex flex-col xl:flex-row items-center justify-between">-->
<!--        <div class="mx-auto xl:mx-0 mb-20 xl:mb-0">-->
<!--          <img src="assets/image/image-3.svg" alt="Image">-->
<!--        </div>-->

<!--        <div class="mx-auto xl:mx-0 text-center xl:text-left">-->
<!--          <h1 class="font-bold text-gray-700 text-3xl md:text-4xl mb-10">Instantly understandable content <br> is important</h1>-->

<!--          <p class="font-normal text-gray-400 text-sm md:text-lg mb-5">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum <br> dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat <br> non proident, sunt in culpa qui officia deserunt mollit anim id est <br> laborum.</p>-->

<!--          <a href="#" class="flex items-center justify-center xl:justify-start font-semibold text-brandblue text-lg gap-3 hover:text-brandblue-700 transition ease-in-out duration-300">-->
<!--            See more-->
<!--            <i data-feather="chevron-right"></i>-->
<!--          </a>-->
<!--        </div>-->
<!--      </div>-->

    </div> <!-- container.// -->

  </section>

<!--  <section class="py-8 md:py-16">-->

<!--    <div class="container max-w-screen-xl mx-auto px-4">-->

<!--      <h1 class="font-semibold text-gray-700 text-3xl md:text-4xl text-center mb-5">Our works</h1>-->

<!--      <p class="font-normal text-gray-500 text-md md:text-lg text-center mb-20">Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit <br> anim id est laborum.</p>-->

<!--      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 xl:gap-10">-->
<!--        <div class="space-y-2 xl:space-y-4">-->
<!--          <img src="assets/image/yoga-1.svg" alt="Image" class="hover:opacity-75 transition ease-in-out duration-300">-->

<!--          <p class="font-normal text-gray-400 text-base">Design, Branding, Development</p>-->

<!--          <a href="#" class="block font-semibold text-gray-700 text-xl md:text-2xl hover:text-brandblue transition ease-in-out duration-300">Yoga School</a>-->
<!--        </div>-->

<!--        <div class="space-y-2 xl:space-y-4">-->
<!--          <img src="assets/image/yoga-2.svg" alt="Image" class="hover:opacity-75 transition ease-in-out duration-300">-->

<!--          <p class="font-normal text-gray-400 text-base">Design, Branding, Development</p>-->

<!--          <a href="#" class="block font-semibold text-gray-700 text-xl md:text-2xl hover:text-brandblue transition ease-in-out duration-300">Yoga School</a>-->
<!--        </div>-->

<!--        <div class="space-y-2 xl:space-y-4">-->
<!--          <img src="assets/image/yoga-3.svg" alt="Image" class="hover:opacity-75 transition ease-in-out duration-300">-->

<!--          <p class="font-normal text-gray-400 text-base">Design, Branding, Development</p>-->

<!--          <a href="#" class="block font-semibold text-gray-700 text-xl md:text-2xl hover:text-brandblue transition ease-in-out duration-300">Yoga School</a>-->
<!--        </div>-->

<!--        <div class="space-y-2 xl:space-y-4">-->
<!--          <img src="assets/image/yoga-3.svg" alt="Image" class="hover:opacity-75 transition ease-in-out duration-300">-->

<!--          <p class="font-normal text-gray-400 text-base">Design, Branding, Development</p>-->

<!--          <a href="#" class="block font-semibold text-gray-700 text-xl md:text-2xl hover:text-brandblue transition ease-in-out duration-300">Yoga School</a>-->
<!--        </div>-->

<!--        <div class="space-y-2 xl:space-y-4">-->
<!--          <img src="assets/image/yoga-1.svg" alt="Image" class="hover:opacity-75 transition ease-in-out duration-300">-->

<!--          <p class="font-normal text-gray-400 text-base">Design, Branding, Development</p>-->

<!--          <a href="#" class="block font-semibold text-gray-700 text-xl md:text-2xl hover:text-brandblue transition ease-in-out duration-300">Yoga School</a>-->
<!--        </div>-->

<!--        <div class="space-y-2 xl:space-y-4 mb-10 md:mb-20">-->
<!--          <img src="assets/image/yoga-2.svg" alt="Image" class="hover:opacity-75 transition ease-in-out duration-300">-->

<!--          <p class="font-normal text-gray-400 text-base">Design, Branding, Development</p>-->

<!--          <a href="#" class="block font-semibold text-gray-700 text-xl md:text-2xl hover:text-brandblue transition ease-in-out duration-300">Yoga School</a>-->
<!--        </div>-->
<!--      </div>-->

<!--      <div class="flex justify-center mb-20 md:mb-40">-->
<!--        <a href="#" class="px-6 py-2 md:px-8 md:py-3 flex items-center gap-3 font-medium text-brandblue text-lg border-2 border-brandblue-500 rounded-md hover:bg-brandblue-500 hover:text-white transition ease-linear duration-300">-->
<!--          See more works-->
<!--          <i data-feather="arrow-up-right"></i>-->
<!--        </a>-->
<!--      </div>-->

<!--      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 ml-4 md:ml-20 xl:ml-0 mb-20 xl:mb-40">-->
<!--        <img src="assets/image/brand-1.svg" alt="Image" class="mb-5 md:mb-10 xl:mb-0">-->

<!--        <img src="assets/image/brand-2.svg" alt="Image" class="mb-5 md:mb-0">-->

<!--        <img src="assets/image/brand-3.svg" alt="Image" class="mb-5 md:mb-10 xl:mb-0">-->

<!--        <img src="assets/image/brand-4.svg" alt="Image" class="mb-5 md:mb-0">-->
<!--      </div>-->

<!--      <div class="flex flex-wrap md:flex-nowrap justify-between mb-8">-->
<!--        <div>-->
<!--          <p class="font-normal text-gray-500 text-md md:text-lg uppercase mb-3">Let's tealk</p>-->

<!--          <h1 class="font-bold text-gray-700 text-xl md:text-4xl">Do you have any Project?</h1>-->
<!--        </div>-->

<!--        <div class="mt-10">-->
<!--          <a href="#" class="px-4 py-2 md:px-8 md:py-3 font-medium text-brandblue text-lg border-2 border-brandblue-500 rounded-md hover:bg-brandblue-500 hover:text-white transition ease-linear duration-300">-->
<!--            Contact us now-->
<!--          </a>-->
<!--        </div>-->
<!--      </div>-->

<!--      <hr class="text-gray-300 mb-8">-->

<!--      <p class="font-normal text-gray-500 text-md md:text-lg mb-4 md:mb-10">Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit <br> anim id est laborum.</p>-->

<!--    </div> &lt;!&ndash; container.// &ndash;&gt;-->

<!--  </section>-->

  <footer class="bg-brandblue-50">

    <div class="container max-w-screen-xl mx-auto px-4 py-2">
      <p class="font-normal text-md text-center">&copy; {{new Date().getFullYear()}} EAC. All rights reserved.</p>
    </div> <!-- container.// -->

  </footer>
  </div>
</template>

<script>
export default {
  name: "Landing"
}
</script>

<style scoped>

</style>