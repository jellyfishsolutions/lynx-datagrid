import Request from "lynx-framework/request";
import PaginationConfiguration from "./pagination-configuration";

export enum Parameters {
  pageSize = "pageSize",
  page = "page",
  orderBy = "orderBy",
}

export enum OrderType {
  asc = "ASC",
  desc = "DESC",
}

export interface ExecutorParameter {
  order: any;
  take: number;
  skip: number;
}

export default class Datagrid<T> {
  private prefix: string;
  private req: Request;
  private pagination = new PaginationConfiguration();
  private orderBy = {} as any;

  /**
   * contains the current url without the page
   */
  public urlNoPage: string;
  /**
   * contains the current url without the order
   */
  public urlNoOrder: string;
  /**
   * contains the current url without the page and the order
   */
  public urlNoPageNoOrder: string;

  public urlNoFilter: string;

  /**
   * Contains the current array of the fetched data
   */
  public data: T[];

  /**
   * Create a new instance of the datagrid.
   * Multiple datagrid in the same page are supported. Each datagrid is defined
   * by a 'prefix'.
   * @param prefix the prefix of the new datagrid
   * @param req the current Lynx request
   */
  constructor(prefix: string, req: Request) {
    this.prefix = prefix;
    this.req = req;
    this.setupPageRequested();
    this.urlNoPage = this.getUrlWithoutPage();
    this.urlNoOrder = this.getUrlWithoutOrder();
    this.urlNoPageNoOrder = this.getUrlWithoutPageOrOrder();
    this.urlNoFilter = this.getUrlWithoutFilter();

    let customPageSize = this.getQueryValue<number>(Parameters.pageSize);
    if (customPageSize) {
      this.setPageSize(Number(customPageSize));
    }

    let order = this.getQueryValue<string>(Parameters.orderBy);
    if (order) {
      if (order.startsWith("-")) {
        this.orderBy[order.substring(1)] = OrderType.asc;
      } else if (order.startsWith("+")) {
        this.orderBy[order.substring(1)] = OrderType.desc;
      } else {
        this.orderBy[order] = OrderType.desc;
      }
    }
  }

  /**
   * the length of the total data used by the datagrid
   */
  public get length(): number {
    return this.pagination.total;
  }

  /**
   * Set the current page size, overriding user request and defaults
   * @param size the number of element to display in a single page
   */
  public setPageSize(size: number) {
    this.pagination.pageSize = size;
  }

  /**
   * Query for the value of a param, in the current datagrid scope
   * @param param the param, without the prefix
   */
  public getQueryValue<V>(param: string): V {
    return this.req.query[this.prefix + param] as any;
  }

  /**
   * Check if the current order is the param.
   * @param param the param, without the prefix
   */
  public isOrderedBy(param: string): OrderType {
    return this.orderBy[param];
  }

  /**
   * This function is used internally by the view utility to
   * correctly generate an url to the current page with the chosen order by
   * method
   * @param param the key to order by
   */
  public getOrderByUrl(param: string): string {
      let url = this.urlNoPageNoOrder;
      url += this.prefix + Parameters.orderBy + "=";
      let currentOrder = this.isOrderedBy(param);
      if (currentOrder == OrderType.desc) {
          url += '-';
      }
      url += param;
      return url;
  }

  /**
   * Retrieve the correct data to be displayed in the grid.
   * The executor function will be executed with the correct parameters
   * (orderBy, skip and take) that can be directly passed to the `findAndCount`
   * Typeorm function.
   * @param executor the function to retrieve the correct data
   */
  public async fetchData(
    executor: (params: ExecutorParameter) => Promise<[T[], number]>
  ): Promise<void> {
    let params = {
      order: this.orderBy,
      take: this.pagination.pageSize,
      skip: this.pagination.currentPage * this.pagination.pageSize,
    };
    let [data, total] = await executor(params);

    this.pagination.total = total;
    this.pagination.calculate();

    this.data = data;
  }

  private setupPageRequested() {
    this.pagination.currentPage = 0;
    if (this.req.query[this.prefix + Parameters.page]) {
      this.pagination.currentPage = Number(
        this.req.query[this.prefix + Parameters.page]
      );
      if (this.pagination.currentPage > 0) {
        this.pagination.currentPage -= 1;
      }
    }
  }

  private getUrlWithoutPage(): string {
    return this.getUrlWithoutParameter([Parameters.page]);
  }

  private getUrlWithoutOrder(): string {
    return this.getUrlWithoutParameter([Parameters.orderBy]);
  }

  private getUrlWithoutPageOrOrder(): string {
    return this.getUrlWithoutParameter([Parameters.orderBy, Parameters.page]);
  }

  private getUrlWithoutFilter(): string {
    return this.getUrlWithoutParameter(["filter", "filterby"]);
  }

  private getUrlWithoutParameter(parameters: string[]): string {
    let u = (this.req.baseUrl + this.req.path).replace(/\/$/, "") + "?";
    for (let key in this.req.query) {
      var found = false;
      for (let p of parameters) {
        if (key.toLowerCase() == this.prefix.toLowerCase() + p.toLowerCase()) {
          found = true;
          break;
        }
      }
      if (found) {
        continue;
      }
      u += this.generateQueryValue(key, this.req.query[key]);
    }
    return u;
  }

  private generateQueryValue(key: string, q: any): string {
    let m = key + "=";
    if (q instanceof Array) {
      m += q[0] + "&";
      for (let i = 1; i < q.length; i++) {
        m += key + "=" + q[i] + "&";
      }
      return m;
    }
    return m + q + "&";
  }
}
