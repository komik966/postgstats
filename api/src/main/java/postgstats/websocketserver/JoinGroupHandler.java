package postgstats.websocketserver;

import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.ChannelInboundHandlerAdapter;
import io.netty.channel.group.ChannelGroup;

class JoinGroupHandler extends ChannelInboundHandlerAdapter {
  private final ChannelGroup channelGroup;

  JoinGroupHandler(ChannelGroup channelGroup) {
    this.channelGroup = channelGroup;
  }

  @Override
  public void channelActive(ChannelHandlerContext ctx) throws Exception {
    channelGroup.add(ctx.channel());
    super.channelActive(ctx);
  }
}
