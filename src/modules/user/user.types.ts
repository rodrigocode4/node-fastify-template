
import { BaseEntity } from "../base/base.repository"

export interface User extends BaseEntity {
  id?: number,
  name: string,
  age: number,
}
