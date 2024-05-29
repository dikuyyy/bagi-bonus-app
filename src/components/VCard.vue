<script setup lang="ts">
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {ref} from "vue";

const props = defineProps<{
  title: string;
}>()

const title = ref<string>(props.title)

</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>{{title}}</CardTitle>
      <CardDescription>
        <slot name="description"></slot>
      </CardDescription>
    </CardHeader>
    <CardContent>
      <slot name="content"></slot>
    </CardContent>
    <CardFooter>
      <slot name="footer"></slot>
    </CardFooter>
  </Card>
</template>