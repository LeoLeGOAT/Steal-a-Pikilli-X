class AdminManager {
    constructor() {
        this.admins = {};
        this.code = "170713";
    }

    login(id, code) {
        if (code === this.code) {
            this.admins[id] = true;
            return true;
        }
        return false;
    }

    isAdmin(id) {
        return this.admins[id] === true;
    }
}

module.exports = AdminManager;
