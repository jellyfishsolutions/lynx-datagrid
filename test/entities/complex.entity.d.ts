import BaseEntity from "lynx-framework/entities/base.entity";
import Category from "./category.entity";
export declare enum Gender {
    male = 0,
    female = 1,
    other = 2
}
export default class Complex extends BaseEntity {
    id: number;
    name: string;
    surname: string;
    email: string;
    gender: Gender;
    age: number;
    dateOfBirth: Date;
    biography: string;
    privacy: boolean;
    power: number;
    category: Category;
    subcategories: Category[];
}
