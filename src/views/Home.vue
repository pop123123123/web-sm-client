<template>
  <div>
    <ProjectPopUp :value="true" @input="$router.push('/panel')" required></ProjectPopUp>
  </div>
</template>

<script>
import ProjectPopUp from '@/components/ProjectPopUp.vue';

export default {
  name: 'Home',
  components: {
    ProjectPopUp,
  },
  data: () => ({
  }),
  methods: {
  },
  computed: {},
};
</script>
