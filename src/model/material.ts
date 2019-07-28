import { observable, action } from 'mobx'
import Contract, { IContract } from './contract'

export interface IMaterial {
  id: string
  type: string
  specification: string
  weight: number,
  contract: IContract
}

export default class Material {

  @observable id: string
  @observable type: string
  @observable specification: string
  @observable weight: number
  @observable contract: IContract

  constructor() {

  }
}