import ServerRepository from "@js/Repositories/ServerRepository";

export default class Migration20003 {

    /**
     * Initialize server lock timeout feature
     *
     * @returns {Promise<void>}
     */
    async run() {
        let servers = await ServerRepository.findAll();
        for(let server of servers) {
            server.setTimeout(0);
            server.setLockable(false);
            await ServerRepository.update(server);
        }
    }
}