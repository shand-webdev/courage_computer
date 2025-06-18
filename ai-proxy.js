const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

const GEMINI_API_KEY = 'AIzaSyCz5MXTcxOVhEOze1qgySrEENX2xVkJqx0'; // Your actual key here

app.post('/api/ask', async (req, res) => {
  const { question } = req.body;

 const prompt = `
You are a sarcastic, witty computer inspired by Courage the Cowardly Dog.
Answer the following user question with a brief, accurate, factual answer in one sentence.
Then add a single witty, sarcastic remark, also in one sentence, in your Courage Computer character's style.
Here is the user's question: ${question}
`;


  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              { text: prompt }
            ]
          }
        ]
      }
    );

    const answer =
      response.data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "I couldn't come up with something witty. Try again.";
    res.json({ answer });
  } catch (error) {
    console.error(error?.response?.data || error.message);
    res.status(500).json({ answer: "Something went wrong with my big brain." });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log('AI proxy running on ' + PORT));
