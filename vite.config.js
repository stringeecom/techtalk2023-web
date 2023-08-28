import {fileURLToPath, URL} from 'node:url'

import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import mkcert from 'vite-plugin-mkcert'


// https://vitejs.dev/config/
export default defineConfig({

    server: { https: true },
    plugins: [vue(), vueJsx(), mkcert()],
    // plugins: [vue(), vueJsx()],
    resolve: {
        alias: {
            '@src': fileURLToPath(new URL('./src', import.meta.url))
        }
    },

})
