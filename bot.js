const Discord = require("discord.js")
const bot = new Discord.Client({disableMentions: 'everyone'})
const config = require("./config.json")


bot.on("ready", () => {
    console.log("Bot !")
});

bot.on("message", message => {
    if (message.author.bot) return;
    if (message.content.indexOf(config.prefix) !== 0) return;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase()

    if (command === "help") {
        const helpEmbed = new Discord.MessageEmbed()
            .setTitle(`${bot.user.username}' commandrs`)
            .setDescription(`**Prefix:** ${config.prefix}`)
            .addField(`\`ping\``, `Voir le ping du bot`)
            .addField(`\`kick\``, `Utilisation: **${config.prefix}kick [@User]**\n**${config.prefix}kick [@User][Raison]**`)
            .addField(`\`ban\``, `Utilisation: **${config.prefix}ban [@User]**\n**${config.prefix}ban [@User][Raison]**`)
            .addField(`\`add\``, `Ajouter le rôle d'un membre \nUtilisation: **${config.prefix}add [@User] [Role]**`)
            .addField(`\`remove\``, `Supprimer le rôle d'un membre \nUtilisation: **${config.prefix}remove [@User] [Role]**`)
            .addField(`\`purge\``, `Supprimer un nombre de message \nUtilisation: **${config.prefix}purge [nombre]**`)
            .addField(`\`say\``, `Dire quelque chose à travers le bot`)
        message.channel.send(helpEmbed)
    }

    if (command === "ping") {
        message.channel.send(`Pong **(${Date.now() - message.createdTimestamp}ms)**`)
    }

    if (command === "kick") {
        if (!message.member.hasPermission('KICK_MEMBERS'))
            return message.channel.send("(Permission: `Kick members`)").then(msg => {
        msg.delete({ timeout: 30000 })
    })
        const member = message.mentions.members.first();
        if (!member)
            return message.channel.send("YTu n'as pas mentionné une personne").then(msg => {
        msg.delete({ timeout: 30000 })
    })
        if (!member.kickable)
            return message.channel.send("Il est inkickable").then(msg => {
        msg.delete({ timeout: 30000 })
    })
        const reason = args.slice(1).join(" ")
        if (member) {
            if (!reason) return member.kick().then(member => {
                message.channel.send(`${member.user.tag} a été kick`);
            })

            if (reason) return member.kick().then(member => {
                message.channel.send(`${member.user.tag} a été kick pour ${reason}`);
            })
        }
    }

    if (command === "ban") {
        if (!message.member.hasPermission('BAN_MEMBERS'))
            return message.channel.send("Permission `Ban members`").then(msg => {
        msg.delete({ timeout: 30000 })
    })
        const member = message.mentions.members.first();
        if (!member)
            return message.channel.send("YTu n'as pas mentionné une personne").then(msg => {
        msg.delete({ timeout: 30000 })
    })
        if (!member.bannable)
            return message.channel.send("L'utilisateur ne peut pas être ban").then(msg => {
        msg.delete({ timeout: 30000 })
    })
        const reason = args.slice(1).join(" ")
        if (member) {
            if (!reason) return member.ban().then(member => {
                message.channel.send(`${member.user.tag} a été banni`);
            })

            if (reason) return member.ban(reason).then(member => {
                message.channel.send(`${member.user.tag}a été banni pour ${reason}`);
            })
        }
    }

    if (command === "add") {
        if (!message.member.hasPermission('MANAGE_ROLES'))
            return message.channel.send("Permission `Manage roles`").then(msg => {
        msg.delete({ timeout: 30000 })
    })
        const member = message.mentions.members.first()
        if (!member)
            return message.channel.send("Tu n'as pas mentionné une personne").then(msg => {
        msg.delete({ timeout: 30000 })
    })
        const add = args.slice(1).join(" ")
        if (!add)
            return message.channel.send("Tu dois spécifier un rôle").then(msg => {
        msg.delete({ timeout: 30000 })
    })
        const roleAdd = message.guild.roles.cache.find(role => role.name === add)
        if (!roleAdd)
            return message.channel.send("Le rôle n'existe pas").then(msg => {
        msg.delete({ timeout: 30000 })
    })
        if (member.roles.cache.get(roleAdd.id))
            return message.channel.send(`L'utilisateur a déjà ${add}`).then(msg => {
        msg.delete({ timeout: 30000 })
    })
        member.roles.add(roleAdd.id).then((member) => {
            message.channel.send(`${add} a été ajouté à ${member.displayName}`)
        })
    }

    if (command === "remove") {
        if (!message.member.hasPermission('MANAGE_ROLES'))
            return message.channel.send("Permission `Manage roles`").then(msg => {
        msg.delete({ timeout: 30000 })
    })
        const member = message.mentions.members.first()
        if (!member)
            return message.channel.send("Tu n'as pas mentionné une personne").then(msg => {
        msg.delete({ timeout: 30000 })
    })
        const remove = args.slice(1).join(" ")
        if (!remove)
            return message.channel.send("Tu dois spécifier un rôle").then(msg => {
        msg.delete({ timeout: 30000 })
    })
        const roleRemove = message.guild.roles.cache.find(role => role.name === remove)
        if (!roleRemove)
            return message.channel.send("Le rôle n'existe pas").then(msg => {
        msg.delete({ timeout: 30000 })
    })
        if (!member.roles.cache.get(roleRemove.id))
            return message.channel.send(`L'utilisateur n'a pas ce role ${remove} `).then(msg => {
        msg.delete({ timeout: 30000 })
    })
        member.roles.remove(roleRemove.id).then((member) => {
            message.channel.send(`${remove} a été retiré de ${member.displayName}`)
        })
    }

    if (command === "say") {
    const text = args.join(" ")
    if(!text) return message.channel.send("Tu dois dire quelque chose").then(msg => {
        msg.delete({ timeout: 30000 })
    })
    message.channel.send(text)
    
    }
   
    if (command === "purge") {
    if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("Permission `Manage messages`)").then(msg => {
        msg.delete({ timeout: 30000 })
    })
    const number = args.join(" ")
    if(!number) return message.channel.send("Tu n'as pas spécifier un nombre !").then(msg => {
        msg.delete({ timeout: 30000 })
    })
   message.channel.bulkDelete(number).catch(console.error)
   
   }
    


});

bot.login(config.token)
