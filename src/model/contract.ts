import { observable, action } from 'mobx'
import Company, { ICompany } from './company'

export interface IContract {
  id: string,
  date: string,
  contragent: ICompany
}

export default class Contract {

  @observable id: string
  @observable date: string
  @observable contragent: ICompany

  constructor() {

  }
}