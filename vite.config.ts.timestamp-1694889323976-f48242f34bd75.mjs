// vite.config.ts
import { defineConfig } from "file:///C:/Users/3dyuv/Documents/GitHub/vue-blood-donation/node_modules/vite/dist/node/index.js";
import vue from "file:///C:/Users/3dyuv/Documents/GitHub/vue-blood-donation/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import * as path from "path";
import ssr from "file:///C:/Users/3dyuv/Documents/GitHub/vue-blood-donation/node_modules/vite-plugin-ssr/dist/esm/node/plugin/index.js";
var __vite_injected_original_dirname = "C:\\Users\\3dyuv\\Documents\\GitHub\\vue-blood-donation";
var noExternal = process.env.NODE_ENV !== "production" ? [] : ["primevue"];
var vite_config_default = defineConfig({
  plugins: [
    vue(),
    ssr({
      includeAssetsImportedByServer: true
    })
  ],
  resolve: {
    alias: [{ find: "@", replacement: path.resolve(__vite_injected_original_dirname, "src") }]
  },
  ssr: { noExternal },
  build: {
    emptyOutDir: true
  }
  //  optimizeDeps: {
  //   include: ['@fawmi/vue-google-maps/**/*.js', 'fast-deep-equal'],
  //    esbuildOptions: {
  //     tsconfig: path.resolve(__dirname, 'tsconfig.json'),
  //    },
  //    disabled: false,
  //    force: true,
  //    needsInterop: ['@fawmi/vue-google-maps/'],
  // }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFwzZHl1dlxcXFxEb2N1bWVudHNcXFxcR2l0SHViXFxcXHZ1ZS1ibG9vZC1kb25hdGlvblwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcM2R5dXZcXFxcRG9jdW1lbnRzXFxcXEdpdEh1YlxcXFx2dWUtYmxvb2QtZG9uYXRpb25cXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzLzNkeXV2L0RvY3VtZW50cy9HaXRIdWIvdnVlLWJsb29kLWRvbmF0aW9uL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcclxuaW1wb3J0IHR5cGUgeyBVc2VyQ29uZmlnRXhwb3J0IH0gZnJvbSAndml0ZSdcclxuaW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXHJcbmltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCdcclxuaW1wb3J0IHNzciBmcm9tICd2aXRlLXBsdWdpbi1zc3IvcGx1Z2luJ1xyXG5cclxuY29uc3Qgbm9FeHRlcm5hbCA9IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBbXSA6IFsncHJpbWV2dWUnXVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICBwbHVnaW5zOiBbXHJcbiAgICB2dWUoKSxcclxuICAgIHNzcih7XHJcbiAgICAgIGluY2x1ZGVBc3NldHNJbXBvcnRlZEJ5U2VydmVyOiB0cnVlLFxyXG4gICAgfSksXHJcbiAgXSxcclxuICByZXNvbHZlOiB7XHJcbiAgICBhbGlhczogW3sgZmluZDogJ0AnLCByZXBsYWNlbWVudDogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ3NyYycpIH1dLFxyXG4gIH0sXHJcbiAgc3NyOiB7IG5vRXh0ZXJuYWwgfSxcclxuICBidWlsZDoge1xyXG4gICAgZW1wdHlPdXREaXI6IHRydWUsXHJcbiAgfSxcclxuICAvLyAgb3B0aW1pemVEZXBzOiB7XHJcbiAgLy8gICBpbmNsdWRlOiBbJ0BmYXdtaS92dWUtZ29vZ2xlLW1hcHMvKiovKi5qcycsICdmYXN0LWRlZXAtZXF1YWwnXSxcclxuICAvLyAgICBlc2J1aWxkT3B0aW9uczoge1xyXG4gIC8vICAgICB0c2NvbmZpZzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ3RzY29uZmlnLmpzb24nKSxcclxuICAvLyAgICB9LFxyXG4gIC8vICAgIGRpc2FibGVkOiBmYWxzZSxcclxuICAvLyAgICBmb3JjZTogdHJ1ZSxcclxuICAvLyAgICBuZWVkc0ludGVyb3A6IFsnQGZhd21pL3Z1ZS1nb29nbGUtbWFwcy8nXSxcclxuICAvLyB9XHJcbn0pIHNhdGlzZmllcyBVc2VyQ29uZmlnRXhwb3J0XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBb1YsU0FBUyxvQkFBb0I7QUFFalgsT0FBTyxTQUFTO0FBQ2hCLFlBQVksVUFBVTtBQUN0QixPQUFPLFNBQVM7QUFKaEIsSUFBTSxtQ0FBbUM7QUFNekMsSUFBTSxhQUFhLFFBQVEsSUFBSSxhQUFhLGVBQWUsQ0FBQyxJQUFJLENBQUMsVUFBVTtBQUUzRSxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxJQUFJO0FBQUEsSUFDSixJQUFJO0FBQUEsTUFDRiwrQkFBK0I7QUFBQSxJQUNqQyxDQUFDO0FBQUEsRUFDSDtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsT0FBTyxDQUFDLEVBQUUsTUFBTSxLQUFLLGFBQWtCLGFBQVEsa0NBQVcsS0FBSyxFQUFFLENBQUM7QUFBQSxFQUNwRTtBQUFBLEVBQ0EsS0FBSyxFQUFFLFdBQVc7QUFBQSxFQUNsQixPQUFPO0FBQUEsSUFDTCxhQUFhO0FBQUEsRUFDZjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQVVGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
