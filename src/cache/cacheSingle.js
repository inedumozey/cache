
const path = require('path')
const fs = require('fs')

class CacheSingle {
    constructor(filePath, defaultData = "") {
        this.defaultData = defaultData,
            this.filePath = filePath
    }

    validateFilePath = async () => {
        if (!this.filePath) throw Errow('filePath is required')
    }

    writeData = async (data, type = "") => {
        try {
            await this.validateFilePath();

            const dir = path.dirname(this.filePath)
            const isDirExist = await fs.existsSync(dir)
            const isFileExist = await fs.existsSync(this.filePath)

            if (!isDirExist) {
                //create file and write into it
                await fs.mkdirSync(dir);
            }
            if (!isFileExist) {
                fs.writeFileSync(this.filePath, JSON.stringify(data), 'utf8');
            }

            else {
                if (type == "update") {
                    fs.writeFileSync(this.filePath, JSON.stringify(data), 'utf8');
                }

            }

        }
        catch (e) {
            throw Error(e.message)
        }
    }

    get = async () => {
        try {
            await this.writeData(this.defaultData)

            // get the data
            const data = await fs.readFileSync(this.filePath, 'utf8');

            return JSON.parse(data)
        }
        catch (err) {
            throw Error(err.message)
        }
    }

    createUpdate = (initialData, key, value, dataType = '') => {
        initialData[key] = dataType == 'number' ?
            (value ? Number(value) : initialData[key]) :
            (value ? value : initialData[key]);
    }

    update = async (data) => {
        try {
            await this.validateFilePath();

            // write the new config data
            await this.writeData(data, "update")

            // get the updated config data
            const returnedData = await fs.readFileSync(this.filePath, 'utf8');
            return JSON.parse(returnedData)
        }
        catch (err) {
            throw Error(err.message)
        }
    }
}


module.exports = CacheSingle;