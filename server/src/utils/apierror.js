import { createUser, findUserByEmail } from "../repositories/user.repositories.js";
import ApiError from "../utils/apierror.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/JWT.js";

const register = async (data) => {
    const userExist = await findUserByEmail(data.email);

    if (userExist) {
        throw new ApiError(409, "Email already exists");
    }
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const newUser = await createUser(
        data.firstname,
        data.lastname,
        data.email,
        hashedPassword,
        data.role
    );

    const token = generateToken({
        id: newUser.id,
        email: newUser.email,
        role: newUser.role,
    });

    return {
        user: {
            id: user.id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            role: user.role
        },
        token
    }
}
const login = async (email, password) => {
    const user = await findUserByEmail(email)
    if (!user) {
        throw new ApiError(401, "Invalid email or password")
    }

    const isPasswordValid = await bcrypt.compare(
        password,
        user.password
    )
    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid email or password")
    }
    const token = generateToken({
        id: user.id,
        email: user.email,
        role: user.role
    })

    return {
        user: {
            id: user.id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            role: user.role
        },
        token
    }
}

export { register,login }