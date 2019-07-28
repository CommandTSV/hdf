import { observable, action } from 'mobx'
import grand from '../grand'
import { randomFill } from 'crypto';

export interface IUser {
    userId: string
    userName: string,
    login: string,
    password: string,
    avatar: string,
    level: string
}

export default class User {

    @observable userId: string
    @observable userName: string
    @observable login: string
    @observable password: string
    @observable avatar: string
    @observable level: string

    constructor() {
        this.userId = "0000"
        this.userName = "tester"
        this.login = "test"
        this.password = "test"
        this.avatar = ""
        this.level = "administrator"
        this.signin()
    }

    @action signin() {
        setTimeout(() => {
            this.userId = grand.int(10000000)
            this.userName = grand.givenName()
            this.login = grand.emailAddress()
            this.password = grand.givenName()
            this.level = "user"
        }, 1500)
    }
}