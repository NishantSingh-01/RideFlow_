import createCaptainsTable from "./captain.tables.js"
import createUsersTable from "./user.tables.js"

const initDB = async () => {
    await createUsersTable()
    await createCaptainsTable()

    console.log("Database initialized")
}

export default initDB