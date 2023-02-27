const { Game } = require("../models/tablesmodel.js");
const fetch = require("node-fetch");
const fs = require("fs");
const readline = require("readline");
const brain = require("brain.js");


const apiKey = process.env.OPENAI_API_KEY;
const sendMessage = async (prompt) => {
    const engine = "text-davinci-002";
    const data = {
        prompt: prompt,
        temperature: 0.5,
        max_tokens: 1024,
    };
    const body = JSON.stringify(data);

    const headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + apiKey,
    };
    const response = await fetch(
        "https://api.openai.com/v1/engines/" + engine + "/completions",
        {
            method: "POST",
            headers: headers,
            body: body,
        }
    );
    const json = await response.json();

    return json.choices[0].text;
};
class MainGamingSearch {
    static async description(req, res) {
        try {
            const { name } = req.body;
            const fileStream = await fs.createReadStream(`./Names/${name}.txt`);

            const rl = readline.createInterface({
                input: fileStream,
                crlfDelay: Infinity,
            });
            const lineQueue = [];

            rl.on("line", async (line) => {
                lineQueue.push(line);
            });
            rl.on("close", async () => {
                console.log(`All lines have been processed`);
                while (lineQueue.length > 0) {
                    const line = lineQueue.shift();
                    const descriptionQuestion = `создать описание игры ${line} где минимальное количество слов 170 а максимальное 250`;

                    const description = await sendMessage(descriptionQuestion);

                    await Game.create({
                        description: description,
                        name: line,
                    });
                    const tagsQuestion = `Write 5 tags for ${line}`;
                    const tag = await sendMessage(tagsQuestion);

                    await Game.update({ tags: tag }, { where: { name: line } });
                }
            });

            return res.status(200).send("Check Bd");
        } catch (err) {
            console.log(err);
        }
    }
    static async workWithOwnAi(req, res) {
         
    }

}
module.exports = MainGamingSearch;
