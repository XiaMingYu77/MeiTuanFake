import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';



// https://vitejs.dev/config/
// export default defineConfig({

//   plugins: [
//     vue(),
//     Components({
//       resolvers: [VantResolver()],
//     }),
//   ],
//   resolve: {
//     alias: {
//       '@': fileURLToPath(new URL('./src', import.meta.url))
//     }
//   },

// })

export default (({ command, mode, ssrBuild }: any) => {
  const env = loadEnv(mode, process.cwd());

  return defineConfig({
    plugins: [
      vue(),
      Components({
        resolvers: [VantResolver()],
      }),
    ],
    base: env.VITE_BASE_PATH,
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
  })
})
