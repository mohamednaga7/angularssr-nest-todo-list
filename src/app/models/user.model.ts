export class User {
    constructor(
        public _id: string,
        public firstName: string,
        public lastName: string,
        public username: string,
        public email: string,
        public isActive: boolean = false
    ) { }

    toJson() {
        return JSON.stringify(this);
    }
}