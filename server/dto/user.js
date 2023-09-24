//this is user to filter data and send some specific data, not whole user object - DTO concept
class UserDTO{
    constructor(user){
        this._id= user._id;
        this.firstName=user.firstName;
        this.lastName=user.lastName;
        this.email=user.email;
        this.occupation=user.occupation;
        

    }
}

export default UserDTO;