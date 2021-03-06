package postgstats.websocketserver;

import io.netty.bootstrap.ServerBootstrap;
import io.netty.channel.EventLoopGroup;
import io.netty.channel.group.ChannelGroup;
import io.netty.channel.group.DefaultChannelGroup;
import io.netty.channel.nio.NioEventLoopGroup;
import io.netty.channel.socket.nio.NioServerSocketChannel;
import io.netty.handler.codec.http.websocketx.TextWebSocketFrame;
import io.netty.handler.logging.LogLevel;
import io.netty.handler.logging.LoggingHandler;
import io.netty.util.concurrent.GlobalEventExecutor;

public class WebSocketServer {

  private final ChannelGroup broadcastGroup = new DefaultChannelGroup(GlobalEventExecutor.INSTANCE);

  public void start(String host, Integer port) {
    new Thread(() -> {
      EventLoopGroup bossGroup = new NioEventLoopGroup(1);
      EventLoopGroup workerGroup = new NioEventLoopGroup();

      try {
        ServerBootstrap b = new ServerBootstrap();
        b.group(bossGroup, workerGroup)
            .channel(NioServerSocketChannel.class)
            .handler(new LoggingHandler(LogLevel.INFO))
            .childHandler(new Initializer(broadcastGroup));

        b.bind(host, port).sync().channel().closeFuture().sync();
      } catch (InterruptedException e) {
        e.printStackTrace();
      } finally {
        bossGroup.shutdownGracefully();
        workerGroup.shutdownGracefully();
      }
    }).start();
  }

  public void broadcast(String message) throws InterruptedException {
    broadcastGroup.writeAndFlush(new TextWebSocketFrame(message)).sync();
  }
}
