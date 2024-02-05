import readline from "readline/promises";
import os from "os";
import { getCommand } from "./helpers/getCommand.js";
import { messages } from "./helpers/messages.js";

const start = async () => {
    const userName = process.argv.slice(2)?.[0]?.replace('--username=', '') || 'Username';
    process.chdir(os.homedir());

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    rl.on("line", async (input) => {
        if (input === ".exit") {
            return rl.close();
        }
        await getCommand(input);
        console.log(messages.directory(process.cwd()));
        console.log(messages.waiting(userName));
    });

    rl.on("SIGCONT", async () => {
        console.log(messages.start(userName));
        console.log(messages.directory(process.cwd()));
        console.log(messages.waiting(userName));
    });
    rl.emit("SIGCONT");

    rl.on("close", () => {
        console.log(messages.finish(userName));
    });
};

await start();