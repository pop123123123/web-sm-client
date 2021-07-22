<template>
  <div>
    <v-dialog
      :value="value"
      @input="$emit('input', $event)"
      :persistent="required"
      width="500"
    >
      <v-tabs fixed-tabs color="primary">
        <v-tabs-slider color="primary"></v-tabs-slider>
        <v-tab href="#join"> Join </v-tab>
        <v-tab-item value="join">
          <v-card>
            <v-card-text>
              <JoinPopup @join="$emit('input', false)" />
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab href="#create"> Create </v-tab>
        <v-tab-item value="create">
          <v-card>
            <v-card-text>
              <CreateForm @formValid="$emit('input', false)" />
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab href="#load"> Load </v-tab>
        <v-tab-item value="load">
          <v-card>
            <v-card-text>
              <LoadForm />
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs>
    </v-dialog>
  </div>
</template>

<script>
import CreateForm from '@/components/CreateForm.vue';
import LoadForm from '@/components/LoadForm.vue';
import JoinPopup from './JoinPopup.vue';

export default {
  name: 'ProjectPopUp',
  props: {
    value: Boolean,
    required: Boolean,
  },
  components: {
    CreateForm,
    LoadForm,
    JoinPopup,
  },
};
</script>

<style lang="scss">
</style>
