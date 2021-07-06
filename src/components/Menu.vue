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
        { name: 'Add', command: 'COMMAND_NEW_EMPTY_SENTENCE', shortcut: 'Ctrl+Arrow' },
        { name: 'Remove', command: 'COMMAND_DELETE', shortcut: 'Delete' },
        { name: 'Copy', command: 'COPY', shortcut: 'Ctrl+c' },
        { name: 'Paste', command: 'PASTE', shortcut: 'Ctrl+v' },
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
