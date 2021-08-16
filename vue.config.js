module.exports = {
  transpileDependencies: [
    'vuetify',
  ],
  devServer: {
    proxy: {
      '/ws': {
        target: 'http://localhost:3333',
        ws: true,
      },
    },
  },
};
