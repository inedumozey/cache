const path = require("path")
const fs = require("fs");

class Cache {
    constructor(dir, file, id) {
        this.fullPath = path.join(dir, file)
        this.id = id
    }

    // write into the file
    write = async (data) => {
        try {
            await fs.writeFileSync(this.fullPath, JSON.stringify(data))
        }
        catch (err) {
            throw new Error(err.message)
        }
    }

    // write into the file
    read = async () => {
        try {
            const store = await fs.readFileSync(this.fullPath, 'utf8');
            return store ? JSON.parse(store) : store
        }
        catch (err) {
            throw new Error(err.message)
        }
    }

    // function that check if cachedProfile.json exist
    isCahedProfileFileExist = async () => {
        try {
            const isFileExist = await fs.existsSync(this.fullPath)
            return isFileExist ? true : false
        }
        catch (err) {
            throw new Error(err.message)
        }
    }

    // function that get all users
    getAll = async () => {
        try {
            // if the file existsSync, check if it contains data
            if (await this.isCahedProfileFileExist()) {
                // check if it contains data
                const data = await this.read()
                if (!data) {
                    // write data
                    await this.write([])

                    // read the data
                    return await this.read()
                }
                else {
                    return data; // array
                }
            }
            else {
                // create empty array
                const arr = []
                await this.write(arr)
                return this.read()
            }
        }
        catch (err) {
            throw new Error(err.message)
        }
    }

    // function that get a particular user by id
    getOne = async (id) => {
        try {
            // filter through users and return the user with the id
            const users = await this.getAll();
            const foundUser = users.find(user => {
                return user[this.id] === id
            })
            return foundUser ? foundUser : ''
        }
        catch (err) {
            throw new Error(err.message)
        }
    }

    get = async (id) => {
        try {
            // filter through users and return the user with the id

            if (typeof id !== 'string' && !Array.isArray(id)) {
                throw new Error("Only array or string is acceptable")
            }
            else {
                let ids = []
                typeof id == 'string' ? ids.push(id) : ids = id

                const users = await this.getAll();
                let foundUser = []

                for (let i of ids) {
                    const data = users.find(user => user[this.id] == i)
                    if (data) foundUser.push(data)
                }
                return foundUser;
            }
        }
        catch (err) {
            throw new Error(err.message)
        }
    }

    // function that cache profile data array
    store = async (data) => {
        try {
            // get all profile from the file
            const users = await this.getAll();
            // if data exist BeforeUnloadEvent, replace it
            const existedUserIndex = users.findIndex(user => user[this.id] === data[this.id])
            if (existedUserIndex == -1) {
                users.push(data);
                await this.write(users);
                return data;
            }
            else {
                users[existedUserIndex] = data
                await this.write(users);
                return data
            }
        }
        catch (err) {
            throw new Error(err.message)
        }
    }

    // function that remove cache profile data
    handleRemove = async (id, returns = "returns deleted") => {
        try {
            if (typeof id !== 'string' && !Array.isArray(id)) {
                throw new Error("Only array or string is acceptable")
            }
            else {
                // filter through users and return the user with the id
                const users = await this.getAll();
                const deletedUser = users.find(user => {
                    return user[this.id] === id
                })

                // remove the user with the id
                const newData = users.filter(user => {
                    return user[this.id] !== id
                })

                // save the new data
                if (deletedUser) {
                    await this.write(newData)
                }

                return "Success"

                // const value = returns.split(' ')[1]
                // if (value === '*') {
                //     return {
                //         deletedData: deletedUser ? deletedUser : '',
                //         remainingData: newData
                //     }
                // }
                // else {
                //     return {
                //         deletedData: deletedUser ? deletedUser : '',
                //         remainingData: ''
                //     }
                // }

                // if (!deletedUser) {
                //     return {
                //         deletedData: deletedUser ? deletedUser : '',
                //         remainingData: newData
                //     }
                // }
                // else {
                //     const value = returns.split(' ')[1]
                //     if (value === '*') {
                //         return {
                //             deletedData: deletedUser ? deletedUser : '',
                //             remainingData: newData
                //         }
                //     }
                //     else {
                //         return {
                //             deletedData: deletedUser ? deletedUser : '',
                //             remainingData: ''
                //         }
                //     }
                // }
            }
        }
        catch (err) {
            throw new Error(err.message)
        }
    }

    remove = async (id, returns) => {
        return await this.handleRemove(id, returns)
    }

    delete = async (id, returns) => {
        return await this.handleRemove(id, returns)
    }
}

module.exports = Cache