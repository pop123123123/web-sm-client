<template>

<div data-app>

    <v-menu offset-y min-width="250">
      <template v-slot:activator="{ on ,attrs}">
        <v-btn v-bind="attrs" v-on="on">{{ name }} </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(item, index) in commands"
          :key="index"
          @click="execute(item.command);"
        >
          <v-list-item-title>{{ item.command }}</v-list-item-title>
          <v-list-item-subtitle>{{ item.shortcut }}</v-list-item-subtitle>
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
      commands: [
        { command: 'Undo', shortcut: 'Ctrl+z' },
        { command: 'Redo', shortcut: 'Ctrl+y' },
        { command: 'Add', shortcut: 'Ctrl+Arrow' },
        { command: 'Remove', shortcut: 'Delete' },
        { command: 'Copy', shortcut: 'Ctrl+c' },
        { command: 'Paste', shortcut: 'Ctrl+v' },
      ],
    };
  },
  methods: {
    execute(name) {
      switch (name) {
        case 'Undo':
          //
          break;
        case 'Redo':
          //
          break;
        case 'Add':
          this.$store.dispatch('NEW_EMPTY_SENTENCE', this.$store.state.segments.length);
          break;
        case 'Remove':
          this.$store.dispatch('DELETE_SELECTED'); // TODO don't reset the visual selection on panelTable
          break;
        case 'Copy':
          this.$store.dispatch('COPY');
          break;
        case 'Paste':
          this.$store.dispatch('PASTE');
          break;
        default:
          break;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
</style>
