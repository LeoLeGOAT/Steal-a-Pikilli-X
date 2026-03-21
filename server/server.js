const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const PlayerManager = require("./playerManager");
const BrainrotManager = require("./brainrotManager");
const AdminManager = require("./adminManager");
const DataManager = require("./dataManager");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const players = new PlayerManager();
const brainrots = new BrainrotManager();
const admins = new AdminManager();
const data = new DataManager();

io.on("connection", (socket) => {
    console.log("Player connected:", socket.id);

    let player = players.createPlayer(socket.id);

    // LOAD DATA
    let saved = data.loadPlayer(socket.id);
    if (saved) players.applyData(player, saved);

    socket.emit("init", player);

    socket.on("disconnect", () => {
        data.savePlayer(socket.id, player);
        players.removePlayer(socket.id);
    });

    // ADMIN LOGIN
    socket.on("admin_login", (code) => {
        if (admins.login(socket.id, code)) {
            socket.emit("admin_ok");
        }
    });

    // SPAWN BRAINROT
    socket.on("spawn_brainrot", (dataSpawn) => {
        if (!admins.isAdmin(socket.id)) return;

        let targets = players.getTargets(dataSpawn.target);

        targets.forEach(p => {
            brainrots.spawn(p, dataSpawn);
        });

        io.emit("update", players.getAll());
    });

    // GIVE MONEY
    socket.on("give_money", (dataMoney) => {
        if (!admins.isAdmin(socket.id)) return;

        let targets = players.getTargets(dataMoney.target);

        targets.forEach(p => {
            p.money += dataMoney.amount;
        });

        io.emit("update", players.getAll());
    });
});

server.listen(3000, () => {
    console.log("Server running on port 3000");
});
