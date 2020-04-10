"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var decorators_1 = require("../../decorators");
var base_entity_1 = require("lynx-framework/entities/base.entity");
var comment_entity_1 = require("./comment.entity");
var Post = /** @class */ (function (_super) {
    __extends(Post, _super);
    function Post() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Post.prototype.getId = function () {
        return this.id;
    };
    Post.prototype.getLabel = function () {
        var c = this.content || "";
        if (c.length < 20) {
            return c;
        }
        return c.substring(0, 20) + "...";
    };
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        decorators_1.AdminField({ name: "Id", type: decorators_1.AdminType.Id, readOnly: true, onSummary: true }),
        __metadata("design:type", Number)
    ], Post.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column(),
        decorators_1.AdminField({ name: "Content", type: decorators_1.AdminType.RichText, onSummary: true, searchable: true }),
        __metadata("design:type", String)
    ], Post.prototype, "content", void 0);
    __decorate([
        typeorm_1.OneToMany(function (type) { return comment_entity_1.default; }, function (comment) { return comment.post; }),
        decorators_1.AdminField({ name: "Comments", type: decorators_1.AdminType.Table, selfType: 'Comment' }),
        __metadata("design:type", Promise)
    ], Post.prototype, "comments", void 0);
    Post = __decorate([
        typeorm_1.Entity("posts"),
        decorators_1.AdminUI("Post")
    ], Post);
    return Post;
}(base_entity_1.default));
exports.default = Post;
