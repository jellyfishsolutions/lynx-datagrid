import SimpleModule from "lynx-framework/simple.module";

export default class DatagridModule extends SimpleModule {
    get views(): string {
        return __dirname + "/views";
    }
}
