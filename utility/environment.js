class Environment {
    constructor() {
        this.__isLocal = true;
        this.__storagePath = "InstagramImages/"
    }

    get storagePath() {
        return this.__storagePath
    }
}

module.exports = { Environment };
