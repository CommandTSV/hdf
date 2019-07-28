import ApolloClient from "apollo-boost";
export default class Connector {
  static client () {
    if (!this._client) {
      this._client = new ApolloClient({
        uri: "http://localhost:4000/graphql"
      });
    }
    return this._client
  }
  static _client
}