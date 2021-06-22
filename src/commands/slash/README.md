# Commands

Commands should be placed here

## Examples

---

### Basic command

```typescript
import { CommandInteraction } from "discord.js";
import { SlashCommand } from "@structures/modules/slash_command";

export default class PingCommand extends SlashCommand {
  public constructor() {
    super("ping", {
      description: `Go ping!`,
    });
  }

  async exec(interaction: CommandInteraction) {
    await interaction.reply("Pong!");
  }
}
```

### Example command with options

```typescript
import { CommandInteraction } from "discord.js";
import { SlashCommand } from "@structures/modules/slash_command";

export default class AddCommand extends SlashCommand {
  public constructor() {
    super("add", {
      description: `Add  numbers!!`,
      options: [
        {
          name: "a",
          type: "INTEGER",
          description: "First number",
          required: true,
        },
        {
          name: "b",
          type: "INTEGER",
          description: "Second number",
          required: true,
        },
      ],
    });
  }

  async exec(interaction: CommandInteraction) {
    const a = interaction.options.get("a")?.value as number;
    const b = interaction.options.get("b")?.value as number;

    await interaction.reply(`${a} + ${b} = ${a + b}`);
  }
}
```

### Example command with choices

```typescript
import { CommandInteraction } from "discord.js";
import { SlashCommand } from "@structures/modules/slash_command";

export default class VacationCommand extends SlashCommand {
  public constructor() {
    super("add", {
      description: `Add  numbers!!`,
      options: [
        {
          name: "Where do you want to go to?",
          type: "STRING",
          description: "Second number",
          required: true,
          choices: [
            {
              name: "The beach",
              value: "beach",
            },
            {
              name: "The club",
              value: "club",
            },
          ],
        },
      ],
    });
  }

  async exec(interaction: CommandInteraction) {
    await interaction.reply("That's a good place to go to!");
  }
}
```
