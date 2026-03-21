class BrainrotManager {
    spawn(player, data) {
        const brainrot = {
            name: data.name,
            mutation: data.mutation || "none",
            trait: data.trait || "none"
        };

        player.brainrots.push(brainrot);
    }
}

module.exports = BrainrotManager;
