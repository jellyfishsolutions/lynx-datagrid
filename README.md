# Datagrid
The *Datagrid* module defines a simple API to display any type of data that can be sorted and (or) paged.

Multiple datagrid can be displayed in the same page, each with its own page and order status.

Moreover, the module is agnostic about the type of the data, how to retrieve it and how the data needs to be displayed. In this way, it can be easily adapter for any situation.

## Usage

The *Datagrid* API is divided in two parts: the controller part and the view part.

### Controller part

The `Datagrid` class contains the logic to parse and manage the paging and ordering arguments.
Each `Datagrid` class needs to be created with a `prefix` values, in order to support multiple instance on the same page, without variable conflict.
Once the setup of the instance is done, it is necessary to invoke the `fetchData` method, using an `executor` callback in order to retrieve the correct data.

```
let datagrid = new Datagrid<Person>("d0-", req);

await datagrid.fetchData((params) =>
    Person.findAndCount({ take: params.take, skip: params.skip, orderBy: params.orderBy })
);
```

The `executor` callback is invoke with a `param` argument, which contains the following properties:
* `take`: the number of elements to be displayed in the page;
* `skip`: the number of elements to be skipped;
* `orderBy`: an object containing the name of the property by which the data needs to be ordered; the value of this property can be `'ASC'` or `'DESC'`.

This parameters can be directly used in the `findAndCount` method defined by TypeORM.

The `executor` callback shall return the total size of the elements (needed to create a correct pagination) and the actual elements to be visualized.

The complete instance of the `Datagrid` class needs to be passed to the context of the rendered page.

### View part

The module defines some Nunjuks macros to helps the data displaying.
Moreover, the data retrieved by the `Datagrid` class needs to be displayed.
A typical method to display the data is the following:

```
{% import resolvePath('/datagrid/utility') as dgUtils %}

<table>
    <tr>
        <td> {{ dgUtils.orderableHeader('Id', 'id', datagrid) }}  </td>
        <td> {{ dgUtils.orderableHeader('First Name', 'first_name', datagrid) }}  </td>
        <td> {{ dgUtils.orderableHeader('Salary', 'salary', datagrid) }}  </td>
    </tr>
    {% for line in datagrid.data %}
        <tr>
            <td>{{line.id}}</td>
            <td>{{line.first_name}}</td>
            <td>{{line.salary}}</td>
        </tr>
    {% endfor %}
</table>
{{ dgUtils.pagination(datagrid) }}
```

By default, the `orderableHeader` needs font-awesome to correctly display the order icons.