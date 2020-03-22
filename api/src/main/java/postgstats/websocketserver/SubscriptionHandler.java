package postgstats.websocketserver;

import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.SimpleChannelInboundHandler;
import io.netty.handler.codec.http.websocketx.TextWebSocketFrame;
import io.netty.handler.codec.http.websocketx.WebSocketFrame;

class SubscriptionHandler
    extends SimpleChannelInboundHandler<WebSocketFrame> {

  @Override
  protected void channelRead0(
      final ChannelHandlerContext ctx,
      final WebSocketFrame msg) throws Exception {
    ctx.channel().writeAndFlush(new TextWebSocketFrame("foo"));
  }
}
