import BaseEntity from "lynx-framework/entities/base.entity";
import EditableEntity from "../../editable-entity";
import Post from "./post.entity";
export default class Comment extends BaseEntity implements EditableEntity {
    id: number;
    text: string;
    post: Post;
    getId(): number;
    getLabel(): string;
}
