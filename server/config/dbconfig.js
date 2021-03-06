const DB_USERNAME = process.env.DATABASE_USERNAME
const DB_PSW = process.env.DATABASE_PASSWORD
const DB_NAME = process.env.DATABASE_NAME


const mongodburl = `mongodb://${DB_USERNAME}:${DB_PSW}@localhost:27017/${DB_NAME}`

//db.grantRolesToUser('newUsername',[{ role: "root", db: "admin" }])

module.exports = mongodburl;