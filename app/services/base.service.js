class BaseService {
    constructor(model) {
        this.model = model;
    }

    async findAll() {
        return await this.model.findAll({
            where: {
                activo: true
            }
        });
    }

    async findById(id) {
        return await this.model.findOne({
            where: {
                id,
                activo: true
            }
        });
    }

    async create(data) {
        return await this.model.create({
            ...data,
            activo: true
        });
    }

    async update(id, data) {
        const item = await this.model.findOne({
            where: {
                id,
                activo: true
            }
        });
        if (item) {
            return await item.update(data);
        }
        return null;
    }

    async delete(id) {
        const item = await this.model.findOne({
            where: {
                id,
                activo: true
            }
        });
        if (item) {
            await item.update({ activo: false });
            return true;
        }
        return false;
    }
}

module.exports = BaseService; 