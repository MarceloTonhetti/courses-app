import { Instructor } from './instructor.model'

export interface Course {
  _id: String,
  name: String,
  description: String,
  platform: String,
  numberClasses: Number,
  modules?: String,
  image: String,
  instructor: Instructor
}