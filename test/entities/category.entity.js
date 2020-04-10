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
var Category = /** @class */ (function (_super) {
    __extends(Category, _super);
    function Category() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Category.prototype.getId = function () {
        return this.id;
    };
    Category.prototype.getLabel = function () {
        return this.name;
    };
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        decorators_1.AdminField({ name: "Id", type: decorators_1.AdminType.Id, readOnly: true, onSummary: true }),
        __metadata("design:type", Number)
    ], Category.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column(),
        decorators_1.AdminField({ name: "Name", type: decorators_1.AdminType.String, onSummary: true, searchable: true }),
        __metadata("design:type", String)
    ], Category.prototype, "name", void 0);
    Category = __decorate([
        typeorm_1.Entity("categories"),
        decorators_1.AdminUI("Category")
    ], Category);
    return Category;
}(base_entity_1.default));
exports.default = Category;
