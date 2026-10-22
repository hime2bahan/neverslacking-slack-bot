
const axios = require("axios");

require("dotenv").config();

const { App } = require("@slack/bolt");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true
});

app.command("/neverslacking-ping", async ({ command, ack, respond }) => {
  const start = Date.now();
  await ack();
  const latency = Date.now() - start;
  await respond({ text: `Pong!\nLatency: ${latency}ms` });
});



app.command("/neverslacking-help", async ({ ack, respond }) => {
  await ack();
  await respond({
    text:
`Available Commands:
/neverslacking-ping - ping ping for latency i think
/neverslacking-catfact - become a catnerd
/neverslacking-duckpics - see a handsome duck
/neverslacking-joke - laugh at a joke i mean life is fun `
  });
});


app.command("/neverslacking-catfact", async ({ ack, respond }) => {
  await ack();

  try {
    const response = await axios.get("https://catfact.ninja/fact");
    await respond({ text: `Cat Fact:\n${response.data.fact}` });
  } catch (err) {
    await respond({ text: "Failed to fetch a cat fact." });
  }
});


   app.command("/neverslacking-joke", async ({ ack, respond }) => {
  await ack();

  try {
    const response = await axios.get("https://official-joke-api.appspot.com/random_joke");
    console.log("Joke fetched successfully:", response.data);

    await respond({
      text: `${response.data.setup}\n\n${response.data.punchline}`
    });
  } catch (err) {
    console.error("Error fetching joke:", err);
    await respond({ text: "Failed to fetch a joke." });
  }
});

  




app.command("/neverslacking-duckpics", async ({ ack, respond }) => {
  await ack();

  try {
    const response = await axios.get("https://random-d.uk/api/v2/random");
    await respond({ blocks: [{ type: "image", image_url: response.data.url, alt_text: "duck"}] }); 
  } catch (err) {
    await respond({ text: "Failed to fetch a duck picture." });
  }
});

(async () => {
  await app.start();
  console.log("bot is running!");
})();