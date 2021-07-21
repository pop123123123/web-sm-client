<template>
  <div>
      <v-dialog v-model="popup" width="500" persistent>
        <v-card>
          <v-tabs fixed-tabs color="primary">
            <v-tabs-slider color="primary"></v-tabs-slider>
            <v-tab href="#join"> Join </v-tab>
            <v-tab-item value="join">
              <v-card>
                <v-card-text>
                  <JoinPopup
                    @join="
                      popup = false;
                      $emit('closed');
                    "
                  />
                </v-card-text>
              </v-card>
            </v-tab-item>
            <v-tab href="#create"> Create </v-tab>
            <v-tab-item value="create">
              <v-card>
                <v-card-text>
                  <CreateForm
                    @formValid="
                      popup = false;
                      $emit('closed');
                    "
                  />
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
         <v-card elevation="0">
           <v-card-actions>
             <v-spacer></v-spacer>
             <v-btn
          outlined
            v-if="!required"
            @click="
              popup = false;
              $emit('closed');
            "
          >
            Close
          </v-btn>
           </v-card-actions>

          </v-card>
        </v-card>
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
  methods: {},
  computed: {},
};
</script>

<style lang="scss">
</style>
