<script setup lang="ts">
import {Notifications} from "@kyvg/vue3-notification";
</script>

<template>
  <component :is="$route.meta.layout">
    <RouterView></RouterView>
  </component>
  <notifications position="bottom center" />
</template>

<style scoped></style>