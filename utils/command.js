module.exports = class command {
    constructor(name, client) {
        this.name = name;
        this.client = client;
        this.aliases = [];
        this.allowDm = false
    }
    process({ message, args, prefix, user }) {
        return this.run({ message, args, prefix, user });
    }
    run(){}
}