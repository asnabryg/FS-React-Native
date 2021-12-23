/* eslint-disable no-undef */
const { getDefaultConfig } = require('metro-config');

module.exports = (async () => {
    const {
        resolver: { sourceExts },
    } = await getDefaultConfig();
    return {
        transformer: {
            getTransformOptions: async () => ({
                transform: {
                    experimentalImportSupport: false,
                    inlineRequires: true,
                },
            }),
        },
        resolver: {
            sourceExts: [...sourceExts, "jsx", "cjs"],
        },
    };
})();