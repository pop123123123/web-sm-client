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
        { name: 'Undo', command: 'COMMAND_UNDO', shortcut: 'Ctrl+z' },
        { name: 'Redo', command: 'COMMAND_REDO', shortcut: 'Ctrl+y' },
        { name: 'Add', command: 'COMMAND_ADD', shortcut: 'Ctrl+Arrow' },
        { name: 'Remove', command: 'COMMAND_DELETE', shortcut: 'Delete' },
        { name: 'Copy', command: 'COPY', shortcut: 'Ctrl+c' },
        { name: 'Paste', command: 'PASTE', shortcut: 'Ctrl+v' },
      ],
    };
  },
  methods: {
    execute(command) {
      if (command === 'COMMAND_ADD') {
        this.$store.dispatch(action.command.NEW_EMPTY_SENTENCE, this.$store.state.segments.length);
      } else {
        this.$store.dispatch(command);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
</style>
