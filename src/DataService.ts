class DataService {
  static async getHelloWorld(): Promise<string> {
    return "Hello World!";
  }

  static async getGreeting(name: string): Promise<string> {
    return `Hallo ${name}! Willkommen zurück!`;
  }

  static async getCustomMessage(customMessage: string): Promise<string> {
    return customMessage;
  }
}

export default DataService;
