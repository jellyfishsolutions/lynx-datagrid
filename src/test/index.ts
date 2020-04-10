import { App, ConfigBuilder } from "lynx-framework/index";
import BaseModule from "lynx-framework/base.module";
import DatagridModule from "..";




const port = Number(process.env.PORT) || 3000;



let myConfig = new ConfigBuilder(__dirname).setDatabase("adminui").build();


const app = new App(myConfig, [new DatagridModule()] as BaseModule[]);
app.startServer(port);
