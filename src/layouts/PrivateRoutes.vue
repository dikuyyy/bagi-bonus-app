<script setup lang="ts">
import Home from '@/assets/icons/home.svg'
import Calc from '@/assets/icons/calc.svg'
import {ref} from "vue";

type MenuList = {
  readonly name: string,
  readonly to: string,
  readonly icon: string
}

const menuList: MenuList[] = [
  {
    name: 'Beranda',
    to: 'home-page',
    icon: Home
  },
  {
    name: 'Hitung Bagi Bonus',
    to: 'bagi-bonus',
    icon: Calc
  }
]

const collapse = ref<boolean>(false);
</script>

<template>
  <div class="relative w-[100vw] h-[100vh]">
    <div class="overflow-hidden fixed bg-white text-gray-700 h-[100vh] w-full max-w-[20rem] p-4 shadow-xl duration-300" :class="{'left-[-20rem]': collapse}">
      <div class="mb-2 p-4">
        <h5 class="block antialiased tracking-normal font-sans text-xl font-semibold leading-snug text-gray-900">
          Bagi Bonus App</h5>
        <nav class="flex flex-col mt-12 gap-1 min-w-[240px]">
          <router-link class="w-full cursor-pointer text-gray-900 py-3 gap-4 hover:bg-blue-50 hover:text-blue-800 duration-200 ease-in rounded-xl pl-4 flex"
                       v-for="(menu, index) in menuList" :key="index" :to="{ name: menu.to }"
                       active-class="text-blue-800"
          >
            <img :src="menu.icon" alt="Home" width="20"/>
            <div>{{ menu.name }}</div>
          </router-link>
        </nav>
      </div>
    </div>
    <div class="ml-[20rem]">
      <router-view/>
    </div>
  </div>
</template>

<style scoped></style>