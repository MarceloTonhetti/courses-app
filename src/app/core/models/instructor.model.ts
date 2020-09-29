import { Course } from './course.model'

export interface Instructor {
  _id: String,
  name: String,
  image?: String,
  courses?: Course[]
}