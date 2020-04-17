package postgstats;

import postgstats.websocketserver.WebSocketServer;

public final class App {

  public static void main(String[] args) throws Exception {
    WebSocketServer webSocketServer = new WebSocketServer();
    webSocketServer.start(8090);
  }
}
