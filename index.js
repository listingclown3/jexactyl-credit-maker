const puppeteer = require('puppeteer');
const readline = require('readline');
const { EmbedBuilder, WebhookClient, AttachmentBuilder } = require('discord.js');
const fs = require('fs')
const bfile = new AttachmentBuilder(__dirname + "/begin.png");
const ffile = new AttachmentBuilder(__dirname + "/final.png");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

const LOGO = `[Puppeteer]: `

function print(message) {
    console.log(`${LOGO}${message}`)

}


(async () => {

  console.log("-------------------------------------------------------------------------------------------------------------")

  const oauth = await new Promise((resolve) => {
    rl.question(LOGO + 'Enter the OAuth Link for the Pterodactyl Server: ', (answer) => {
      resolve(answer);
    });
  });

  const minutes = await new Promise((resolve) => {
    rl.question(LOGO + 'How many credits do you want?: ', (answer) => {
      resolve(answer);
    });
  });

  const discordToken = await new Promise((resolve) => {
    rl.question(LOGO + 'What is your discord token?: ', (answer) => {
      resolve(answer);
    });
  });

  const discordLink = await new Promise((resolve) => {
    rl.question(LOGO + 'What webhook would you like to send data to?: ', (answer) => {
      resolve(answer);
    });
  });

  const embed = new EmbedBuilder()
  .setTitle("Discord Authentication Screenshot")
  .setDescription("Graphical photo of headless browser interface to ensure successful authentication with Discord Application\n\n**Result:**")
  .setColor("Green")
  .setTimestamp()
  .setImage("attachment://begin.png")
  .setFooter({ text: "Puppeteer Client Interface", iconURL: 'https://user-images.githubusercontent.com/10379601/29446482-04f7036a-841f-11e7-9872-91d1fc2ea683.png' })
  
  const startEmbed = new EmbedBuilder()
  .setTitle("Puppeteer Client was started...")
  .setColor("Green")
  .setTimestamp()
  .addFields(
    { name: 'Credits to be earned', value: `${minutes}`, inline: false },

  )
  .setFooter({ text: "Puppeteer Client Interface", iconURL: 'https://user-images.githubusercontent.com/10379601/29446482-04f7036a-841f-11e7-9872-91d1fc2ea683.png' })

  const endEmbed = new EmbedBuilder()
  .setTitle("Puppeteer Client was finished the process")
  .setColor("Green")
  .setTimestamp()
  .addFields(
   { name: 'Credits earned', value: minutes + "\n\n**Result:**", inline: false },
  )
  .setImage("attachment://final.png")
  .setFooter({ text: "Puppeteer Client Interface", iconURL: 'https://user-images.githubusercontent.com/10379601/29446482-04f7036a-841f-11e7-9872-91d1fc2ea683.png' })

  console.log("-------------------------------------------------------------------------------------------------------------")
  console.log('@@@@@5     .....                                                                              5@@@@@\n@@@@@5    ^B#BBBBY:                                         !7.                               5@@@@@\n@@@@@5    ^@@~::J@#.:^.  .^^ .^^:~!~.  .^^:~!~.    .~!!^  .~&@?^.  :~!!:    .~!!^   :^.^!~    5@@@@@\n@@@@@5    ^@@J??G@P.G@!  !@B ^@&BPP#&J ^@&BPP#&J .5&GY5#B^^G&@BP^.P#PYP&P: Y#GY5#B~ P@BGGJ    5@@@@@\n@@@@@5    ^@@P55J~  B@!  !@B ^@&:  .#@!^@&:  .#@~J@&5YYG&Y  #@~  5@#YYYG&77@&5YYG&5 P@5       5@@@@@\n@@@@@5    ^@@:      P@5^~G@B ^@@J~~J@#:^@@J~~J@#:~@&?~!55^  B@J~.7@#7~!5Y.~&&?~!Y5^ P@J       5@@@@@\n@@@@@5    :55.      :YGG5?PY ^@&YPGGJ: ^@&YPGGJ:  ^JPGG57.  ~5GG~ ^YPGG5!  :JPGGP7. ?P!       5@@@@@\n@@@@@5                       ^@&.      ^@&.                                                   5@@@@@\n@@@@@5                       .7!       .7!                                                    5@@@@@\n@@@@@5                                                                                        5@@@@@')
  console.log("-------------------------------------------------------------------------------------------------------------")

  print("Starting Puppeteer instance...")

  // Launch Puppeteer and navigate to Discord's login page
  const browser = await puppeteer.launch({headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox']});
  const page = await browser.newPage();

  const webhookLink = new WebhookClient({ url: discordLink })

  
  await webhookLink.send({
    username: "Puppeteer Client Interface",
    avatarURL: "https://st2.depositphotos.com/4199035/6594/v/950/depositphotos_65942573-stock-illustration-puppet-cartoon-illustration-isolated-on.jpg",
    embeds: [startEmbed]
  })

  const bypassLocalStorageOverride = (page) => page.evaluateOnNewDocument(() => {

    // preserve localStorage as separate var to keep it before any overrides
    let __ls = localStorage
  
    // restrict closure overrides to break global context reference to localStorage 
    Object.defineProperty(window, 'localStorage', { writable: false, configurable: false, value: __ls })
  
  })
  
  print("Redirecting to https://discord.com/app ... (May take a few seconds)")
  
  bypassLocalStorageOverride(page)
  await page.goto('https://discord.com/app', { timeout: 0 });

  await page.evaluate((token) => {
    localStorage.setItem('token', `"${token}"`);
  }, discordToken);
  

  // Navigate to a page where you want to use the local storage value
  await page.goto(oauth, { timeout: 0 });
  print("Successfully logged in...")
  await page.waitForTimeout(5000)

  await page.screenshot({ path: 'begin.png' })
  print("Generated success screenshot...")
  
  await page.waitForTimeout(5000)

  webhookLink.send({
    username: "Puppeteer Client Interface",
    avatarURL: 'https://st2.depositphotos.com/4199035/6594/v/950/depositphotos_65942573-stock-illustration-puppet-cartoon-illustration-isolated-on.jpg',
    embeds: [embed],
    files: [bfile]
  })

  print("Sent screenshot to webhook...")

  async function countDown(minutes) {
    let minutesSilly = minutes * 4
    let seconds = minutesSilly * 60;
    process.stdout.write(LOGO + `Time remaining: ${Math.floor(seconds / 60)}:${seconds % 60 < 10 ? '0' : ''}${seconds % 60}`);
    while (seconds > 0) {
        await page.waitForTimeout(1000);
        seconds--;
        process.stdout.clearLine();
        process.stdout.cursorTo(0);
        process.stdout.write(LOGO + `Time remaining: ${Math.floor(seconds / 60)}:${seconds % 60 < 10 ? '0' : ''}${seconds % 60}`);
    }
    process.stdout.clearLine();
    process.stdout.cursorTo(0);

    await page.screenshot({ path: 'final.png' })

    print("Took a final screenshot, overriding old version...")

    await webhookLink.send({
      username: "Puppeteer Client Interface",
      avatarURL: "https://st2.depositphotos.com/4199035/6594/v/950/depositphotos_65942573-stock-illustration-puppet-cartoon-illustration-isolated-on.jpg",
      embeds: [endEmbed],
      files: [ffile]
    })

    print("Sent end embed...")

    fs.unlinkSync('begin.png')
    fs.unlinkSync('final.png')

    print("Deleted screenshot...")

      print("Finished waiting on process, now closing...")
      console.log("-------------------------------------------------------------------------------------------------------------")
}

  await countDown(minutes)

  await browser.close()
  await process.exit()
  

})();
