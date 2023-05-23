import { readdir } from 'fs/promises';
import { startVitest } from 'vitest/node'

if (process.argv.length < 3) {
    console.log("Usage: npm test [testname]");
    process.exit(1);
}

const name = process.argv[2];
const once = process.argv[3] === 'once';

const validTests = (await readdir('./tests', { withFileTypes: true })).filter(dirent => !dirent.isDirectory()).map(dirent => dirent.name.replace('.test.js', ''));

if (name === 'all') {
    await startVitest('test', [], {
        watch: !once,
        run: once,
    })
} else {
    if (!validTests.includes(name)) {
        console.log(`Invalid test name: ${name}. Valid tests are:\n- ${validTests.join('\n- ')}`);
        process.exit(1);
    }

    await startVitest('test', ['tests/' + name + '.test.js'], {
        watch: !once,
        run: once
    })
}