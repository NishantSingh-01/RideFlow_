import createCaptainsTable from "./captain.tables.js"
import createRide from "./ride.tables.js"
import createUsersTable from "./user.tables.js"

const initDB = async () => {
    await createUsersTable()
    await createCaptainsTable()
    await createRide()

    console.log("Database initialized")
}

export default initDB