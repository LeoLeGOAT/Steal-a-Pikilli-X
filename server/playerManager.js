class PlayerManager {
    constructor() {
        this.players = {};
    }

    createPlayer(id) {
        this.players[id] = {
            id,
            money: 0,
            rebirth: 0,
            leobux: 0,
            brainrots: []
        };
        return this.players[id];
    }

    removePlayer(id) {
        delete this.players[id];
    }

    getTargets(target) {
        if (target === "all") return Object.values(this.players);
        if (this.players[target]) return [this.players[target]];
        return [];
    }

    getAll() {
        return this.players;
    }

    applyData(player, data) {
        Object.assign(player, data);
    }
}

module.exports = PlayerManager;
