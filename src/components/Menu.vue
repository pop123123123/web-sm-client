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
          <v-list-item-title>{{ item.name }}</v-list-item-title>
          <v-list-item-subtitle>{{ item.shortcut }}</v-list-item-subtitle>
        </v-list-item>
      </v-list>
    </v-menu>
    </div>
</template>

<script>
import action from '@/store/action-types';

export default {
  name: 'Menu',
  props: {
    name: String,
  },
  data() {
    return {
      commands: [
        { name: 'Undo', command: action.command.UNDO, shortcut: 'Ctrl+z' },
        { name: 'Redo', command: action.command.REDO, shortcut: 'Ctrl+y' },
        { name: 'Add', command: action.command.NEW_EMPTY_SENTENCE, shortcut: 'Ctrl+Arrow' },
        { name: 'Remove', command: action.command.DELETE, shortcut: 'Delete' },
        { name: 'Copy', command: action.COPY, shortcut: 'Ctrl+c' },
        { name: 'Paste', command: action.PASTE, shortcut: 'Ctrl+v' },
      ],
    };
  },
  methods: {
    execute(command) {
      this.$store.dispatch(command);
    },
  },
};
</script>
<style lang="scss" scoped>
</style>
