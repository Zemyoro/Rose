import { Plugin, registerPlugin } from "enmity-api/plugins";

import { sendReply } from "enmity-api/clyde";
import { ApplicationCommandInputType, ApplicationCommandType, Command, EnmitySectionID } from "enmity-api/commands";

import { get } from 'enmity-api/rest';

const Rose: Plugin = {
  name: "Rose",
  commands: [],
  patches: [],
  onStart() {
    let wallpapers: Command = {
      id: 'wallpapers-command',
      applicationId: EnmitySectionID,

      name: 'wallpapers',
      displayName: 'wallpapers',

      description: 'Display wallpapers!',
      displayDescription: 'Display wallpapers!',

      type: ApplicationCommandType.Chat,
      inputType: ApplicationCommandInputType.BuiltIn,

      async execute(args, message) {
        const URL = 'https://www.reddit.com/r/wallpapers/.json?limit=100';

        const resp = await get(URL);
        if (resp.ok) {
          const idx = resp.body[0].data.children[Math.floor(Math.random() * 100)].data
          const url = idx.preview.images[0].source.url.replace('&amp;', '&');
          sendReply(message.channel.id, url);
        }
      }
    }

    this.commands.push(wallpapers)
  },
  onStop() {
    this.commands = [];
  }
}

registerPlugin(Rose);