type PaginationTypes = 'offset' | 'cursor'

type CustomSearchs = Array<{ type: string | null, name: string | null }>

type QueryObject = { [key: string]: QueryObject | Date }

type QueryType = Record<string, string | number | Record<string, unknown > >;

export class PaginationService {
  private readonly searchParams: URLSearchParams;
  private readonly paginationType: PaginationTypes = 'offset';
  private query: QueryType = {};

  constructor (requestUrl: string) {
    const { searchParams } = new URL(requestUrl);
    this.searchParams = searchParams;
    this.paginationType =
            (this.searchParams.get('type') as PaginationTypes) ?? 'offset';
    this.configureSearchParams();
  }

  configureSearchParams () {
    if (this.paginationType === 'offset') {
      this.configureOffsetQuery();
    } else {
      this.configureCursorQuery();
    }
  }

  configureOffsetQuery () {
    const pageIdx = parseInt(this.searchParams.get('page') as string) - 1;
    const rows = parseInt(this.searchParams.get('rows') as string);
    const orderByColumn = this.searchParams.get('orderBy') as string;
    const sortOrder = this.searchParams.get('sortOrder');
    const skip = pageIdx * rows;

    const where = this.getWhere();

    const orderBy = { [orderByColumn]: sortOrder };

    this.query = { where, take: rows, skip, orderBy };
  }

  getWhere () {
    const searchField = this.searchParams.get('searchField') as string;
    const search = this.searchParams.get('search');

    const customFilters = this.customFilters();

    if (['', undefined, null].includes(search)) return customFilters;

    if (['', undefined, null].includes(searchField)) return customFilters;

    return {
      [searchField]: { contains: search?.toLocaleLowerCase(), mode: 'insensitive' }, AND: customFilters
    };
  }

  customFilters () {
    return this.dateFilters();
  }

  dateFilters () {
    const customSearchs = this.getCustomSearchs();
    const dateSearchs = customSearchs.filter((params) => params.type === 'date');
    return this.constructDateSearch(dateSearchs)
    ;
  }

  constructDateSearch (dateArray: CustomSearchs, idx: number = 0) {
    const name = dateArray[idx]?.name;
    const query: QueryObject = {};
    const startDate = this.searchParams.get(`${name}StartDate`);
    const endDate = this.searchParams.get(`${name}EndDate`);

    if (startDate === null || endDate === null) return {};

    query[name as string] = {
      lte : new Date(endDate),
      gte : new Date(startDate)
    };
    query.AND = idx + 1 === dateArray.length
      ? {}
      : this.constructDateSearch(dateArray, idx + 1);

    return query;
  }

  getCustomSearchs (): CustomSearchs {
    const customSearchs = Array.from(this.searchParams.keys()).filter((key) =>
      key.toLowerCase().includes('customsearch')).map((key) => {
      const name = this.searchParams.get(key);
      return { type: this.searchParams.get(`${name}DataType`), name };
    }
    );
    return customSearchs;
  }

  configureCursorQuery () {}

  areCorrectPaginationParams () {
    if (this.paginationType === 'offset') {
      if (this.searchParams.get('page') === null) return false;
      if (this.searchParams.get('rows') === null) return false;
    }

    if (this.searchParams.get('orderBy') === null) return false;
    if (this.searchParams.get('sortOrder') === null) return false;

    return true;
  }

  getPaginationQuery () {
    return this.query;
  }
}
