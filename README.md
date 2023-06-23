--------------------

# Jexactyl-Credit-Maker
Headless chrome browser that will stay generate credits for you on Pterodactyl/Jexacytl/Whatever other Jexactyl copies that allow AFK Coins gaining.

--------------------

# Security
NONE of your data/discord tokens are stored ANYWHERE, and by making this source open on GitHub, it provides clarity and trust between the developer and client.
But, providers CAN see the logs in terminal, so be careful with your hosts.

--------------------

# Hosting
Input the OAuth Link into the console, such as neronodes.net's oauth

--------------------

# How It Works
1. Using Puppeteer, the client will use your Discord token to log into Jexactyl account through Discord OAuth
2. Input the necessary information to start the client
3. Depending on the credit amount you want to earn, puppeteer will stand idle on the page for "x" amount of minutes <- (credit amount)
4. Once the process is done waiting, it will shut off
5. Enjoy your new credits completely automated, cheap, and amazing! 

--------------------

# Prerequisite
Must have already made an account at https://neronodes.net, linked your discord account, and authorized the Nero Backend OAuth in Discord.

Must have also already download Chromium and NodeJS on any of the production machines you are going to use with this client.

[Install Chromium](https://www.omgubuntu.co.uk/2019/08/install-chromium-browser-ubuntu)

[Installing any necessary packages in accordance to any errors thrown](https://gist.github.com/winuxue/cfef08e2f5fe9dfc16a1d67a4ad38a01)

--------------------

# How to Deploy
**WARNING: DO NOT USE THE NERONODES INSTANCE TO GAIN COINS, IT IS VERY SUSPICIOUS AND CAN JEOPARDIZE YOUR EXPERIENCE AND OTHERS**

1. Clone this repository on another production server, [How To Clone A Git Repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository)
2. Install any necessary packages (npm i discord.js puppeteer)
3. Run `npm run start`, if errors occur, please check prerequisites
4. Enter in the amount of credits to gain
5. Enter in your discord token, [How To Get Your Discord User Token](https://www.youtube.com/watch?v=YEgFvgg7ZPI)
6. Let it run!

--------------------

# Miscellaneous
--------------------
If you are running this on a production server such as Replit, consider also adding an Express port and UpTimeRobot to keep the server online

When running on Servers such as Oracle, Google, AWS, or other providers, consider installing pm2 and keeping your server online when you disconnect from your SSH client
[How to Host your Discord Bot 24/7 on Oracle Always Free](https://www.youtube.com/watch?v=90JbCrB3m3I&t=200s&ab_channel=LOGISTACK)

--------------------

How to get the OAuth Link for a Pterodactyl Server

In this example we will be using [NeroNodes](https://neronodes.net/)

1. Go to the login portal, [Login](https://portal.neronodes.net/auth/login)
2. Click "Authenticate With Discord", [Authenticate With Discord](https://portal.neronodes.net/auth/discord)
3. Click the, "Connect with Discord" button
4. Navigate to the top and copy the OAuth App Link, [OAuth Link for NeroNodes](https://discord.com/oauth2/authorize?client_id=967941169650745375&redirect_uri=https://portal.neronodes.net/auth/discord/callback&response_type=code&scope=identify%20email%20guilds%20guilds.join&prompt=none)
5. There you go, you now have the OAuth Link!

Please remember to read prerequisites before running client.

--------------------
