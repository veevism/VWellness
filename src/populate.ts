import {User} from "./model/User";

export const createUser = async () => {
    try {
        const newUser = await User.create({
            email: 'example@example.com',
            password: 'password123',
            name: 'John Doe',
            // accessToken: 'some-access-token', // ไม่จำเป็นต้องมีในขั้นตอนการสร้าง
            // refreshToken: 'some-refresh-token', // ไม่จำเป็นต้องมีในขั้นตอนการสร้าง
            // points: 0, // ค่า default จะถูกใช้
            imageCollectionOccupied: [], // หรือข้อมูลที่เหมาะสม
            // status: UserStatus.Active // ค่า default จะถูกใช้
        });

        console.log('New User Created:', newUser);
    } catch (error) {
        console.error('Error creating new user:', error);
    }
};
