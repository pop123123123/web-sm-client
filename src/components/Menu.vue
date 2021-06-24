<template>
    <div class="menu">
<md-menu md-size="auto" md-align-trigger>
      <md-button md-menu-trigger class="md-raised md-primary">{{name}}</md-button>
<!-- TODO fix the height of the menu -->
      <md-menu-content>
        <md-menu-item>Undo</md-menu-item>
        <md-menu-item>Redo</md-menu-item>

        <md-menu-item>Add</md-menu-item>
        <md-menu-item>Remove</md-menu-item>

        <md-menu-item>Move up</md-menu-item>
        <md-menu-item>Move down</md-menu-item>

        <md-menu-item>Copy</md-menu-item>
        <md-menu-item>Paste</md-menu-item>
      </md-menu-content>
    </md-menu>
    </div>
</template>

<script>

export default {
  name: 'Menu',
  props: {
    name: String,
  },
};
</script>
