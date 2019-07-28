import { observable, action, reaction, computed } from 'mobx'
import User, { IUser } from './user'
import Company, { ICompany } from './company'
import Material, { IMaterial } from './material'
import Contract, { IContract } from './contract'
import Equipment, { IEquipment } from './equipment'
import Product, { IProduct } from './product'

// import controller from '../controller'



export interface IStore {
    user: IUser
    contracts: IContracts[]
    product: IProduct
    products: IProduct[]
    state: string
    fetchProduct(id: number): any
}

class Store {

    @observable userStore: IUser
    @observable users: IUsers[] = []
    @observable contracts: Contracts[] = []
    @observable product: IProduct
    @observable products: IProduct[] = []
    @observable state: string = 'done'

    /*     constructor() {
            this.state = 'done'
            this.userStore = new User()
            this.users = new Array(10).fill((() => {
                return new User()
            })())
        } */

    @action.bound
    public fetchProduct(id: number): any {
        console.log('id', id)
        /* this.product = {}
        this.state = "pending"
        controller.fetchProduct(id).then(
            product => {
                this.product = product
                this.state = "done"
            },
            error => {
                this.state = "error"
            }
        ) */
    }
}


export default new Store()
export { IUser, ICompany, IMaterial, IContract, IEquipment, IProduct }