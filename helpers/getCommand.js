import { cat, rn, up, ls, add, mv, remove, cd, cp } from "../operations/nwd.js";
import { os } from "../operations/os.js";
import { hash } from "../operations/hash.js";
import { compress } from "../operations/compress.js";
import { decompress } from "../operations/decompress.js";
import { messages } from "./messages.js";


export const getCommand = async (input) => {
  const params = input.split(' ')
  const [ command, arg1, arg2 ] = params;
  switch (command) {
    case "up":
      if (params.length > 1) {
        return console.log(messages.invalidInput);
      }
      await up();
      break;
    case "cd":
      if (!arg1) {
        return console.log(messages.invalidInput);
      }
      await cd(arg1);
      break;
    case "ls":
      if (params.length > 1) {
        return console.log(messages.invalidInput);
      }
      await ls();
      break;
    case "add":
      if (!arg1) {
        return console.log(messages.invalidInput);
      }
      await add(arg1);
      break;
    case "cat":
      if (!arg1) {
        return console.log(messages.invalidInput);
      }
      await cat(arg1);
      break;
    case "rn":
      if (!arg1 && !arg2) {
        return console.log(messages.invalidInput);
      }
      await rn(arg1, arg2);
      break;
    case "cp":
      if (!arg1 && !arg2) {
        return console.log(messages.invalidInput);
      }
      await cp(arg1, arg2);
      break;
    case "mv":
      if (!arg1 && !arg2) {
        return console.log(messages.invalidInput);
      }
      await mv(arg1, arg2);
      break;
    case "rm":
      if (!arg1) {
        return console.log(messages.invalidInput);
      }
      await remove(arg1);
      break;
    case "hash":
      if (params.length !== 2) {
        return console.log(messages.invalidInput);
      }
      await hash(arg1);
      break;
    case "compress":
      if (params.length !== 3) {
        return console.log(messages.invalidInput);
      }
      await compress(arg1, arg2);
      break;
    case "decompress":
      if (params.length !== 3) {
        return console.log(messages.invalidInput);
      }
      await decompress(arg1, arg2);
      break;
    case "os":
      if (params.length !== 2) {
        return console.log(messages.invalidInput);
      }
      os(arg1);
      break;
    default:
      console.log(messages.invalidInput);
      break;
  }
};
