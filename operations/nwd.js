import { writeFile, readdir, stat, rm, rename } from "fs/promises";
import { join, resolve, basename } from 'path';
import { messages } from "../helpers/messages.js";
import { createReadStream, createWriteStream } from "fs";



export const add = async (name) => {
    try {
        await writeFile(join(process.cwd(), name), "", { flag: "wx" });
        console.log(messages.created);
    } catch (error) {
        console.log(messages.failedOperation);
    }
};

export const cat = async (path) => {
    const readStream = createReadStream(resolve(process.cwd(), path));
    readStream.on("data", (chunk) => {
        process.stdout.write(chunk);
    });

    readStream.on("error", () => {
        console.log(messages.failedOperation);
    });
};

export const cd = (path) => {
    try {
        const targetPath = resolve(process.cwd(), path);
        process.chdir(targetPath);
    } catch (error) {
        console.log(messages.failedOperation);
    }
};

export const cp = async (pathFile, pathDirectory) => {
    const fileName = basename(pathFile);
    const readStream = createReadStream(resolve(process.cwd(), pathFile));
    const writeStream = createWriteStream(resolve(process.cwd(), pathDirectory, `${fileName}`));
    readStream.pipe(writeStream);

    writeStream.on("finish", () => {
        console.log(messages.copied);
    });

    readStream.on("error", (err) => {
        console.error(messages.failedOperation, err);
    });

    writeStream.on("error", (err) => {
        console.error(messages.failedOperation, err);
    });
};

export const ls = async () => {
    try {
        const directoryContent = await readdir(".");

        const parsedFiles = await Promise.all(directoryContent.map(async file => {
            return {
                Name: file,
                Type: (await stat(file)).isFile() ? 'file' : 'directory'
            }
        }))

        const directories = parsedFiles
            .filter(item => item.Type === 'directory')
            .sort((a, b) => a.Name.localeCompare(b.Name, undefined, { sensitivity: 'base' }))
        const files = parsedFiles
            .filter(item => item.Type === 'file')
            .sort((a, b) => a.Name.localeCompare(b.Name, undefined, { sensitivity: 'base' }))

        console.table([...directories, ...files])
    } catch (error) {
        throw new Error(messages.failedOperation);
    }
};

export const mv = async (pathFile, pathDirectory) => {
    const fileName = basename(pathFile);
    const readStream = createReadStream(resolve(process.cwd(), pathFile));
    const writeStream = createWriteStream(resolve(process.cwd(), pathDirectory, `${fileName}`));
    readStream.pipe(writeStream);

    writeStream.on("finish", () => {
        rm(resolve(process.cwd(), pathFile));
        console.log(messages.moved);
    });

    readStream.on("error", (err) => {
        console.error(messages.failedOperation, err);
    });

    writeStream.on("error", (err) => {
        console.error(messages.failedOperation, err);
    });
};

export const remove = async (pathFile) => {
    try {
        await rm(resolve(process.cwd(), pathFile));
        console.log(messages.removed);
    } catch (err) {
        throw new Error(messages.failedOperation);
    }
}

export const rn = async (path, name) => {
    try {
        await rename(resolve(process.cwd(), path), join(process.cwd(), name));
        console.log(messages.renamed);
    } catch (error) {
        throw new Error(messages.failedOperation);
    }
};

export const up = () => {
    try {
        process.chdir('..');
    } catch (error) {
        throw new Error(messages.failedOperation);
    }
};