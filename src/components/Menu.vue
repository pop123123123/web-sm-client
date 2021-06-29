<template>
  <div class="text-center">
    <!-- <v-menu offset-y>
      <template v-slot:activator="{ on ,attrs}">
        <v-btn v-bind="attrs" v-on="on">{{ name }} </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
          @click="console.log(index)"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu> -->
    <!-- TODO fix this menu  -->
  </div>
</template>

<script>
export default {
  name: 'Menu',

  props: {
    name: String,
  },
  data() {
    return {
      items: [
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me 2' },
      ],
    };
  },
};
</script>
