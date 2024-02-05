import { createReadStream, createWriteStream } from "fs";
import zlib from "zlib";
import { resolve } from "path";
import { messages } from "../helpers/messages.js";
import { pipeline } from "stream";

export const decompress = (pathFile, pathDirectory) => {
  const readStream = createReadStream(resolve(process.cwd(), pathFile));
  const writeStream = createWriteStream(resolve(process.cwd(), pathDirectory));
  const brotliDecompress = zlib.createBrotliDecompress();

  pipeline(readStream, brotliDecompress, writeStream, () => {});

  writeStream.on("finish", () => {
    console.log(messages.decompressed);
  });

  readStream.on("error", () => {
    console.log(messages.failedOperation);
  });

  brotliDecompress.on("error", () => {
    console.log(messages.failedOperation);
  });

  writeStream.on("error", () => {
    console.log(messages.failedOperation);
  });
};
