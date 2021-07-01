<template>

<div data-app>

    <v-menu offset-y min-width="250">
      <template v-slot:activator="{ on ,attrs}">
        <v-btn v-bind="attrs" v-on="on">{{ name }} </v-btn>
        <!-- TODO change color of the button -->
      </template>
      <v-list>
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
          @click="execute(item.command)"
        >
          <v-list-item-title>{{ item.command }}</v-list-item-title>
          <v-list-item-subtitle>{{ item.shortcuts }}</v-list-item-subtitle>
        </v-list-item>
      </v-list>
    </v-menu>
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
        { command: 'Undo', shortcuts: 'Ctrl+z' },
        { command: 'Redo', shortcuts: 'Ctrl+y' },
        { command: 'Add', shortcuts: 'Ctrl+Arrow' },
        { command: 'Remove', shortcuts: 'Delete' },
        { command: 'Copy', shortcuts: 'Ctrl+c' },
        { command: 'Paste', shortcuts: 'Ctrl+v' },
      ],
    };
  },
  methods: {
    execute(name) {
      this.$store.dispatch('MENU_ACTION', name);
    },
  },
};
</script>
<style lang="scss" scoped>
</style>
