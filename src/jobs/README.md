# Jobs

- Read syntax infof for time scheduling https://www.npmjs.com/package/node-cron

## Example

```typescript
import { CronJob } from "@structures/modules/cronjob";

class DailyReminder extends CronJob {
  public constructor() {
    super("daily-reminder-job", {
      schedule: "",
      timezone: "Asia/Tokyo",
    });
  }

  async init() {
    this.logger.info("Nothing to implement yet");
  }

  async exec() {
    this.logger.info("Nothing to implement yet");
  }
}
```

##
