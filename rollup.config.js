import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default [
    {
        input: 'src/views/filesList.js',
        output: {
            file: 'build/filesList.js',
            format: 'cjs'
        },
        plugins: [
            resolve(),
            commonjs({
                include: 'node_modules/**'
            })
        ]
    }
];