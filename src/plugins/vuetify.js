import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#3f51b5',
        secondary: '#03a9f4',
        accent: '#9c27b0',
        error: '#f44336',
        warning: '#ffc107',
        info: '#607d8b',
        success: '#4caf50',
      },
    },
  },
  icons: {
    iconfont: 'md',
  },
});
