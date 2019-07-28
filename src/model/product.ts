import { observable, action } from 'mobx'
import Company, { ICompany } from './company'
import Material, { IMaterial } from './material'
import Contract, { IContract } from './contract'
import Equipment, { IEquipment } from './equipment'

export interface IProduct {
    type: string,
    specification: string,
    weight: number,
    contract: IContract
    products?: IProduct[]
}

export default class Product {

    @observable type: string
    @observable specification: string
    @observable weight: number
    @observable contract: IContract
    @observable products: IProduct[]

    constructor() {

    }
}