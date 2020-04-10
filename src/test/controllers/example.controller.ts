import { BaseController } from "lynx-framework/base.controller";
import { Route, GET } from "lynx-framework/decorators";
import Request from "lynx-framework/request";
import Datagrid from "../../datagrid";
import { Person } from "../mock";

@Route("/")
export default class ExampleController extends BaseController {
  @GET("/")
  async list(req: Request) {
    let datagrid = new Datagrid<Person>("d0-", req);

    await datagrid.fetchData((params) =>
      Person.findAndCount({ take: params.take, skip: params.skip })
    );

    let second = new Datagrid<Person>("altro-", req);
    await second.fetchData((params) =>
        Person.findAndCount({ take: params.take, skip: params.skip })
    );

    return this.render('example', req, { datagrid: datagrid, second: second });
  }
}
