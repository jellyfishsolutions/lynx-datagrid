import BaseEntity from "lynx-framework/entities/base.entity";
import EditableEntity from "../../editable-entity";
export default class Category extends BaseEntity implements EditableEntity {
    id: number;
    name: string;
    getId(): number;
    getLabel(): string;
}
