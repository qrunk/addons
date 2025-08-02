(function(Scratch) {
  'use strict';

  class DiscordRPC {
    getInfo() {
      return {
        id: 'discordrpc',
        name: 'Discord RPC',
        blocks: [
          {
            opcode: 'updateStatus',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set Discord status to [DETAILS] and [STATE]',
            arguments: {
              DETAILS: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'In TurboWarp'
              },
              STATE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'Editing a game'
              }
            }
          },
          {
            opcode: 'clearStatus',
            blockType: Scratch.BlockType.COMMAND,
            text: 'clear Discord status'
          }
        ]
      };
    }

    async updateStatus(args) {
      const params = new URLSearchParams({
        details: args.DETAILS,
        state: args.STATE
      });

      try {
        await fetch(`http://localhost:3000/rpc/update?${params}`);
      } catch (e) {
        console.warn('[Discord RPC] Failed to reach local server:', e);
      }
    }

    async clearStatus() {
      try {
        await fetch(`http://localhost:3000/rpc/clear`);
      } catch (e) {
        console.warn('[Discord RPC] Failed to clear status:', e);
      }
    }
  }

  Scratch.extensions.register(new DiscordRPC());
})(Scratch);
