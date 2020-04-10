import BaseEntity from "lynx-framework/entities/base.entity";
import EditableEntity from "../../editable-entity";
import Comment from './comment.entity';
export default class Post extends BaseEntity implements EditableEntity {
    id: number;
    content: string;
    comments: Promise<Comment[]>;
    getId(): number;
    getLabel(): string;
}
