"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("lynx-framework/index");
var __1 = require("..");
var port = Number(process.env.PORT) || 3000;
var myConfig = new index_1.ConfigBuilder(__dirname).setDatabase("adminui").build();
var app = new index_1.App(myConfig, [new __1.default()]);
app.startServer(port);
