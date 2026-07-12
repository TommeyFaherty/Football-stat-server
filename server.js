
import dotenv from "dotenv";
import express from "express";
import cors from "cors";

dotenv.config();
// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const fetch = require("node-fetch");

const app = express();
app.use(cors());

app.get("/healthCheck", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.get("/api/matches", async (req, res) => {
  const response = await fetch(
    "https://api.football-data.org/v4/competitions/WC/matches",
    {
      headers: {
        "X-Auth-Token": process.env.FOOTBALL_DATA_TOKEN,
      },
    }
  );

  const data = await response.json();
  res.json(data);
});

app.get("/api/worldcup/teams", async (req, res) => {
  try {
    const response = await fetch(
      "https://api.football-data.org/v4/competitions/WC/teams",
      {
        headers: {
          "X-Auth-Token": process.env.FOOTBALL_DATA_TOKEN,
        },
      }
    );

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch teams" });
  }
});

app.get("/api/worldcup/standings", async (req, res) => {
  try {
    const response = await fetch(
      "https://api.football-data.org/v4/competitions/WC/standings",
      {
        headers: {
          "X-Auth-Token": process.env.FOOTBALL_DATA_TOKEN,
        },
      }
    );

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch teams" });
  }
});

app.get("/api/worldcup/matches", async (req, res) => {
  try {
    const url = new URL(
      "https://api.football-data.org/v4/competitions/WC/matches"
    );
    const today = new Date().toISOString().split("T")[0]; // Format: YYYY-MM-DD
    var threeDaysAgo = new Date();
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
    threeDaysLater = new Date().setDate(threeDaysAgo.getDate() + 3);
    const startDate = threeDaysAgo.toISOString().split("T")[0];
    const endDate = threeDaysLater.toISOString().split("T")[0];

    url.searchParams.append("season", "2026");
    url.searchParams.append("dateFrom", startDate);
    url.searchParams.append("dateTo", endDate);

    const response = await fetch(url, {
      headers: {
        "X-Auth-Token": process.env.FOOTBALL_DATA_TOKEN,
      },
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch matches" });
  }
});

app.get("/api/worldcup/matches/knockout", async (req, res) => {
  try {
    const url = new URL(
      "https://api.football-data.org/v4/competitions/WC/matches"
    );
    url.searchParams.append("season", "2026");
    // url.searchParams.append("stage", "LAST_32");
    url.searchParams.append("status", "FINISHED");

    const response = await fetch(url, {
      headers: {
        "X-Auth-Token": process.env.FOOTBALL_DATA_TOKEN,
      },
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch matches" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Proxy running on port ${PORT}`));
