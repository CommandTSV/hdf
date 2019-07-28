import { observable, action } from 'mobx'
import Company, { ICompany } from './company'

export interface IEquipment {
  id: string,
  type: string,
  manufacturer: ICompany
}

export default class Contract {

  @observable id: string
  @observable type: string
  @observable manufacturer: ICompany

  constructor() {

  }
}