import { createReadStream } from 'fs'
import { createHash } from 'crypto'

export const hash = async (path) => {
    try {
        const hash = createHash('sha256');
        const stream = createReadStream(path);

        stream.on('data', (data) => {
            hash.update(data)
        });

        stream.on('end', () => {
            const hashResult = hash.digest('hex');
            console.log(hashResult)
        });
    } catch {}
};
