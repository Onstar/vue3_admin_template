import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended' // ⭐ 必须加

import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
    globalIgnores(['dist/', '**/node_modules/']),
    {
        files: ['**/*.{js,mjs,cjs,ts,mts,cts,vue}'],
        plugins: { js },
        extends: ['js/recommended'],
        languageOptions: { globals: globals.browser },
    },
    tseslint.configs.recommended,
    pluginVue.configs['flat/essential'],
    {
        files: ['**/*.vue'],
        languageOptions: { parserOptions: { parser: tseslint.parser } },
        rules: {
            // 关闭规则：值为 'off' / 0；放宽规则：值为 'warn' / 1（仅警告，不报错）
            'vue/multi-word-component-names': 'off',
        },
    },
    // ⭐⭐⭐ Prettier（必须放在最后）
    eslintPluginPrettierRecommended,
])
