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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var decorators_1 = require("../../decorators");
var base_entity_1 = require("lynx-framework/entities/base.entity");
var category_entity_1 = require("./category.entity");
var editable_entity_1 = require("../../editable-entity");
var Gender;
(function (Gender) {
    Gender[Gender["male"] = 0] = "male";
    Gender[Gender["female"] = 1] = "female";
    Gender[Gender["other"] = 2] = "other";
})(Gender = exports.Gender || (exports.Gender = {}));
var genderValues = [
    { key: Gender.male, value: "Maschio" },
    { key: Gender.female, value: "Femmina" },
    { key: Gender.other, value: "Altro" }
];
function getCategories() {
    return __awaiter(this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = editable_entity_1.map;
                    return [4 /*yield*/, category_entity_1.default.find()];
                case 1: return [2 /*return*/, _a.apply(void 0, [_b.sent()])];
            }
        });
    });
}
function isReadOnly(_, entity) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (entity.gender == Gender.male) {
                return [2 /*return*/, true];
            }
            return [2 /*return*/, false];
        });
    });
}
var Complex = /** @class */ (function (_super) {
    __extends(Complex, _super);
    function Complex() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        decorators_1.AdminField({
            name: "Id",
            type: decorators_1.AdminType.Id,
            readOnly: true,
            onSummary: true
        }),
        __metadata("design:type", Number)
    ], Complex.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column(),
        decorators_1.AdminField({
            name: "Name",
            type: decorators_1.AdminType.String,
            onSummary: true,
            searchable: true,
            uiSettings: { editorClasses: "col-6", filterClasses: "col-6" }
        }),
        __metadata("design:type", String)
    ], Complex.prototype, "name", void 0);
    __decorate([
        typeorm_1.Column(),
        decorators_1.AdminField({
            name: "Surname",
            type: decorators_1.AdminType.String,
            onSummary: true,
            searchable: true,
            uiSettings: { editorClasses: "col-6", filterClasses: "col-6" }
        }),
        __metadata("design:type", String)
    ], Complex.prototype, "surname", void 0);
    __decorate([
        typeorm_1.Column(),
        decorators_1.AdminField({
            name: "Email",
            type: decorators_1.AdminType.String,
            pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
        }),
        __metadata("design:type", String)
    ], Complex.prototype, "email", void 0);
    __decorate([
        typeorm_1.Column(),
        decorators_1.AdminField({
            name: "Gender",
            type: decorators_1.AdminType.Selection,
            values: genderValues
        }),
        __metadata("design:type", Number)
    ], Complex.prototype, "gender", void 0);
    __decorate([
        typeorm_1.Column(),
        decorators_1.AdminField({
            name: "Age",
            type: decorators_1.AdminType.Number,
            step: 1,
            min: 13
        }),
        __metadata("design:type", Number)
    ], Complex.prototype, "age", void 0);
    __decorate([
        typeorm_1.Column(),
        decorators_1.AdminField({
            name: "Date of Birth",
            type: decorators_1.AdminType.Date
        }),
        __metadata("design:type", Date)
    ], Complex.prototype, "dateOfBirth", void 0);
    __decorate([
        typeorm_1.Column(),
        decorators_1.AdminField({ name: "Bio", type: decorators_1.AdminType.RichText, readOnly: isReadOnly }),
        __metadata("design:type", String)
    ], Complex.prototype, "biography", void 0);
    __decorate([
        typeorm_1.Column(),
        decorators_1.AdminField({ name: "Privacy accettata", type: decorators_1.AdminType.Checkbox }),
        __metadata("design:type", Boolean)
    ], Complex.prototype, "privacy", void 0);
    __decorate([
        typeorm_1.Column(),
        decorators_1.AdminField({
            name: "Poteri",
            type: decorators_1.AdminType.Radio,
            values: [
                { key: 1, value: "Super" },
                { key: 2, value: "Normale" }
            ]
        }),
        __metadata("design:type", Number)
    ], Complex.prototype, "power", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return category_entity_1.default; }, { eager: true }),
        decorators_1.AdminField({
            name: "Categoria",
            type: decorators_1.AdminType.Selection,
            values: getCategories,
            onSummary: true,
            searchable: true
        }),
        __metadata("design:type", category_entity_1.default)
    ], Complex.prototype, "category", void 0);
    __decorate([
        typeorm_1.ManyToMany(function (type) { return category_entity_1.default; }, { eager: true }),
        typeorm_1.JoinTable(),
        decorators_1.AdminField({
            name: "Altre categorie",
            type: decorators_1.AdminType.Checkbox,
            values: getCategories,
            selfType: 'Category',
            onSummary: true,
            uiSettings: {
                listTemplate: '/chips'
            }
        }),
        __metadata("design:type", Array)
    ], Complex.prototype, "subcategories", void 0);
    Complex = __decorate([
        typeorm_1.Entity("complex"),
        decorators_1.AdminUI("Complex Entity")
    ], Complex);
    return Complex;
}(base_entity_1.default));
exports.default = Complex;
