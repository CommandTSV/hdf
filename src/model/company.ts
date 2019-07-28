import { observable, action } from 'mobx'

export interface ICompany {
  id: string
  name: string,
  vat: string
  address: string
  city: string
  province: string
  country: string
}

export default class Company {

  @observable id: string
  @observable name: string
  @observable vat: string
  @observable address: string
  @observable city: string
  @observable province: string
  @observable country: string

  constructor() {

  }
}