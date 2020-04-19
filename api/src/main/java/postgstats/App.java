package postgstats;

import com.google.gson.Gson;
import postgstats.stats.Stats;
import postgstats.websocketserver.WebSocketServer;

import java.sql.DriverManager;

public final class App {

  public static void main(String[] args) throws Exception {
    String host = args[0];
    Integer port = Integer.parseInt(args[1]);
    String jdbcUrl = args[2];

    WebSocketServer webSocketServer = new WebSocketServer();
    webSocketServer.start(host, port);

    Stats stats = new Stats(DriverManager.getConnection(jdbcUrl));
    Gson gson = new Gson();

    while (true) {
      webSocketServer.broadcast(gson.toJson(stats.query()));
      Thread.sleep(2000);
    }
  }
}
