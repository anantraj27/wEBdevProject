import express from "express";
import axios from "axios";

const app = express();
const port = 3000;


app.get("/", async (req, res) => {

  try {
    const url = await axios.get(`https://api.cricapi.com/v1/currentMatches?apikey=8262d730-802f-42ae-9351-98f0f4cba87a&offset=0`)
    const matches = url.data.data;   // ✔ Correct way

    const result = matches.find((m) =>
      m.name.toLowerCase().includes("bihar") &&
      m.name.toLowerCase().includes("arunachal pradesh")
    );  
    console.log(result)
    const teamInfo = result.teamInfo
    let otherFlag = teamInfo.find((team) => team.name.toLowerCase().includes('arunachal pradesh'))
    let biharFlag = teamInfo.find((team) => team.name.toLowerCase().includes('bihar'))
    const score = result.score
    const otherScore = score.find((team) => team.inning.toLowerCase().includes('arunachal pradesh'))
    const biharScore = score.find((team) => team.inning.toLowerCase().includes('bihar')) ?? 'Break'
    res.render('index.ejs', {
      data: result,
      biharRun: biharScore,
      otherRun: otherScore,
      biharflag: biharFlag,
      otherflag: otherFlag
    })

  }
  catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: "No activities that match your criteria.",
    });
  }



});


app.listen(port, () => {
  console.log('app is listning on port no ', port)
})