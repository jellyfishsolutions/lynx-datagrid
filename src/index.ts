import SimpleModule from "lynx-framework/simple.module";

export default class DatagridModule extends SimpleModule {

    get controllers(): string {
        return __dirname + "/controllers";
    }

    get views(): string {
        return __dirname + "/views";
    }

    get public(): string {
        return __dirname + "/public";
    }
}
