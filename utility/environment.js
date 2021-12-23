class Environment {
    constructor() {
        this.__isLocal = true;
        this.__storagePath = "InstagramImages";
        this.getCredentials();
    }

    getCredentials() {
        try {
            const { credentials } = require("../credentials");
            this.username = credentials.USERNAME
            this.password = credentials.PASSWORD
        }
        catch (err) {
            this.username = process.env.USERNAME
            this.password = process.env.PASSWORD
        }
    }

    get storagePath() {
        return this.__storagePath
    }
}

module.exports = { Environment };
