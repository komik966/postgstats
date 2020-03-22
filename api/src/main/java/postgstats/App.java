package postgstats;

import postgstats.websocketserver.WebSocketServer;

public final class App {
  private App() {
  }

  /**
   * Bootstraps application.
   * Registers required triggers in PostgreSQL database.
   * Subscribes to database notifications.
   * Exposes real-time statistics through WebSocket.
   *
   * @param args
   */
  public static void main(final String[] args) throws Exception {
    WebSocketServer webSocketServer = new WebSocketServer();
    webSocketServer.start(8090);
  }
}
