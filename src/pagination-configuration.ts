export default class PaginationConfiguration {
    total = 0;
    pageSize = 10;
    pageCount = 0;
    currentPage = 0;
    left = 0;
    right = 0;
    maxPages = 2;

    calculate() {
        this.pageCount = Math.ceil(this.total / this.pageSize);
        this.left = Math.max(0, this.currentPage - this.maxPages);
        this.right = Math.min(
            this.pageCount,
            this.currentPage + 1 + this.maxPages
        );
    }
}