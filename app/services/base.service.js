class BaseService {
    constructor(model) {
        this.model = model;
    }

    async findAll() {
        return await this.model.findAll();
    }

    async findById(id) {
        return await this.model.findByPk(id);
    }

    async create(data) {
        return await this.model.create(data);
    }

    async update(id, data) {
        const item = await this.model.findByPk(id);
        if (item) {
            return await item.update(data);
        }
        return null;
    }

    async delete(id) {
        const item = await this.model.findByPk(id);
        if (item) {
            await item.destroy();
            return true;
        }
        return false;
    }
}

module.exports = BaseService; 