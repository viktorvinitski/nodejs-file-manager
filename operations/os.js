import { EOL, cpus, userInfo, arch } from 'os';
import { messages } from "../helpers/messages.js";

export const os = (flag) => {
  switch (flag) {
    case "--EOL":
      console.log(messages.EOL(EOL));
      break;
    case "--cpus":
      console.table(cpus());
      break;
    case "--homedir":
      console.log(userInfo().homedir);
      break;
    case "--username":
      console.log(userInfo().username);
      break;
    case "--architecture":
      console.log(arch());
      break;
    default:
        console.log(messages.failedOperation);
      break;
  }
};
