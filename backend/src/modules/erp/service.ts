type Options = {
  apiKey: string;
};

export default class ErpModuleService {
  private options: Options;
  private client;

  constructor({}, options: Options) {
    this.options = options;
    // TODO initialize client that connects to ERP
  }

  async getProducts() {
    // assuming client has a method to fetch products
    return this.client.getProducts();
  }

  // TODO add more methods
}
