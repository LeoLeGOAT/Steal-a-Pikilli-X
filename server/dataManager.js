const fs = require("fs");

class DataManager {
    constructor() {
        this.file = "./data/players.json";
        if (!fs.existsSync(this.file)) {
            fs.writeFileSync(this.file, JSON.stringify({}));
        }
    }

    loadAll() {
        return JSON.parse(fs.readFileSync(this.file));
    }

    saveAll(data) {
        fs.writeFileSync(this.file, JSON.stringify(data, null, 2));
    }

    loadPlayer(id) {
        const data = this.loadAll();
        return data[id];
    }

    savePlayer(id, player) {
        const data = this.loadAll();
        data[id] = player;
        this.saveAll(data);
    }
}

module.exports = DataManager;
