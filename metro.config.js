module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    })
  },
  // resolver: {
  //   blacklistRE: blacklist([
  //     /nodejs-assets\/.*/,
  //     /android\/.*/,
  //     /ios\/.*/,
  //   ]),
  // },
};
