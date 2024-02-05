import { createReadStream, createWriteStream } from "fs";
import zlib from "zlib";
import { resolve } from "path";
import { messages } from "../helpers/messages.js";
import { pipeline } from "stream";

export const compress = (pathFile, pathDirectory) => {
    const readStream = createReadStream(resolve(process.cwd(), pathFile));
    const writeStream = createWriteStream(resolve(process.cwd(), pathDirectory));
    const brotliCompress = zlib.createBrotliCompress();

    pipeline(readStream, brotliCompress, writeStream, () => {});

    writeStream.on("finish", () => {
        console.log(messages.compressed);
    });
    readStream.on("error", () => {
        console.log(messages.failedOperation);
    });
    brotliCompress.on("error", () => {
        console.log(messages.failedOperation);
    });
    writeStream.on("error", () => {
        console.log(messages.failedOperation);
    });
};