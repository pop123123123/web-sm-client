<template>

<div data-app>
    <v-menu offset-y min-width="250">
      <template v-slot:activator="{ on ,attrs}">
        <v-btn v-bind="attrs" v-on="on" text>{{ name }} <v-icon right>expand_more</v-icon></v-btn>
      </template>
      <v-list>
        <template
          v-for="(item, index) in commands"
        >
        <v-list-item
          v-if="item"
          :key="index"
          @click="execute(item.command);"
        >
          <v-list-item-title>{{ item.name }}</v-list-item-title>
          <v-list-item-subtitle style="text-align: end">{{ item.shortcut }}</v-list-item-subtitle>
        </v-list-item>
        <v-divider v-else :key="index"></v-divider>
      </template>
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
        { name: 'Undo', command: action.UNDO, shortcut: 'Ctrl+Z' },
        { name: 'Redo', command: action.REDO, shortcut: 'Ctrl+Y' },
        null,
        { name: 'Add', command: action.command.NEW_EMPTY_SENTENCE, shortcut: 'Ctrl+Arrow' },
        { name: 'Remove', command: action.command.DELETE, shortcut: 'Delete' },
        null,
        { name: 'Copy', command: action.COPY, shortcut: 'Ctrl+C' },
        { name: 'Paste', command: action.PASTE, shortcut: 'Ctrl+V' },
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
