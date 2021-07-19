<template>
  <div>
    <md-dialog :md-active="popup">
      <md-tabs md-dynamic-height md-alignment="fixed">
        <md-tab md-label="Join">
          <JoinPopup @join="popup = false;$emit('closed');"/>
        </md-tab>
        <md-tab md-label="Create">
          <CreateForm @formValid="popup = false;$emit('closed');"/>
        </md-tab>

        <md-tab md-label="Load">
          <LoadForm />
        </md-tab>
      </md-tabs>
      <md-dialog-actions>
        <md-button
          v-if="!required"
          class="md-primary"
          @click="popup=false;$emit('closed');"
        >
          Close
        </md-button>

      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
import CreateForm from '@/components/CreateForm.vue';
import LoadForm from '@/components/LoadForm.vue';
import JoinPopup from './JoinPopup.vue';

export default {
  name: 'ProjectPopUp',
  props: {
    required: Boolean,
  },
  components: {
    CreateForm,
    LoadForm,
    JoinPopup,
  },
  data: () => ({
    popup: true,
  }),
  methods: {
  },
  computed: {},
};
</script>

<style lang="scss">

</style>
