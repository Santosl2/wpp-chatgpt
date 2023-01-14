import { create } from "@open-wa/wa-automate";
import { openai } from "./config/index.mjs";

create({
  sessionId: "GPT-3",
  multiDevice: false,
  authTimeout: 60,
  blockCrashLogs: true,
  disableSpins: true,
  headless: true,
  hostNotificationLang: "PT_BR",
  logConsole: false,
  popup: true,
  qrTimeout: 0,
}).then((client) => start(client));

function start(client) {
  client.onMessage(async (message) => {
    const { body } = message;

    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: body,
      temperature: 0.5,
      max_tokens: 200,
    });

    await client.sendText(message.from, completion.data.choices[0].text);
  });
}
